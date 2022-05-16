import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { FindOneUserDb } from 'src/modules/users/database/findOne.db';
import { CreateNoteDb } from '../database/create.db';
import { CreateNoteDto } from '../dto/create.dto';

@Injectable()
export class CreateNoteService {
  constructor(
    private readonly createNoteDb: CreateNoteDb,
    private readonly findOneUserDb: FindOneUserDb,
  ) {}

  async handle(userId: string, data: CreateNoteDto) {
    const { text, sticker, color, boardId } = data;

    const user = await this.findOneUserDb.handle({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    try {
      return await this.createNoteDb.handle({
        data: {
          text,
          sticker,
          color,
          board: {
            connect: {
              id: boardId,
            },
          },
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Error creating new board');
    }
  }
}
