import { Injectable } from '@nestjs/common';
import { Prisma } from '.prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class FindOneUserDb {
  constructor(private readonly prisma: PrismaService) {}

  async handle(findUniqueArgs: Prisma.UserFindUniqueArgs) {
    return await this.prisma.user.findUnique(findUniqueArgs);
  }
}
