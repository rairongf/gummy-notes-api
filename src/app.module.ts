import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { JwtGuard } from './modules/auth/guards/jwt.guard';
import { PrismaModule } from './modules/prisma/prisma.module';
import { TokenModule } from './modules/token/token.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [PrismaModule, HttpModule, AuthModule, TokenModule, UsersModule],
  controllers: [AppController],
  providers: [{ provide: APP_GUARD, useClass: JwtGuard }, AppService],
})
export class AppModule {}
