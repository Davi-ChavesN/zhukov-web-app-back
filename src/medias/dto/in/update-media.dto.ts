import { ApiProperty } from "@nestjs/swagger";
import { IsDecimal, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateMediaDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    director: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    releaseYear: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    duration: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    producer: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsDecimal()
    score: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    posterUrl: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    bannerUrl: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    trailerUrl: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString({ each: true })
    genreIds: string[];
}