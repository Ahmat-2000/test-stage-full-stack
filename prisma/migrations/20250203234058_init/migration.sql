/*
  Warnings:

  - You are about to drop the `Favorite` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Game` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GameGenre` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Genre` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Favorite";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Game";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "GameGenre";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Genre";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "User";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Games" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "released" DATETIME NOT NULL,
    "rating" REAL NOT NULL,
    "background_image" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Genres" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "GameGenres" (
    "gameId" TEXT NOT NULL,
    "genreId" INTEGER NOT NULL,

    PRIMARY KEY ("gameId", "genreId"),
    CONSTRAINT "GameGenres_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Games" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "GameGenres_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genres" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Favorites" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,
    CONSTRAINT "Favorites_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Favorites_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Games" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Genres_name_key" ON "Genres"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Favorites_userId_gameId_key" ON "Favorites"("userId", "gameId");
