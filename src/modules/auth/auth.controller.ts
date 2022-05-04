import {
  Controller,
  Post,
  UseGuards,
  Get,
  Req,
  Body,
  HttpCode,
  Redirect,
  InternalServerErrorException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './guards/jwt.guard';
import { LocalGuard } from './guards/local.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalGuard)
  @HttpCode(200)
  @Post('login')
  async login(@Req() req: Express.Request) {
    return req.user;
  }

  @Public()
  @HttpCode(200)
  @Post('token/refresh')
  async refreshToken(@Body() data: { refresh_token: string }) {
    return await this.authService.refreshToken(data.refresh_token);
  }
}
