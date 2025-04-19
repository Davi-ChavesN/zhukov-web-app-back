import { Injectable, NotFoundException } from "@nestjs/common";
import { ReviewRepository } from "./reviews.repository";
import { CreateReviewDTO } from "./dto/create-review.dto";
import { UpdateReviewDTO } from "./dto/update-review.dto";

@Injectable()
export class ReviewService {
    constructor(private readonly reviewRepository: ReviewRepository) { }

    async createReview(dto: CreateReviewDTO) {
        const newReview = await this.reviewRepository.createReview(dto);
        return newReview;
    }

    async readReviews() {
        const reviews = await this.reviewRepository.readReviews();

        if (!reviews) {
            throw new NotFoundException({
                message: "Reviews not found"
            });
        }

        return reviews;
    }

    async readUserReviews(userId: string) {
        const userReviews = await this.reviewRepository.readReviewsByUserId(userId);

        if (!userReviews) {
            throw new NotFoundException({
                message: "Reviews not found"
            });
        }

        return userReviews;
    }

    async readMediaReviews(mediaId: string) {
        const mediaReviews = await this.reviewRepository.readReviewsByMediaId(mediaId);

        if (!mediaReviews) {
            throw new NotFoundException({
                message: "Reviews not found"
            });
        }

        return mediaReviews;
    }

    async readReview(userId: string, mediaId: string) {
        const review = await this.reviewRepository.readReviewById(userId, mediaId);

        if (!review) {
            throw new NotFoundException({
                message: "Review not found"
            });
        }

        return review;
    }

    async updateReview(userId: string, mediaId: string, dto: UpdateReviewDTO) {
        const review = await this.reviewRepository.readReviewById(userId, mediaId);

        if (!review) {
            throw new NotFoundException({
                message: "Review not found"
            });
        }

        const updatedReview = await this.reviewRepository.updateReviewById(userId, mediaId, dto);
        return updatedReview;
    }

    async deleteReview(userId: string, mediaId: string) {
        const review = await this.reviewRepository.readReviewById(userId, mediaId);

        if (!review) {
            throw new NotFoundException({
                message: "Review not found"
            });
        }

        const deletedReview = await this.reviewRepository.deleteReviewById(userId, mediaId);
        return deletedReview;
    }
}