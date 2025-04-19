import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { CreateGenreDTO } from "./dto/create-genre.dto";
import { UpdateGenreDTO } from "./dto/update-genre.dto";

@Injectable()
export class GenreRepository {
    constructor(private readonly prsima: PrismaService) { }

    async createGenre(dto: CreateGenreDTO) {
        return await this.prsima.genre.create({
            data: {
                description: dto.description,
            }
        });
    }

    async readGenres() {
        return await this.prsima.genre.findMany();
    }

    async readGenreById(id: string) {
        return await this.prsima.genre.findUnique({
            where: { id },
        });
    }

    async updateGenre(id: string, dto: UpdateGenreDTO) {
        return await this.prsima.genre.update({
            where: { id },
            data: {
                description: dto.description,
            }
        });
    }

    async deleteGenre(id: string) {
        return await this.prsima.genre.delete({
            where: { id },
        });
    }
}