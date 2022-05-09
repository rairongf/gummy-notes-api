import { Controller, Body, Param, Patch } from '@nestjs/common';
import { User, UserPayload } from '../../../decorators/users.decorator';
import { UpdateBoardDto } from '../dto/update.dto';
import { UpdateBoardService } from '../services/update.service';

@Controller('boards')
export class UpdateBoardController {
  constructor(private readonly updateBoardService: UpdateBoardService) {}

  @Patch(':id')
  async handle(
    @User() user: UserPayload,
    @Param('id') boardId: string,
    @Body() updateBoardDto: UpdateBoardDto,
  ) {
    return await this.updateBoardService.handle(
      boardId,
      user.sub,
      updateBoardDto,
    );
  }
}
