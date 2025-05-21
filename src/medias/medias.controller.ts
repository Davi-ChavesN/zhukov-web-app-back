import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { MediaService } from "./medias.service";
import { CreateMediaDTO } from "./dto/in/create-media.dto";
import { MediaOutputDTO } from "./dto/out/media-output.dto";
import { UpdateMediaDTO } from "./dto/in/update-media.dto";

@ApiTags("Media")
@Controller("media")
export class MediaController {
    constructor(private readonly mediaService: MediaService) { }

    @Post("register")
    @ApiOperation({ summary: "Creates a media" })
    @ApiCreatedResponse({ description: "Media registered successfully" })
    async register(@Body() dto: CreateMediaDTO) {
        const response = await this.mediaService.createMedia(dto);
        return MediaOutputDTO.toResponse(response);
    }

    @Get("all")
    @ApiOperation({ summary: "Gets all medias" })
    @ApiOkResponse({ description: "Medias found" })
    @ApiNotFoundResponse({ description: "No medias found" })
    async getMedias() {
        const medias = await this.mediaService.readMedias();
        return medias.map((media) => MediaOutputDTO.toResponse(media));
    }

    @Get("/:id")
    @ApiOperation({ summary: "Gets a media by ID" })
    @ApiOkResponse({ description: "Media found" })
    @ApiNotFoundResponse({ description: "Media not found" })
    async getMedia(@Param("id") id: string) {
        const response = await this.mediaService.readMediaById(id);
        return MediaOutputDTO.toResponse(response);
    }

    @Put("update/:id")
    @ApiOperation({ summary: "Updates a media by ID" })
    @ApiOkResponse({ description: "Media updated successfully" })
    @ApiNotFoundResponse({ description: "Media not found" })
    async updateMedia(@Param("id") id: string, @Body() dto: UpdateMediaDTO) {
        const response = await this.mediaService.updateMedia(id, dto);
        return MediaOutputDTO.toResponse(response);
    }

    @Delete("delete/:id")
    @ApiOperation({ summary: "Delete a media by ID" })
    @ApiOkResponse({ description: "Media deleted successfully" })
    @ApiNotFoundResponse({ description: "Media not found" })
    async deleteMedia(@Param("id") id: string) {
        const response = await this.mediaService.deleteMedia(id);
        return MediaOutputDTO.toResponse(response);
    }
}