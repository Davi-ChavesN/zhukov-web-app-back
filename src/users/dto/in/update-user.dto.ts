import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class UpdateUserDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    nickname: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsDate()
    birthDate: Date;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    userRole: string;

    @ApiProperty()
    @IsNotEmpty()
    @MinLength(6)
    confirmPassword: string;
}