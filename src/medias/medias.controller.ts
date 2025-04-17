import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { MediaService } from "./medias.service";
import { CreateMediaDTO } from "./dto/create-media.dto";
import { MediaOutputDTO } from "./dto/media-output.dto";
import { UpdateMediaDTO } from "./dto/update-media.dto";

@ApiTags("Media")
@Controller("media")
export class MediaController {
    constructor(private readonly mediaService: MediaService) {}

    @Post("register")
    @ApiCreatedResponse({description: "Media registered successfully"})
    async register(@Body() dto: CreateMediaDTO) {
        const response = await this.mediaService.createMedia(dto);
        return MediaOutputDTO.toResponse(response);
    }

    @Get("all")
    @ApiOkResponse({description: "Medias found"})
    @ApiNotFoundResponse({description: "No medias found"})
    async getMedias() {
        const medias = await this.mediaService.getMedias();
        return medias.map((media) => MediaOutputDTO.toResponse(media));
    }

    @Get("/:id")
    @ApiOkResponse({description: "Media found"})
    @ApiNotFoundResponse({description: "Media not found"})
    async getMedia(@Param("id") id: string) {
        const response = await this.mediaService.getMediaById(id);
        return MediaOutputDTO.toResponse(response);
    }

    @Put("update/:id")
    @ApiOkResponse({description: "Media updated successfully"})
    @ApiNotFoundResponse({description: "Media not found"})
    async updateMedia(@Param("id") id: string, @Body() dto: UpdateMediaDTO) {
        const response = await this.mediaService.updateMedia(id, dto);
        return MediaOutputDTO.toResponse(response);
    }

    @Delete("delete/:id")
    @ApiOkResponse({description: "Media deleted successfully"})
    @ApiNotFoundResponse({description: "Media not found"})
    async deleteMedia(@Param("id") id: string) {
        const response = await this.mediaService.deleteMedia(id);
        return MediaOutputDTO.toResponse(response);
    }
}