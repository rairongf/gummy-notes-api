import { Controller, Get, Param } from '@nestjs/common';
import { User, UserPayload } from 'src/decorators/users.decorator';
import { FindAllNotesService } from '../services/findAll.service';

@Controller('notes')
export class FindAllNotesController {
  constructor(private readonly findAllNotesService: FindAllNotesService) {}

  @Get('of-board/:id')
  async handle(@User() userPayload: UserPayload, @Param('id') boardId: string) {
    return await this.findAllNotesService.handle(userPayload.sub, boardId);
  }
}
