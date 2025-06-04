import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UpdateUserPasswordDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    newPassword: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password: string;
}