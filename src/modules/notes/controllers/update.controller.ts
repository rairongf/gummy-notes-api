import { Controller, Body, Param, Patch } from '@nestjs/common';
import { User, UserPayload } from '../../../decorators/users.decorator';
import { UpdateNoteDto } from '../dto/update.dto';
import { UpdateNoteService } from '../services/update.service';

@Controller('notes')
export class UpdateNoteController {
  constructor(private readonly updateNoteService: UpdateNoteService) {}

  @Patch(':id')
  async handle(
    @User() user: UserPayload,
    @Param('id') noteId: string,
    @Body() updateBoardDto: UpdateNoteDto,
  ) {
    return await this.updateNoteService.handle(
      noteId,
      user.sub,
      updateBoardDto,
    );
  }
}
