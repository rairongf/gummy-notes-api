import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { FindOneUserDb } from 'src/modules/users/database/findOne.db';
import { DeleteBoardDb } from '../database/delete.db';

@Injectable()
export class DeleteBoardService {
  constructor(
    private readonly deleteBoardDb: DeleteBoardDb,
    private readonly findOneUserDb: FindOneUserDb,
  ) {}

  async handle(userId: string, boardId: string) {
    const user = await this.findOneUserDb.handle({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    try {
      return await this.deleteBoardDb.handle({
        where: { id: boardId },
      });
    } catch (error) {
      throw new InternalServerErrorException('Error deleting board');
    }
  }
}
