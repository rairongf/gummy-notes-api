import { Controller, Post, Body } from '@nestjs/common';
import { User, UserPayload } from '../../../decorators/users.decorator';
import { CreateNoteDto } from '../dto/create.dto';
import { CreateNoteService } from '../services/create.service';

@Controller('notes')
export class CreateNoteController {
  constructor(private readonly createNoteService: CreateNoteService) {}

  @Post()
  async handle(@User() userPayload: UserPayload, @Body() data: CreateNoteDto) {
    return await this.createNoteService.handle(userPayload.sub, data);
  }
}
