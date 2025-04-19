import { Module } from "@nestjs/common";
import { GenreController } from "./genres.controller";
import { PrismaService } from "prisma/prisma.service";
import { GenreRepository } from "./genres.repository";
import { GenreService } from "./genres.service";

@Module({
    controllers: [GenreController],
    providers: [PrismaService, GenreRepository, GenreService],
    exports: [],
})
export class GenreModule { }