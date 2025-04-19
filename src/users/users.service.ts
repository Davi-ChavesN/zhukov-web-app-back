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

    async readUsers() {
        const users = await this.userRepository.readUsers();

        if(!users) {
            throw new NotFoundException({
                message: "Users not found",
            });
        }

        return users;
    }

    async readUserById(id: string) {
        const user = await this.userRepository.readUserById(id);

        if (!user) {
            throw new NotFoundException({
                message: "User not found",
            });
        }

        return user;
    }

    async readUserByEmail(email: string) {
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
        const user = await this.userRepository.readUserById(id);
        
        if (!user) {
            throw new NotFoundException({
                message: "User not found",
            });
        }
        
        const deletedUser = await this.userRepository.deleteUser(id);
        return deletedUser;
    }
}