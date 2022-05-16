import { Prisma } from '@prisma/client';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateNoteDto {
  @IsOptional()
  @IsString()
  text?: string;

  @IsOptional()
  @IsString()
  sticker?: string;

  @IsNotEmpty()
  @IsString()
  color: string;

  @IsNotEmpty()
  @IsString()
  boardId: string;
}
