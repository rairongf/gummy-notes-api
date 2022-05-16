import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { FindOneUserDb } from 'src/modules/users/database/findOne.db';
import { FindOneNoteDb } from '../database/findOne.db';

@Injectable()
export class FindOneNoteService {
  constructor(
    private readonly findOneNoteDb: FindOneNoteDb,
    private readonly findOneUserDb: FindOneUserDb,
  ) {}

  async handle(userId: string, where: Prisma.NoteWhereUniqueInput) {
    const user = await this.findOneUserDb.handle({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    try {
      return await this.findOneNoteDb.handle({
        where,
      });
    } catch (error) {
      throw new InternalServerErrorException('Error fetching board');
    }
  }
}
