import { Injectable } from '@nestjs/common';
import { Prisma } from '.prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class CreateNoteDb {
  constructor(private readonly prisma: PrismaService) {}

  async handle(createArgs: Prisma.NoteCreateArgs) {
    return await this.prisma.note.create(createArgs);
  }
}
