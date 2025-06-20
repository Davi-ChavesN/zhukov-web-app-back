import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { CreateMediaDTO } from "./dto/in/create-media.dto";
import { UpdateMediaDTO } from "./dto/in/update-media.dto";

@Injectable()
export class MediaRepository {
    constructor(private readonly prisma: PrismaService) { }

    async createMedia(dto: CreateMediaDTO) {
        return await this.prisma.media.create({
            data: {
                title: dto.title,
                description: dto.description,
                director: dto.director,
                releaseYear: dto.releaseYear,
                duration: dto.duration,
                producer: dto.producer,
                posterUrl: dto.posterUrl,
                bannerUrl: dto.bannerUrl,
                trailerUrl: dto.trailerUrl,
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
                    orderBy: {
                        genre: {
                            description: 'asc',
                        }
                    }
                },
            },
        });
    }

    async readMedias() {
        return await this.prisma.media.findMany({
            include: {
                mediaGenres: {
                    include: {
                        genre: true,
                    },
                    orderBy: {
                        genre: {
                            description: 'asc',
                        }
                    }
                },
            },
            orderBy: {
                title: 'asc',
            }
        });
    }

    async readMediaById(id: string) {
        return await this.prisma.media.findUnique({
            where: { id },
            include: {
                mediaGenres: {
                    include: {
                        genre: true,
                    },
                    orderBy: {
                        genre: {
                            description: 'asc',
                        }
                    }
                },
            },
        });
    }

    async updateMedia(id: string, dto: UpdateMediaDTO) {
        return await this.prisma.media.update({
            where: { id },
            data: {
                title: dto.title,
                description: dto.description,
                director: dto.director,
                releaseYear: dto.releaseYear,
                duration: dto.duration,
                producer: dto.producer,
                score: dto.score,
                posterUrl: dto.posterUrl,
                bannerUrl: dto.bannerUrl,
                trailerUrl: dto.trailerUrl,
                mediaGenres: dto.genreIds ? {
                    deleteMany: {},
                    create: dto.genreIds.map((genreId) => ({
                        genre: {
                            connect: { id: genreId },
                        },
                    })),
                } : undefined,
            },
            include: {
                mediaGenres: {
                    include: {
                        genre: true,
                    },
                    orderBy: {
                        genre: {
                            description: 'asc',
                        }
                    }
                },
            },
        })
    }

    async deleteMedia(id: string) {
        return await this.prisma.media.delete({
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