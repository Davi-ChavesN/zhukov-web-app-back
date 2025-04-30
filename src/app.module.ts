import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { MediaModule } from './medias/medias.module';
import { GenreModule } from './genres/genres.module';
import { ReviewModule } from './reviews/reviews.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PrismaModule, UsersModule, MediaModule, GenreModule, ReviewModule, AuthModule]
})
export class AppModule {}
