import { Type } from "class-transformer";
import { IsInt, Max, Min } from "class-validator";

export class BillSplitParamsDto {
  @Type(() => Number)
  @IsInt({ message: 'peopleCount must be an integer' })
  @Min(2, { message: 'peopleCount must be at least 2' })
  @Max(20, { message: 'peopleCount must not exceed 20' })
  peopleCount: number;
}