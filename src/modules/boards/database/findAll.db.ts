import { Injectable } from '@nestjs/common';
import { Prisma } from '.prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class FindAllBoardsDb {
  constructor(private readonly prisma: PrismaService) {}

  async handle<T>(findManyArgs?: Prisma.BoardFindManyArgs): Promise<T> {
    return (await this.prisma.board.findMany(findManyArgs)) as any;
  }
}
