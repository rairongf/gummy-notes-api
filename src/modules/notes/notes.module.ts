import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { PrismaModule } from '../prisma/prisma.module';
import { FindOneUserDb } from '../users/database/findOne.db';
import { CreateNoteController } from './controllers/create.controller';
import { FindAllNotesController } from './controllers/findAll.controller';
import { FindOneNoteController } from './controllers/findOne.controller';
import { UpdateNoteController } from './controllers/update.controller';
import { CreateNoteDb } from './database/create.db';
import { FindAllNotesDb } from './database/findAll.db';
import { FindOneNoteDb } from './database/findOne.db';
import { UpdateNoteDb } from './database/update.db';
import { CreateNoteService } from './services/create.service';
import { FindAllNotesService } from './services/findAll.service';
import { FindOneNoteService } from './services/findOne.service';
import { UpdateNoteService } from './services/update.service';

@Module({
  imports: [HttpModule, PrismaModule, AuthModule, FindOneUserDb],
  controllers: [
    CreateNoteController,
    UpdateNoteController,
    FindAllNotesController,
    FindOneNoteController,
  ],
  providers: [
    CreateNoteService,
    UpdateNoteService,
    FindAllNotesService,
    FindOneNoteService,
    CreateNoteDb,
    UpdateNoteDb,
    FindAllNotesDb,
    FindOneNoteDb,
  ],
  exports: [],
})
export class NotesModule {}
