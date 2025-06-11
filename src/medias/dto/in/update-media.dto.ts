import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsDecimal, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateMediaDTO {
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    title?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    description?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    director?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    releaseYear?: number;

    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    duration?: number;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    producer?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    score?: number;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    posterUrl?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    bannerUrl?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    trailerUrl?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString({ each: true })
    genreIds?: string[];
}