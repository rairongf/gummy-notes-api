import { Injectable } from '@nestjs/common';
import { Prisma } from '.prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class FindOneBoardDb {
  constructor(private readonly prisma: PrismaService) {}

  async handle<T>(findUniqueArgs?: Prisma.BoardFindUniqueArgs): Promise<T> {
    return (await this.prisma.board.findUnique(findUniqueArgs)) as any;
  }
}
