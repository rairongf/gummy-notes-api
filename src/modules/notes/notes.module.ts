import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersModule } from '../users/users.module';
import { CreateNoteController } from './controllers/create.controller';
import { DeleteNoteController } from './controllers/delete.controller';
import { FindAllNotesController } from './controllers/findAll.controller';
import { FindOneNoteController } from './controllers/findOne.controller';
import { UpdateNoteController } from './controllers/update.controller';
import { CreateNoteDb } from './database/create.db';
import { DeleteNoteDb } from './database/delete.db';
import { FindAllNotesDb } from './database/findAll.db';
import { FindOneNoteDb } from './database/findOne.db';
import { UpdateNoteDb } from './database/update.db';
import { CreateNoteService } from './services/create.service';
import { DeleteNoteService } from './services/delete.service';
import { FindAllNotesService } from './services/findAll.service';
import { FindOneNoteService } from './services/findOne.service';
import { UpdateNoteService } from './services/update.service';

@Module({
  imports: [HttpModule, PrismaModule, AuthModule, UsersModule],
  controllers: [
    CreateNoteController,
    UpdateNoteController,
    FindAllNotesController,
    FindOneNoteController,
    DeleteNoteController,
  ],
  providers: [
    CreateNoteService,
    UpdateNoteService,
    FindAllNotesService,
    FindOneNoteService,
    DeleteNoteService,
    CreateNoteDb,
    UpdateNoteDb,
    FindAllNotesDb,
    FindOneNoteDb,
    DeleteNoteDb,
  ],
  exports: [],
})
export class NotesModule {}
