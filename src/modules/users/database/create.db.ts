import { Injectable } from '@nestjs/common';
import { Prisma } from '.prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class CreateUserDb {
  constructor(private readonly prisma: PrismaService) {}

  async handle(createArgs: Prisma.UserCreateArgs) {
    return await this.prisma.user.create(createArgs);
  }
}
