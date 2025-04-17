import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { MediaModule } from './medias/medias.module';

@Module({
  imports: [PrismaModule, UsersModule, MediaModule]
})
export class AppModule {}
