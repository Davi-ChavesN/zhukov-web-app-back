import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateMediaDTO {
    @ApiProperty()
        @IsNotEmpty()
        @IsString()
        title: string;
    
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
        @IsString()
        rating: string;
    
        @ApiProperty()
        @IsNotEmpty()
        @IsString()
        posterUrl: string;
    
        @ApiProperty()
        @IsNotEmpty()
        @IsString({ each: true })
        genreIds: string[];
}