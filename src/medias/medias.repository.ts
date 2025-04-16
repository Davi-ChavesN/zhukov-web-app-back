import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { CreateMediaDTO } from "./dto/create-media.dto";

@Injectable()
export class MediaRepository {
    constructor(private readonly prsima: PrismaService) { }

    async createMedia(dto: CreateMediaDTO) {
        return await this.prsima.media.create({
            data: {
                title: dto.title,
                director: dto.director,
                releaseYear: dto.releaseYear,
                duration: dto.duration,
                producer: dto.producer,
                rating: dto.rating,
                posterUrl: dto.posterUrl,
                mediaGenres: {
                    create: dto.genreIds.map((genreId) => ({
                        genre: {
                            connect: { id: genreId },
                        },
                    })),
                },
            }
        })
    }

    async readMedias() {
        return await this.prsima.media.findMany({})
    }

    async readMediaById(id: string) {
        return await this.prsima.media.findUnique({
            where: { id },
        });
    }
}