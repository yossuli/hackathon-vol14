-- CreateTable
CREATE TABLE "fireFlower" (
    "id" TEXT NOT NULL,
    "creatorId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "structure" JSONB NOT NULL,

    CONSTRAINT "fireFlower_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "likedFireFlower" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "fireFlowerId" TEXT NOT NULL,
    "likedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "suggestedUserId" TEXT,

    CONSTRAINT "likedFireFlower_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "likedFireFlower_fireFlowerId_idx" ON "likedFireFlower"("fireFlowerId");

-- CreateIndex
CREATE UNIQUE INDEX "likedFireFlower_userId_fireFlowerId_key" ON "likedFireFlower"("userId", "fireFlowerId");

-- AddForeignKey
ALTER TABLE "fireFlower" ADD CONSTRAINT "fireFlower_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likedFireFlower" ADD CONSTRAINT "likedFireFlower_suggestedUserId_fkey" FOREIGN KEY ("suggestedUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likedFireFlower" ADD CONSTRAINT "likedFireFlower_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likedFireFlower" ADD CONSTRAINT "likedFireFlower_fireFlowerId_fkey" FOREIGN KEY ("fireFlowerId") REFERENCES "fireFlower"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
