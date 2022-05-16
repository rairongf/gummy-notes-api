import { Injectable } from '@nestjs/common';
import { Prisma } from '.prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class FindOneNoteDb {
  constructor(private readonly prisma: PrismaService) {}

  async handle<T>(findUniqueArgs?: Prisma.NoteFindUniqueArgs): Promise<T> {
    return (await this.prisma.note.findUnique(findUniqueArgs)) as any;
  }
}
