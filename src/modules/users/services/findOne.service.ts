import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { FindOneUserDb } from '../database/findOne.db';

@Injectable()
export class FindOneUserService {
  constructor(private readonly findOneUserDb: FindOneUserDb) {}

  async handle(where: Prisma.UserWhereUniqueInput) {
    const user = await this.findOneUserDb.handle({ where });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    delete user.password;

    return {
      ...user,
    };
  }
}
