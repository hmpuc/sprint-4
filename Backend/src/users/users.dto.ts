import { IsEmail, IsInt, IsOptional, IsString, MaxLength, MinLength, Min, Max } from "class-validator";

export class CreateUser {
    @IsString()
    @MinLength(3)
    @MaxLength(30)
    name: string

    @IsEmail()
    email: string

    @IsString()
    @MinLength(8)
    @MaxLength(16)
    password: string

    @IsInt()
    @Min(1)
    @Max(5)
    level: number

    @IsString()
    @IsOptional()
    profile_img: string

}

export class UpdateUser {
    @IsString()
    @IsOptional()
    @MinLength(3)
    @MaxLength(30)
    name: string

    @IsEmail()
    @IsOptional()
    email: string

    @IsString()
    @IsOptional()
    @MinLength(8)
    @MaxLength(16)
    password: string

    @IsInt()
    @IsOptional()
    @Min(1)
    @Max(5)
    level: number

    @IsString()
    @IsOptional()
    profile_img: string

}

export class VerifyLevel {
    @IsInt()
    @Min(1)
    @Max(5)
    level: number
}