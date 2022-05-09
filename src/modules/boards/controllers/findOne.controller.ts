import { Controller, Get, Param } from '@nestjs/common';
import { User, UserPayload } from 'src/decorators/users.decorator';
import { FindOneBoardService } from '../services/findOne.service';

@Controller('boards')
export class FindOneBoardController {
  constructor(private readonly findOneBoardService: FindOneBoardService) {}

  @Get(':id')
  async handle(@User() userPayload: UserPayload, @Param('id') boardId: string) {
    return await this.findOneBoardService.handle(userPayload.sub, {
      id: boardId,
    });
  }
}
