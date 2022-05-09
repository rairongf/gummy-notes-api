import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Board, Note } from '@prisma/client';
import { FindOneUserDb } from 'src/modules/users/database/findOne.db';
import { UpdateBoardDb } from '../database/update.db';
import { UpdateBoardDto } from '../dto/update.dto';

export interface IBoardWithNotes extends Board {
  notes: Note[];
}

@Injectable()
export class UpdateBoardService {
  constructor(
    private readonly updateBoardDb: UpdateBoardDb,
    private readonly findOneUserDb: FindOneUserDb,
  ) {}

  async handle(boardId: string, userId: string, data: UpdateBoardDto) {
    const { title } = data;

    const user = await this.findOneUserDb.handle({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    try {
      return await this.updateBoardDb.handle({
        where: {
          id: boardId,
        },
        data: {
          title,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Error updating board');
    }
  }
}
