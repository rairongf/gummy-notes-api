import { Injectable } from '@nestjs/common';
import { Prisma } from '.prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class CreateBoardDb {
  constructor(private readonly prisma: PrismaService) {}

  async handle(createArgs: Prisma.BoardCreateArgs) {
    return await this.prisma.board.create(createArgs);
  }
}
