import { Controller, Get } from '@nestjs/common';
import { User, UserPayload } from 'src/decorators/users.decorator';
import { FindAllBoardsService } from '../services/findAll.service';

@Controller('boards')
export class FindAllBoardsController {
  constructor(private readonly findAllBoardsService: FindAllBoardsService) {}

  @Get()
  async handle(@User() userPayload: UserPayload) {
    return await this.findAllBoardsService.handle(userPayload.sub);
  }
}
