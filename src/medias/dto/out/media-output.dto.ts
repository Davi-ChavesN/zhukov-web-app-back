export class MediaOutputDTO {
    id: string;
    title: string;
    director: string;
    releaseYear: number;
    duration: number;
    producer: string;
    rating: string;
    posterUrl: string;
    mediaGenres: string[];

    private constructor(
        id: string,
        title: string,
        director: string,
        releaseYear: number,
        duration: number,
        producer: string,
        rating: string,
        posterUrl: string,
        mediaGenres: string[],
    ) {
        this.id = id;
        this.title = title;
        this.director = director;
        this.releaseYear = releaseYear;
        this.duration = duration;
        this.producer = producer;
        this.rating = rating;
        this.posterUrl = posterUrl;
        this.mediaGenres = mediaGenres;
    }

    static toResponse(media: {
        id: string;
        title: string;
        director: string;
        releaseYear: number;
        duration: number;
        producer: string;
        rating: string;
        posterUrl: string;
        mediaGenres: { genre: { description: string } }[];
    }): MediaOutputDTO {
        return new MediaOutputDTO(
            media.id,
            media.title,
            media.director,
            media.releaseYear,
            media.duration,
            media.producer,
            media.rating,
            media.posterUrl,
            media.mediaGenres.map((mg) => mg.genre.description),
        );
    }
}