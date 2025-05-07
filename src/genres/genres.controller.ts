import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { GenreService } from "./genres.service";
import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CreateGenreDTO } from "./dto/create-genre.dto";
import { GenreOutputDTO } from "./dto/genre-output.dto";
import { UpdateGenreDTO } from "./dto/update-genre.dto";

@ApiTags("Genre")
@Controller("genre")
export class GenreController {
    constructor(private readonly genreService: GenreService) { }

    @Post("register")
    @ApiOperation({ summary: "Creates a genre" })
    @ApiCreatedResponse({ description: "Genre registered successfully" })
    async register(@Body() dto: CreateGenreDTO) {
        const response = await this.genreService.createGenre(dto);
        return GenreOutputDTO.toResponse(response);
    }

    @Get("all")
    @ApiOperation({ summary: "Gets all genres" })
    @ApiOkResponse({ description: "Genres found" })
    @ApiNotFoundResponse({ description: "No genres found" })
    async getGenres() {
        const genres = await this.genreService.readGenres();
        return genres.map((genre) => GenreOutputDTO.toResponse(genre));
    }

    @Get("/:id")
    @ApiOperation({ summary: "Gets a genre by ID" })
    @ApiOkResponse({ description: "Genre found" })
    @ApiNotFoundResponse({ description: "Genre not found" })
    async getGenre(@Param("id") id: string) {
        const response = await this.genreService.readGenreById(id);
        return GenreOutputDTO.toResponse(response);
    }

    @Put("update/:id")
    @ApiOperation({ summary: "Updates a genre by ID" })
    @ApiOkResponse({ description: "Genre updated successfully" })
    @ApiNotFoundResponse({ description: "Genre not found" })
    async updateGenre(@Param("id") id: string, @Body() dto: UpdateGenreDTO) {
        const response = await this.genreService.updateGenre(id, dto);
        return GenreOutputDTO.toResponse(response);
    }

    @Delete("delete/:id")
    @ApiOperation({ summary: "Deletes a genre by ID" })
    @ApiOkResponse({ description: "Genre deleted successfully" })
    @ApiNotFoundResponse({ description: "Genre not found" })
    async deleteGenre(@Param("id") id: string) {
        const response = await this.genreService.deleteGenre(id);
        return GenreOutputDTO.toResponse(response);
    }
}