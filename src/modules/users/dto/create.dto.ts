import { Prisma } from '.prisma/client';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsOptional,
  Matches,
} from 'class-validator';

export class CreateUserDto implements Prisma.UserCreateInput {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*\.])(?=.{8,})/)
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsString()
  name: string;
}
