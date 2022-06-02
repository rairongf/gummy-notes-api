import { Injectable } from '@nestjs/common';
import { Prisma } from '.prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class DeleteBoardDb {
  constructor(private readonly prisma: PrismaService) {}

  async handle(deleteArgs: Prisma.BoardDeleteArgs) {
    return await this.prisma.board.delete(deleteArgs);
  }
}
