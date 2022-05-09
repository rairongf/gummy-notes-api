import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Board, Note, Prisma } from '@prisma/client';
import { FindOneUserDb } from 'src/modules/users/database/findOne.db';
import { FindOneBoardDb } from '../database/findOne.db';

export interface IBoardWithNotes extends Board {
  notes: Note[];
}

@Injectable()
export class FindOneBoardService {
  constructor(
    private readonly findOneBoardDb: FindOneBoardDb,
    private readonly findOneUserDb: FindOneUserDb,
  ) {}

  async handle(userId: string, where: Prisma.BoardWhereUniqueInput) {
    const user = await this.findOneUserDb.handle({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    try {
      return await this.findOneBoardDb.handle<IBoardWithNotes>({
        where,
        include: {
          notes: true,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Error fetching board');
    }
  }
}
