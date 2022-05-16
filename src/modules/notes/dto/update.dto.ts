import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateNoteDto {
  @IsOptional()
  @IsString()
  text?: string;

  @IsOptional()
  @IsString()
  sticker?: string;

  @IsOptional()
  @IsString()
  color?: string;
}
