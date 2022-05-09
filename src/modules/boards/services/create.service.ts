import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Board, Note } from '@prisma/client';
import { FindOneUserDb } from 'src/modules/users/database/findOne.db';
import { CreateBoardDb } from '../database/create.db';
import { CreateBoardDto } from '../dto/create.dto';

export interface IBoardWithNotes extends Board {
  notes: Note[];
}

@Injectable()
export class CreateBoardService {
  constructor(
    private readonly createBoardDb: CreateBoardDb,
    private readonly findOneUserDb: FindOneUserDb,
  ) {}

  async handle(userId: string, data: CreateBoardDto) {
    const { title } = data;

    const user = await this.findOneUserDb.handle({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    try {
      return await this.createBoardDb.handle({
        data: {
          title,
          user: {
            connect: {
              id: user.id,
            },
          },
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Error creating new board');
    }
  }
}
