import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUsers(): Promise<UserDto[]> {
    const entities = await this.userRepository.find();

    return entities.map((entity) => this.mapToDto(entity));
  }

  async createUser(dto: CreateUserDto): Promise<UserDto> {
    const user = await this.userRepository.findOneBy({ email: dto.email });

    if (user) throw new BadRequestException('Пользователь с таким email уже существует');

    const newUser = this.userRepository.create({ ...dto });
    await this.userRepository.save(newUser);

    return this.mapToDto(newUser);
  }

  private mapToDto(entity: User) {
    const dto: UserDto = { ...entity };
    return dto;
  }
}
