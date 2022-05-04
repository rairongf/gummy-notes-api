import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '.prisma/client';
import { TokenService } from '../token/token.service';
import { HttpService } from '@nestjs/axios';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly tokenService: TokenService,
    private readonly httpService: HttpService,
  ) {}

  async validateLocalUserAuth(email: string, password: string) {
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (
      user &&
      user.password &&
      (await bcrypt.compare(password, user.password))
    ) {
      return user;
    }
    return null;
  }

  async generateUserToken(user: User) {
    const date = new Date();
    const expires_at = date.setHours(date.getHours() + 6);
    const access_token = this.jwtService.sign({
      sub: user.id,
      name: user.name,
      email: user.email,
    });
    const refresh_token = this.jwtService.sign(
      {
        sub: user.id,
      },
      { expiresIn: '1w' },
    );
    await this.saveToken(access_token, refresh_token, user);
    return {
      expires_at,
      access_token,
      refresh_token,
    };
  }

  async generateResetPasswordToken(user: User) {
    const access_token = this.jwtService.sign(
      {
        sub: user.id,
        name: user.name,
        email: user.email,
      },
      { expiresIn: '30m' },
    );
    return {
      access_token,
    };
  }

  private async saveToken(
    accessToken: string,
    refreshToken: string,
    user: User,
  ) {
    const oldToken = await this.tokenService.findOne({ userId: user.id });
    if (!oldToken) {
      return await this.tokenService.create({
        access_token: accessToken,
        refresh_token: refreshToken,
        user: { connect: { id: user.id } },
      });
    }
    return await this.tokenService.update(
      { id: oldToken.id },
      {
        access_token: accessToken,
        refresh_token: refreshToken,
      },
    );
  }

  async refreshToken(refreshToken: string) {
    try {
      await this.jwtService.verify(refreshToken);
    } catch (error) {
      throw new BadRequestException('Invalid refreshToken');
    }
    const token = await this.tokenService.findOne({
      refresh_token: refreshToken,
    });
    if (!token) {
      throw new BadRequestException('Invalid refreshToken');
    }
    const user = await this.prismaService.user.findUnique({
      where: { id: token.userId },
    });
    if (user) {
      return this.generateUserToken(user);
    }
    throw new BadRequestException('User not found');
  }
}
