import { IsDate, IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class UpdateUserDTO {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    birthDate: Date;

    @IsNotEmpty()
    @MinLength(6)
    password: string;
}