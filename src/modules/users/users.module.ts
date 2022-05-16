import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { PrismaModule } from '../prisma/prisma.module';
import { CreateUserController } from './controllers/create.controller';
import { FindOneUserController } from './controllers/findOne.controller';
import { CreateUserDb } from './database/create.db';
import { FindOneUserDb } from './database/findOne.db';
import { CreateUserService } from './services/create.service';
import { FindOneUserService } from './services/findOne.service';

@Module({
  imports: [HttpModule, PrismaModule, AuthModule],
  controllers: [CreateUserController, FindOneUserController],
  providers: [
    CreateUserService,
    FindOneUserService,
    CreateUserDb,
    FindOneUserDb,
  ],
  exports: [FindOneUserDb],
})
export class UsersModule {}
