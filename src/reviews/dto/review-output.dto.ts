export class ReviewOutputDTO {
    userId: string;
    mediaId: string;
    score: number;
    comment?: string | null;

    private constructor(
        userId: string,
        mediaId: string,
        score: number,
        comment?: string | null,
    ) {
        this.userId = userId;
        this.mediaId = mediaId;
        this.score = score;
        this.comment = comment;
    }

    static toResponse(review: {
        userId: string;
        mediaId: string;
        score: number;
        comment?: string | null;
    }): ReviewOutputDTO {
        return new ReviewOutputDTO(
            review.userId,
            review.mediaId,
            review.score,
            review.comment
        );
    }
}