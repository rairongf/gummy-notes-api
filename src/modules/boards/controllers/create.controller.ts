import { Controller, Post, Body } from '@nestjs/common';
import { User, UserPayload } from '../../../decorators/users.decorator';
import { CreateBoardDto } from '../dto/create.dto';
import { CreateBoardService } from '../services/create.service';

@Controller('boards')
export class CreateBoardController {
  constructor(private readonly createBoardService: CreateBoardService) {}

  @Post()
  async handle(@User() userPayload: UserPayload, @Body() data: CreateBoardDto) {
    return await this.createBoardService.handle(userPayload.sub, data);
  }
}
