export class UserOutputDTO {
    id: string;
    name: string;
    nickname: string;
    email: string;
    birthDate: Date;
    userRole: string;

    private constructor(
        id: string,
        name: string,
        nickname: string,
        email: string,
        birthDate: Date,
        userRole: string,
    ) {
        this.id = id;
        this.name = name;
        this.nickname = nickname;
        this.email = email;
        this.birthDate = birthDate;
        this.userRole = userRole;
    }

    static toResponse(user: {
        id: string;
        name: string;
        nickname: string;
        email: string;
        birthDate: Date;
        userRole: string;
    }): UserOutputDTO {
        return new UserOutputDTO(user.id, user.name, user.nickname, user.email, user.birthDate, user.userRole);
    }
}