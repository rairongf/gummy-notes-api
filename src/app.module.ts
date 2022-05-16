import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { JwtGuard } from './modules/auth/guards/jwt.guard';
import { BoardsModule } from './modules/boards/boards.module';
import { NotesModule } from './modules/notes/notes.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { TokenModule } from './modules/token/token.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    PrismaModule,
    HttpModule,
    AuthModule,
    TokenModule,
    UsersModule,
    BoardsModule,
    NotesModule,
  ],
  controllers: [AppController],
  providers: [{ provide: APP_GUARD, useClass: JwtGuard }, AppService],
})
export class AppModule {}
