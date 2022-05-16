import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { FindOneUserDb } from 'src/modules/users/database/findOne.db';
import { UpdateNoteDb } from '../database/update.db';
import { UpdateNoteDto } from '../dto/update.dto';

@Injectable()
export class UpdateNoteService {
  constructor(
    private readonly updateNoteDb: UpdateNoteDb,
    private readonly findOneUserDb: FindOneUserDb,
  ) {}

  async handle(noteId: string, userId: string, data: UpdateNoteDto) {
    const { sticker, text, color } = data;

    const user = await this.findOneUserDb.handle({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    try {
      return await this.updateNoteDb.handle({
        where: {
          id: noteId,
        },
        data: {
          sticker,
          text,
          color,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Error updating board');
    }
  }
}
