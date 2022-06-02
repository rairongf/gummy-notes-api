import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersModule } from '../users/users.module';
import { CreateBoardController } from './controllers/create.controller';
import { DeleteBoardController } from './controllers/delete.controller';
import { FindAllBoardsController } from './controllers/findAll.controller';
import { FindOneBoardController } from './controllers/findOne.controller';
import { UpdateBoardController } from './controllers/update.controller';
import { CreateBoardDb } from './database/create.db';
import { DeleteBoardDb } from './database/delete.db';
import { FindAllBoardsDb } from './database/findAll.db';
import { FindOneBoardDb } from './database/findOne.db';
import { UpdateBoardDb } from './database/update.db';
import { CreateBoardService } from './services/create.service';
import { DeleteBoardService } from './services/delete.service';
import { FindAllBoardsService } from './services/findAll.service';
import { FindOneBoardService } from './services/findOne.service';
import { UpdateBoardService } from './services/update.service';

@Module({
  imports: [HttpModule, PrismaModule, AuthModule, UsersModule],
  controllers: [
    CreateBoardController,
    UpdateBoardController,
    FindAllBoardsController,
    FindOneBoardController,
    DeleteBoardController,
  ],
  providers: [
    CreateBoardService,
    UpdateBoardService,
    FindAllBoardsService,
    FindOneBoardService,
    DeleteBoardService,
    CreateBoardDb,
    UpdateBoardDb,
    FindAllBoardsDb,
    FindOneBoardDb,
    DeleteBoardDb,
  ],
  exports: [],
})
export class BoardsModule {}
