export class UserOutputDTO {
    id: string;
    name: string;
    email: string;
    birthDate: Date;

    private constructor(
        id: string,
        name: string,
        email: string,
        birthDate: Date,
    ) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.birthDate = birthDate;
    }

    static toResponse(user: {
        id: string;
        name: string;
        email: string;
        birthDate: Date;
    }): UserOutputDTO {
        return new UserOutputDTO(user.id, user.name, user.email, user.birthDate);
    }
}