import { Module } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { UserRepository } from "./users.repository";
import { UserService } from "./users.service";
import { UserController } from "./users.controller";

@Module({
    controllers: [UserController],
    providers: [PrismaService, UserRepository, UserService],
    exports: [UserService],
})
export class UsersModule {}