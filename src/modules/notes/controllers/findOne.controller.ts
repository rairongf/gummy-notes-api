import { Controller, Get, Param } from '@nestjs/common';
import { User, UserPayload } from 'src/decorators/users.decorator';
import { FindOneNoteService } from '../services/findOne.service';

@Controller('notes')
export class FindOneNoteController {
  constructor(private readonly findOneNoteService: FindOneNoteService) {}

  @Get(':id')
  async handle(@User() userPayload: UserPayload, @Param('id') noteId: string) {
    return await this.findOneNoteService.handle(userPayload.sub, {
      id: noteId,
    });
  }
}
