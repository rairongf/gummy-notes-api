import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { AuthService } from '../../auth/auth.service';
import { CreateUserDto } from '../dto/create.dto';
import * as bcrypt from 'bcrypt';
import { CreateUserDb } from '../database/create.db';
import { FindOneUserDb } from '../database/findOne.db';

@Injectable()
export class CreateUserService {
  constructor(
    private readonly createUserDb: CreateUserDb,
    private readonly findOneUserDb: FindOneUserDb,
    private readonly authService: AuthService,
  ) {}

  async handle(createUserDto: CreateUserDto) {
    const { name, email, password } = createUserDto;

    if (email) {
      const emailExists = await this.findOneUserDb.handle({
        where: { email },
      });

      if (emailExists && emailExists.email === email) {
        throw new BadRequestException('Email already exists');
      }
    }

    try {
      const user = await this.createUserDb.handle({
        data: {
          name: name,
          email: email,
          password: await bcrypt.hash(password, 10),
        },
      });

      return await this.authService.generateUserToken(user);
    } catch (error) {
      throw new InternalServerErrorException('Error creating user');
    }
  }
}
