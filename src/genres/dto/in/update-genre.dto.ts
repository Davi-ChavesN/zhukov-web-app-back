import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UpdateGenreDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    description: string;
}