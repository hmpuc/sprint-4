import { Transform } from "class-transformer";
import { IsInt, IsOptional, IsString, MaxLength, MinLength, Min, Max, IsNumber, IsNumberString } from "class-validator";

export class CreateRoom{
    @IsString()
    @MinLength(1)
    @MaxLength(400)
    description: string

    @IsInt()
    @Transform(({ value }) => Number(value))
    @Max(5)
    @Min(1)
    acessLevel: number
}

export class UpdateRoom{
    @IsOptional()
    @IsString()
    @MinLength(1)
    @MaxLength(400)
    description: string

    @IsOptional()
    @IsInt()
    @Transform(({ value }) => Number(value))
    @Max(5)
    @Min(1)
    acessLevel: number
}