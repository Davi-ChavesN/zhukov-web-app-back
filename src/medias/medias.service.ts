import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { MediaRepository } from "./medias.repository";
import { CreateMediaDTO } from "./dto/in/create-media.dto";
import { UpdateMediaDTO } from "./dto/in/update-media.dto";

@Injectable()
export class MediaService {
    constructor(private readonly mediaRepository: MediaRepository) { }

    async createMedia(dto: CreateMediaDTO) {
        const newMedia = await this.mediaRepository.createMedia(dto);
        return newMedia;
    }

    async readMedias() {
        const medias = await this.mediaRepository.readMedias();

        if (!medias) {
            throw new NotFoundException({
                message: "Medias not found",
            });
        }

        return medias;
    }

    async readMediaById(id: string) {
        const media = await this.mediaRepository.readMediaById(id);

        if (!media) {
            throw new NotFoundException({
                message: "Media not found",
            });
        }

        return media;
    }

    async updateMedia(id: string, dto: UpdateMediaDTO) {
        const media = await this.mediaRepository.readMediaById(id);

        if (!media) {
            throw new NotFoundException({
                message: "Media not found",
            });
        }

        if (dto.genreIds !== undefined && !Array.isArray(dto.genreIds)) {
            throw new BadRequestException({
                message: "genreIds must be an array of strings",
            });
        }

        const updatedMedia = await this.mediaRepository.updateMedia(id, dto);

        return updatedMedia;
    }

    async deleteMedia(id: string) {
        const media = await this.mediaRepository.readMediaById(id);

        if (!media) {
            throw new NotFoundException({
                message: "Media not found",
            });
        }

        const deletedMedia = await this.mediaRepository.deleteMedia(id);
        return deletedMedia;
    }
}