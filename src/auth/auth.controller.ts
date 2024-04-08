import {Body, Controller, Post, UseGuards,Request} from '@nestjs/common';
import {LoginDto} from "./dto/login.dto";
import {AuthService} from "./auth.service";
import {RegisterDto} from "./dto/register.dto";
import {LocalStrategy} from "../common/strategies/local.strategy";
import {LocalAuthGuard} from "../common/guards/local-auth.guard";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto.username, registerDto.password);
  }


  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
