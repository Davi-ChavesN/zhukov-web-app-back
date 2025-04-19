import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { ReviewService } from "./reviews.service";
import { CreateReviewDTO } from "./dto/create-review.dto";
import { ReviewOutputDTO } from "./dto/review-output.dto";
import { UpdateReviewDTO } from "./dto/update-review.dto";

@ApiTags("Review")
@Controller("review")
export class ReviewController {
    constructor(private readonly reviewService: ReviewService) {}

    @Post("register")
    @ApiCreatedResponse({description: "Review created successfully"})
    async register(@Body() dto: CreateReviewDTO) {
        const response = await this.reviewService.createReview(dto);
        return ReviewOutputDTO.toResponse(response);
    }

    @Get("all")
    @ApiOkResponse({description: "Reviews found"})
    @ApiNotFoundResponse({description: "Reviews not found"})
    async getReviews() {
        const reviews = await this.reviewService.readReviews();
        return reviews.map((review) => ReviewOutputDTO.toResponse(review));
    }

    @Get("all/user/:userId")
    @ApiOkResponse({description: "Reviews found"})
    @ApiNotFoundResponse({description: "Reviews not found"})
    async getUserReviews(@Param("userId") userId: string) {
        const reviews = await this.reviewService.readUserReviews(userId);
        return reviews.map((review) => ReviewOutputDTO.toResponse(review));
    }

    @Get("all/media/:mediaId")
    @ApiOkResponse({description: "Reviews found"})
    @ApiNotFoundResponse({description: "Reviews not found"})
    async getMediaReviews(@Param("mediaId") mediaId: string) {
        const reviews = await this.reviewService.readMediaReviews(mediaId);
        return reviews.map((review) => ReviewOutputDTO.toResponse(review));
    }

    @Get(":userId/:mediaId")
    @ApiOkResponse({description: "Review found"})
    @ApiNotFoundResponse({description: "Review not found"})
    async getReview(
        @Param("userId") userId,
        @Param("mediaId") mediaId
    ) {
        const response = await this.reviewService.readReview(userId, mediaId);
        return ReviewOutputDTO.toResponse(response);
    }

    @Put("update/:userId/:mediaId")
    @ApiOkResponse({description: "Review updated successfully"})
    @ApiNotFoundResponse({description: "Review not found"})
    async updateReview(
        @Param("userId") userId,
        @Param("mediaId") mediaId,
        @Body() dto: UpdateReviewDTO
    ) {
        const response = await this.reviewService.updateReview(userId, mediaId, dto);
        return ReviewOutputDTO.toResponse(response);
    }

    @Delete("delete/:userId/:mediaId")
    @ApiOkResponse({description: "Review updated successfully"})
    @ApiNotFoundResponse({description: "Review not found"})
    async deleteReview(
        @Param("userId") userId,
        @Param("mediaId") mediaId,
    ) {
        const response = await this.reviewService.deleteReview(userId, mediaId);
        return ReviewOutputDTO.toResponse(response);
    }
}