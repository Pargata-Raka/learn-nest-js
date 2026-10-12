import { IsAlpha, IsArray, IsNumber, IsOptional } from "class-validator";

export class ScoreBodyDto {
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  scores: number[];

  @IsOptional()
  @IsNumber()
  passMark?: number = 70;
}