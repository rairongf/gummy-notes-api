import { Injectable } from '@nestjs/common';
import { Prisma } from '.prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class UpdateNoteDb {
  constructor(private readonly prisma: PrismaService) {}

  async handle(updateArgs: Prisma.NoteUpdateArgs) {
    return await this.prisma.note.update(updateArgs);
  }
}
