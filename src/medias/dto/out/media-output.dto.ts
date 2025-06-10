export class MediaOutputDTO {
    id: string;
    title: string;
    description: string;
    director: string;
    releaseYear: number;
    duration: number;
    producer: string;
    score: number;
    posterUrl: string;
    bannerUrl: string;
    trailerUrl: string;
    mediaGenres: string[];

    private constructor(
        id: string,
        title: string,
        description: string,
        director: string,
        releaseYear: number,
        duration: number,
        producer: string,
        score: number,
        posterUrl: string,
        bannerUrl: string,
        trailerUrl: string,
        mediaGenres: string[],
    ) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.director = director;
        this.releaseYear = releaseYear;
        this.duration = duration;
        this.producer = producer;
        this.score = score;
        this.posterUrl = posterUrl;
        this.bannerUrl = bannerUrl;
        this.trailerUrl = trailerUrl;
        this.mediaGenres = mediaGenres;
    }

    static toResponse(media: {
        id: string;
        title: string;
        description: string;
        director: string;
        releaseYear: number;
        duration: number;
        producer: string;
        score: number;
        posterUrl: string;
        bannerUrl: string;
        trailerUrl: string;
        mediaGenres: { genre: { description: string } }[];
    }): MediaOutputDTO {
        return new MediaOutputDTO(
            media.id,
            media.title,
            media.description,
            media.director,
            media.releaseYear,
            media.duration,
            media.producer,
            media.score,
            media.posterUrl,
            media.bannerUrl,
            media.trailerUrl,
            media.mediaGenres.map((mg) => mg.genre.description),
        );
    }
}