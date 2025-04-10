import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateMediaDTO {
    @ApiProperty()
    title?: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    originalTitle: string;

    @ApiProperty()
    imageUrl?: string;

    @ApiProperty()
    bannerurl?: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    format: string;

    @ApiProperty()
    episodes?: number;

    @ApiProperty()
    episodesDuration?: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    status: string;

    @ApiProperty()
    startDate?: Date;

    @ApiProperty()
    endDate?: Date;

    @ApiProperty()
    season?: string;

    @ApiProperty()
    averageScore?: number;
    
    @ApiProperty()
    studios?: string[];

    @ApiProperty()
    genres?: string[];
}