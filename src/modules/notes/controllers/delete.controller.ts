import { Controller, Delete, Param } from '@nestjs/common';
import { User, UserPayload } from '../../../decorators/users.decorator';
import { DeleteNoteService } from '../services/delete.service';

@Controller('notes')
export class DeleteNoteController {
  constructor(private readonly deleteNoteService: DeleteNoteService) {}

  @Delete(':id')
  async handle(@User() userPayload: UserPayload, @Param('id') noteId: string) {
    return await this.deleteNoteService.handle(userPayload.sub, noteId);
  }
}
