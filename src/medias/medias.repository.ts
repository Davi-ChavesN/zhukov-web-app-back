import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { CreateMediaDTO } from "./dto/in/create-media.dto";
import { UpdateMediaDTO } from "./dto/in/update-media.dto";

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
            },
            include: {
                mediaGenres: {
                    include: {
                        genre: true,
                    },
                },
            },
        });
    }

    async readMedias() {
        return await this.prsima.media.findMany({
            include: {
                mediaGenres: {
                    include: {
                        genre: true,
                    },
                },
            },
            orderBy: {
                title: 'asc',
            }
        });
    }

    async readMediaById(id: string) {
        return await this.prsima.media.findUnique({
            where: { id },
            include: {
                mediaGenres: {
                    include: {
                        genre: true,
                    },
                },
            },
        });
    }

    async updateMedia(id: string, dto: UpdateMediaDTO) {
        return await this.prsima.media.update({
            where: { id },
            data: {
                title: dto.title,
                director: dto.director,
                releaseYear: dto.releaseYear,
                duration: dto.duration,
                producer: dto.producer,
                rating: dto.rating,
                posterUrl: dto.posterUrl,
                mediaGenres: {
                    deleteMany: {},
                    create: dto.genreIds.map((genreId) => ({
                        genre: {
                            connect: { id: genreId },
                        },
                    })),
                },
            },
            include: {
                mediaGenres: {
                    include: {
                        genre: true,
                    },
                },
            },
        })
    }

    async deleteMedia(id: string) {
        return await this.prsima.media.delete({
            where: { id },
            include: {
                mediaGenres: {
                    include: {
                        genre: true,
                    },
                },
            },
        });
    }
}