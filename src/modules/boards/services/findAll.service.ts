import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Board, Note } from '@prisma/client';
import { FindOneUserDb } from 'src/modules/users/database/findOne.db';
import { FindAllBoardsDb } from '../database/findAll.db';

export interface IBoardWithNotes extends Board {
  notes: Note[];
}

@Injectable()
export class FindAllBoardsService {
  constructor(
    private readonly findAllBoardsDb: FindAllBoardsDb,
    private readonly findOneUserDb: FindOneUserDb,
  ) {}

  async handle(userId: string) {
    const user = await this.findOneUserDb.handle({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    try {
      return await this.findAllBoardsDb.handle<IBoardWithNotes>({
        where: { userId: user.id },
        include: {
          notes: true,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Error fetching boards');
    }
  }
}
