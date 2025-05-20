export class GenreOutputDTO {
    id: string;
    description: string;

    private constructor(id: string, description: string) {
        this.id = id;
        this.description = description;
    }

    static toResponse(genre: { id: string; description: string }): GenreOutputDTO {
        return new GenreOutputDTO(genre.id, genre.description);
    }
}