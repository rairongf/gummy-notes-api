import { Controller, Delete, Param } from '@nestjs/common';
import { User, UserPayload } from '../../../decorators/users.decorator';
import { DeleteBoardService } from '../services/delete.service';

@Controller('boards')
export class DeleteBoardController {
  constructor(private readonly deleteBoardService: DeleteBoardService) {}

  @Delete(':id')
  async handle(@User() userPayload: UserPayload, @Param('id') boardId: string) {
    return await this.deleteBoardService.handle(userPayload.sub, boardId);
  }
}
