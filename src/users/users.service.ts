import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { CreateUserDTO } from "./dto/in/create-user.dto";
import { UpdateUserDTO } from "./dto/in/update-user.dto";
import { UserRepository } from "./users.repository";
import * as bcrypt from "bcrypt";
import { ConflictException } from "@nestjs/common/exceptions/conflict.exception";
import { UpdateUserPasswordDTO } from "./dto/in/update-user-password.dto";

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) { }

    async createUser(dto: CreateUserDTO) {
        const userExistsEmail = await this.userRepository.readUserByEmail(dto.email);
        const userExistsNickname = await this.userRepository.readUserByNickname(dto.nickname);

        if (userExistsEmail) {
            throw new ConflictException({
                message: "Email already registered",
                clientMessage: "Email já registrado"
            })
        }

        if (userExistsNickname) {
            throw new ConflictException({
                message: "Nickname already registered",
                clientMessage: "Nome de usuário já registrado"
            })
        }

        const hashedPassword = await bcrypt.hash(dto.password, 10);
        dto.password = hashedPassword;

        const newUser = await this.userRepository.createUser(dto);
        return newUser;
    }

    async readUsers() {
        const users = await this.userRepository.readUsers();

        if (!users) {
            throw new NotFoundException({
                message: "Users not found",
                clientMessage: "Usuários não encontrados"
            });
        }

        return users;
    }

    async readUserById(id: string) {
        const user = await this.userRepository.readUserById(id);

        if (!user) {
            throw new NotFoundException({
                message: "User not found",
                clientMessage: "Usuário não encontrado"
            });
        }

        return user;
    }

    async readUserByEmail(email: string) {
        const user = await this.userRepository.readUserByEmail(email);

        if (!user) {
            throw new NotFoundException({
                message: "User not found",
                clientMessage: "Usuário não encontrado"
            });
        }

        return user;
    }

    async updateUser(id: string, dto: UpdateUserDTO) {
        const user = await this.userRepository.readUserById(id);

        if (!user) {
            throw new NotFoundException({
                message: "User not found",
                clientMessage: "Usuário não encontrado"
            });
        }

        const isPasswordValid = await bcrypt.compare(dto.confirmPassword, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException({
                message: "Invalid password",
                clientMessage: "Senha inválida"
            });
        }

        const updatedUser = await this.userRepository.updateUser(id, {
            ...dto,
            birthDate: new Date(dto.birthDate),
        });
        return updatedUser;

    }

    async updateUserPassword(id: string, dto: UpdateUserPasswordDTO) {
        const user = await this.userRepository.readUserById(id);

        if (!user) {
            throw new NotFoundException({
                message: "User not found",
                clientMessage: "Usuário não encontrado"
            });
        }

        const isPasswordValid = await bcrypt.compare(dto.password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException({
                message: "Invalid password",
                clientMessage: "Senha inválida"
            });
        }

        const hashedPassword = await bcrypt.hash(dto.newPassword, 10);

        const updatedUser = await this.userRepository.updateUserPassword(id, {
            ...dto,
            newPassword: hashedPassword
        });
        return updatedUser;
    }

    async deleteUser(id: string) {
        const user = await this.userRepository.readUserById(id);

        if (!user) {
            throw new NotFoundException({
                message: "User not found",
                clientMessage: "Usuário não encontrado"
            });
        }

        const deletedUser = await this.userRepository.deleteUser(id);
        return deletedUser;
    }
}