import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/sign-in.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Admin) private readonly adminRepository: Repository<Admin>,
    private jwtService: JwtService,
  ) {}

  async register(dto: SignInDto): Promise<{ access_token: string }> {
    const admin = await this.adminRepository.findOneBy({ email: dto.email });

    if (admin) throw new BadRequestException('Админ с таким email уже существует');

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const newAdmin = this.adminRepository.create({ ...dto, password: hashedPassword });

    await this.adminRepository.save(newAdmin);

    return this.generateToken(newAdmin);
  }

  async login(dto: SignInDto) {
    const admin = await this.adminRepository.findOneBy({ email: dto.email });

    if (!admin) throw new NotFoundException('Админ с таким email не был найден');

    const isPasswordValid = await bcrypt.compare(dto.password, admin.password);

    if (isPasswordValid) {
      return this.generateToken(admin);
    } else {
      throw new UnauthorizedException('Неверный пароль');
    }
  }

  private async generateToken(admin: Admin) {
    const payload = { id: admin.id, email: admin.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
