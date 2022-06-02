import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { FindOneUserDb } from 'src/modules/users/database/findOne.db';
import { DeleteNoteDb } from '../database/delete.db';

@Injectable()
export class DeleteNoteService {
  constructor(
    private readonly deleteNoteDb: DeleteNoteDb,
    private readonly findOneUserDb: FindOneUserDb,
  ) {}

  async handle(userId: string, noteId: string) {
    const user = await this.findOneUserDb.handle({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    try {
      return await this.deleteNoteDb.handle({
        where: { id: noteId },
      });
    } catch (error) {
      throw new InternalServerErrorException('Error deleting note');
    }
  }
}
