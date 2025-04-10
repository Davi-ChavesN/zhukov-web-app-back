import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdateUserDTO } from "./dto/update-user.dto";
import { UserRepository } from "./users.repository";
import * as bcrypt from "bcrypt";
import { ConflictException } from "@nestjs/common/exceptions/conflict.exception";

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) { }

    async createUser(dto: CreateUserDTO) {
        const userExists = await this.userRepository.readUserByEmail(dto.email);

        if (userExists) {
            throw new ConflictException({
                message: "Email already registered"
            })
        }

        const hashedPassword = await bcrypt.hash(dto.password, 10);
        dto.password = hashedPassword;

        const newUser = await this.userRepository.createUser(dto);
        return newUser;
    }

    async getUsers() {
        const users = await this.userRepository.readUsers();
        return users;
    }

    async getUserById(id: string) {
        const user = await this.userRepository.readUserById(id);

        if (!user) {
            throw new NotFoundException({
                message: "User not found",
            });
        }

        return user;
    }

    async getUserByEmail(email: string) {
        const user = await this.userRepository.readUserByEmail(email);

        if (!user) {
            throw new NotFoundException({
                message: "User not found",
            });
        }

        return user;
    }

    async updateUser(id: string, dto: UpdateUserDTO) {
        const user = await this.userRepository.readUserById(id);

        if (!user) {
            throw new NotFoundException({
                message: "User not found",
            });
        }

        const updatedUser = await this.userRepository.updateUser(id, dto);

        return updatedUser;
    }

    async deleteUser(id: string) {
        const deletedUser = await this.userRepository.deleteUser(id);

        if (!deletedUser) {
            throw new NotFoundException({
                message: "User not found",
            });
        }

        return deletedUser;
    }
}