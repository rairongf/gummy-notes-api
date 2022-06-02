import { Injectable } from '@nestjs/common';
import { Prisma } from '.prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class DeleteNoteDb {
  constructor(private readonly prisma: PrismaService) {}

  async handle(deleteArgs: Prisma.NoteDeleteArgs) {
    return await this.prisma.note.delete(deleteArgs);
  }
}
