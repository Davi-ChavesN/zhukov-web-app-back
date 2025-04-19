import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdateUserDTO } from "./dto/update-user.dto";

@Injectable()
export class UserRepository {
    constructor(private readonly prisma: PrismaService) { }

    async createUser(dto: CreateUserDTO) {
        return await this.prisma.user.create({
            data: {
                name: dto.name,
                nickname: dto.nickname,
                email: dto.email,
                birthDate: dto.birthDate,
                password: dto.password,
            },
        });
    }

    async readUsers() {
        return await this.prisma.user.findMany({
            where: {
                status: "active",
            }
        });
    }

    async readUserById(id: string) {
        return await this.prisma.user.findUnique({
            where: { id },
        });
    }

    async readUserByEmail(email: string) {
        return await this.prisma.user.findUnique({
            where: { email },
        });
    }

    async readUserByNickname(nickname: string) {
        return await this.prisma.user.findUnique({
            where: { nickname },
        });
    }

    async updateUser(id: string, dto: UpdateUserDTO) {
        return await this.prisma.user.update({
            where: { id },
            data: {
                name: dto.name,
                nickname: dto.nickname,
                email: dto.email,
                birthDate: dto.birthDate,
                password: dto.password,
            },
        });
    }

    async deleteUser(id: string) {
        return await this.prisma.user.update({
            where: { id },
            data: {
                status: "inactive",
            }
        });
    }
}