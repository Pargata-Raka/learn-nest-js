import { IsOptional, IsString } from "class-validator";

export class TempQueryDto {
  @IsOptional()
  @IsString()
  from: string;

  @IsOptional()
  @IsString()
  to: string;
}