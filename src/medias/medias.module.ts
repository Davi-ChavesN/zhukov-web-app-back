import { Module } from "@nestjs/common";
import { MediaController } from "./medias.controller";
import { PrismaService } from "prisma/prisma.service";
import { MediaRepository } from "./medias.repository";
import { MediaService } from "./medias.service";

@Module({
    controllers: [MediaController],
    providers: [PrismaService, MediaRepository, MediaService],
    exports: [],
})
export class MediaModule {}