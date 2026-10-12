import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString, Min, Max } from "class-validator";

export class lengthDto {
    @Type(() => Number)
    @IsNotEmpty({ message: 'Must be filled' })
    @IsNumber({}, { message: 'Must be a valid number' })
    @Min(0, { message: 'Must be greater than or equal to 0' })
    @Max(1_000_000, { message: 'Must not exceed 1,000,000' }) meters: number;
}

