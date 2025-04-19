import { Module } from "@nestjs/common";
import { ReviewController } from "./reviews.controller";
import { PrismaService } from "prisma/prisma.service";
import { ReviewRepository } from "./reviews.repository";
import { ReviewService } from "./reviews.service";

@Module({
    controllers: [ReviewController],
    providers: [PrismaService, ReviewRepository, ReviewService],
    exports: [],
})
export class ReviewModule { }