import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    TypeOrmModule.forFeature([Admin]),
    JwtModule.register({ global: true, secret: jwtConstants.secret, signOptions: { expiresIn: '5m' } }),
  ],
  exports: [JwtModule],
})
export class AuthModule {}
