import { ApiProperty } from "@nestjs/swagger";

export class UserOutputDTO {
    @ApiProperty({ example: "123e4567-e89b-12d3-a456-426614174000", description: "Unique identifier of the user" })
    id: string;

    @ApiProperty({ example: "John Doe", description: "Full name of the user" })
    name: string;

    @ApiProperty({ example: "johnny", description: "Nickname of the user" })
    nickname: string;

    @ApiProperty({ example: "john@example.com", description: "Email address of the user" })
    email: string;

    @ApiProperty({ example: "1990-05-15", description: "Date of birth in YYYY-MM-DD format" })
    birthDate: string;

    @ApiProperty({ example: "user", description: "Role assigned to the user (e.g., admin, user)" })
    userRole: string;

    @ApiProperty({ example: "active", description: "Shows if the account is enabled"})
    status: string;

    private constructor(
        id: string,
        name: string,
        nickname: string,
        email: string,
        birthDate: string,
        userRole: string,
        status: string,
    ) {
        this.id = id;
        this.name = name;
        this.nickname = nickname;
        this.email = email;
        this.birthDate = birthDate;
        this.userRole = userRole;
        this.status = status;
    }

    static toResponse(user: {
        id: string;
        name: string;
        nickname: string;
        email: string;
        birthDate: Date;
        userRole: string;
        status: string;
    }): UserOutputDTO {
        const formattedDate = user.birthDate.toISOString().split('T')[0];
        return new UserOutputDTO(
            user.id,
            user.name,
            user.nickname,
            user.email,
            formattedDate,
            user.userRole,
            user.status
        );
    }
}