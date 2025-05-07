import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CredentialsDTO {
    @ApiProperty()
    @IsOptional()
    @IsEmail()
    email?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    nickname?: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password: string;
}