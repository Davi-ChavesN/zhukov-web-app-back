import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateReviewDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    userId: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    mediaId: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    score: number;

    @ApiProperty()
    @IsString()
    comment?: string | null;
}