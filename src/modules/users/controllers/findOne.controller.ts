import { Controller, Get } from '@nestjs/common';
import { User } from 'src/decorators/users.decorator';
import { FindOneUserService } from '../services/findOne.service';

type UserPayload = {
  sub: string;
  name: string;
  email: string;
};

@Controller('users')
export class FindOneUserController {
  constructor(private readonly findOneUserSevice: FindOneUserService) {}

  @Get()
  async handle(@User() userPayload: UserPayload) {
    return await this.findOneUserSevice.handle({ id: userPayload.sub });
  }
}
