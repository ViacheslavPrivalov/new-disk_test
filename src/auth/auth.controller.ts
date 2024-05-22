import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: SignInDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  async login(@Body() dto: SignInDto) {
    return this.authService.login(dto);
  }
}
