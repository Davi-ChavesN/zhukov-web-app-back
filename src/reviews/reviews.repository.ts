import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { CreateReviewDTO } from "./dto/create-review.dto";
import { UpdateReviewDTO } from "./dto/update-review.dto";

@Injectable()
export class ReviewRepository {
    constructor(private readonly prisma: PrismaService) { }

    async createReview(dto: CreateReviewDTO) {
        return await this.prisma.review.create({
            data: {
                userId: dto.userId,
                mediaId: dto.mediaId,
                score: dto.score,
                comment: dto.comment,
            }
        });
    }

    async readReviews() {
        return await this.prisma.review.findMany();
    }

    async readReviewsByUserId(userId: string) {
        return await this.prisma.review.findMany({
            where: { userId }
        });
    }

    async readReviewsByMediaId(mediaId: string) {
        return await this.prisma.review.findMany({
            where: { mediaId }
        });
    }

    async readReviewById(userId: string, mediaId: string) {
        return await this.prisma.review.findUnique({
            where: {
                userId_mediaId: {
                    userId,
                    mediaId
                }
            }
        });
    }

    async updateReviewById(userId: string, mediaId: string, dto: UpdateReviewDTO) {
        return await this.prisma.review.update({
            where: {
                userId_mediaId: {
                    userId,
                    mediaId,
                }
            },
            data: {
                score: dto.score,
                comment: dto.comment,
            }
        });
    }

    async deleteReviewById(userId: string, mediaId: string) {
        return await this.prisma.review.delete({
            where: {
                userId_mediaId: {
                    userId,
                    mediaId,
                }
            }
        });
    }
}