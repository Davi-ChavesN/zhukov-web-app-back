import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateReviewDTO {
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

    @ApiProperty({required: false, nullable: true})
    @IsString()
    comment?: string | null;
}