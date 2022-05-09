import { Injectable } from '@nestjs/common';
import { Prisma } from '.prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class UpdateBoardDb {
  constructor(private readonly prisma: PrismaService) {}

  async handle(updateArgs: Prisma.BoardUpdateArgs) {
    return await this.prisma.board.update(updateArgs);
  }
}
