-- CreateTable
CREATE TABLE "Media" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "original_title" TEXT NOT NULL,
    "image_url" TEXT,
    "banner_url" TEXT,
    "description" TEXT NOT NULL,
    "format" TEXT NOT NULL,
    "episodes" INTEGER NOT NULL,
    "episode_duration" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "season" TEXT NOT NULL,
    "average_score" DOUBLE PRECISION NOT NULL,
    "studios" TEXT NOT NULL,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);
