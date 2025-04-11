import { IsInt, IsOptional, IsString, MaxLength, MinLength, Min, Max, IsNumber, IsNumberString } from "class-validator";

export class CreateRoom{
    @IsString()
    @MinLength(1)
    @MaxLength(400)
    description: string

    @IsInt()
    @IsNumber()
    @Min(1)
    @Max(5)
    acessLevel: number
}

export class UpdateRoom{
    @IsOptional()
    @IsString()
    @MinLength(1)
    @MaxLength(400)
    description: string

    @IsInt()
    @IsNumber()
    @IsOptional()
    @Min(1)
    @Max(5)
    acessLevel: number
}