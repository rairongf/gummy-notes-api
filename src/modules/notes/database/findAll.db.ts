import { Injectable } from '@nestjs/common';
import { Prisma } from '.prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class FindAllNotesDb {
  constructor(private readonly prisma: PrismaService) {}

  async handle<T>(findManyArgs?: Prisma.NoteFindManyArgs): Promise<T> {
    return (await this.prisma.note.findMany(findManyArgs)) as any;
  }
}
