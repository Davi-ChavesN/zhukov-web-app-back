import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateGenreDTO } from "./dto/create-genre.dto";
import { GenreRepository } from "./genres.repository";
import { UpdateGenreDTO } from "./dto/update-genre.dto";

@Injectable()
export class GenreService {
    constructor(private readonly genreRepository: GenreRepository) { }

    async createGenre(dto: CreateGenreDTO) {
        const newGenre = await this.genreRepository.createGenre(dto);
        return newGenre;
    }

    async readGenres() {
        const genres = await this.genreRepository.readGenres();

        if (!genres) {
            throw new NotFoundException({
                message: "Genres not found",
            });
        }

        return genres;
    }

    async readGenreById(id: string) {
        const genre = await this.genreRepository.readGenreById(id);

        if (!genre) {
            throw new NotFoundException({
                message: "Genre not found",
            });
        }

        return genre;
    }

    async updateGenre(id: string, dto: UpdateGenreDTO) {
        const genre = await this.genreRepository.readGenreById(id);

        if (!genre) {
            throw new NotFoundException({
                message: "Genre not found",
            });
        }

        const updatedGenre = await this.genreRepository.updateGenre(id, dto);

        return updatedGenre;
    }

    async deleteGenre(id: string) {
        const genre = await this.genreRepository.readGenreById(id);

        if (!genre) {
            throw new NotFoundException({
                message: "Genre not found",
            });
        }

        const deletedGenre = await this.genreRepository.deleteGenre(id);

        return deletedGenre;
    }
}