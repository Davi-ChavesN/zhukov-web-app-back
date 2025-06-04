import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ApiBody, ApiOkResponse, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateGenreDTO } from "./dto/in/create-genre.dto";
import { UpdateGenreDTO } from "./dto/in/update-genre.dto";
import { GenreOutputDTO } from "./dto/out/genre-output.dto";
import { GenreService } from "./genres.service";

@ApiTags("Genre")
@Controller("genre")
export class GenreController {
    constructor(private readonly genreService: GenreService) { }

    @Post("register")
    @ApiOperation({ summary: "Creates a genre" })
    @ApiBody({
        type: CreateGenreDTO,
        description: "Data to create a new genre",
    })
    @ApiResponse({ status: 201, description: 'Genre registered successfully' })
    @ApiResponse({ status: 400, description: 'Invalid data' })
    async register(@Body() dto: CreateGenreDTO) {
        const response = await this.genreService.createGenre(dto);
        return GenreOutputDTO.toResponse(response);
    }

    @Get("all")
    @ApiOperation({ summary: "Gets all genres" })
    @ApiOkResponse({ description: "Genres found" })
    @ApiResponse({ status: 200, description: 'Genre found' })
    @ApiResponse({ status: 404, description: 'No Genres found' })
    async getGenres() {
        const genres = await this.genreService.readGenres();
        return genres.map((genre) => GenreOutputDTO.toResponse(genre));
    }

    @Get("/:id")
    @ApiOperation({ summary: "Gets a genre by ID" })
    @ApiParam({ name: 'id', description: 'Genre ID', example: 'uuid-1234-5678' })
    @ApiResponse({ status: 200, description: 'Genre found' })
    @ApiResponse({ status: 404, description: 'Genre not found' })
    async getGenre(@Param("id") id: string) {
        const response = await this.genreService.readGenreById(id);
        return GenreOutputDTO.toResponse(response);
    }

    @Put("update/:id")
    @ApiOperation({ summary: "Updates a genre by ID" })
    @ApiParam({ name: 'id', description: 'Genre ID', example: 'uuid-1234-5678' })
    @ApiBody({ type: UpdateGenreDTO, description: 'New Genre data' })
    @ApiResponse({ status: 200, description: 'Genre updated successfully' })
    @ApiResponse({ status: 404, description: 'Genre not found' })
    async updateGenre(@Param("id") id: string, @Body() dto: UpdateGenreDTO) {
        const response = await this.genreService.updateGenre(id, dto);
        return GenreOutputDTO.toResponse(response);
    }

    @Delete("delete/:id")
    @ApiOperation({ summary: "Deletes a genre by ID" })
    @ApiParam({ name: 'id', description: 'Genre ID', example: 'uuid-1234-5678' })
    @ApiResponse({ status: 200, description: 'Genre deleted successfully' })
    @ApiResponse({ status: 404, description: 'Genre not found' })
    async deleteGenre(@Param("id") id: string) {
        const response = await this.genreService.deleteGenre(id);
        return GenreOutputDTO.toResponse(response);
    }
}