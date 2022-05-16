import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { FindOneUserDb } from 'src/modules/users/database/findOne.db';
import { FindAllNotesDb } from '../database/findAll.db';

@Injectable()
export class FindAllNotesService {
  constructor(
    private readonly findAllNotesDb: FindAllNotesDb,
    private readonly findOneUserDb: FindOneUserDb,
  ) {}

  async handle(userId: string, boardId: string) {
    const user = await this.findOneUserDb.handle({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    try {
      return await this.findAllNotesDb.handle({
        where: { boardId },
      });
    } catch (error) {
      throw new InternalServerErrorException('Error fetching boards');
    }
  }
}
