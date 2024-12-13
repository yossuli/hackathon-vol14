-- DropForeignKey
ALTER TABLE "FireFlowerWithUser" DROP CONSTRAINT "FireFlowerWithUser_fireFlowerId_fkey";

-- DropForeignKey
ALTER TABLE "FireFlowerWithUser" DROP CONSTRAINT "FireFlowerWithUser_userInRoomUserId_fkey";

-- DropForeignKey
ALTER TABLE "Room" DROP CONSTRAINT "Room_createdBy_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_authorId_fkey";

-- DropForeignKey
ALTER TABLE "UserInRoom" DROP CONSTRAINT "UserInRoom_roomId_fkey";

-- DropForeignKey
ALTER TABLE "UserInRoom" DROP CONSTRAINT "UserInRoom_userId_fkey";

-- DropForeignKey
ALTER TABLE "chat" DROP CONSTRAINT "chat_authorId_fkey";

-- DropForeignKey
ALTER TABLE "chat" DROP CONSTRAINT "chat_roomId_fkey";

-- DropForeignKey
ALTER TABLE "fireFlower" DROP CONSTRAINT "fireFlower_creatorId_fkey";

-- DropForeignKey
ALTER TABLE "likedFireFlower" DROP CONSTRAINT "likedFireFlower_fireFlowerId_fkey";

-- DropForeignKey
ALTER TABLE "likedFireFlower" DROP CONSTRAINT "likedFireFlower_suggestedUserId_fkey";

-- DropForeignKey
ALTER TABLE "likedFireFlower" DROP CONSTRAINT "likedFireFlower_userId_fkey";

-- AddForeignKey
ALTER TABLE "UserInRoom" ADD CONSTRAINT "UserInRoom_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserInRoom" ADD CONSTRAINT "UserInRoom_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FireFlowerWithUser" ADD CONSTRAINT "FireFlowerWithUser_userInRoomUserId_fkey" FOREIGN KEY ("userInRoomUserId") REFERENCES "UserInRoom"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FireFlowerWithUser" ADD CONSTRAINT "FireFlowerWithUser_fireFlowerId_fkey" FOREIGN KEY ("fireFlowerId") REFERENCES "fireFlower"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fireFlower" ADD CONSTRAINT "fireFlower_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likedFireFlower" ADD CONSTRAINT "likedFireFlower_suggestedUserId_fkey" FOREIGN KEY ("suggestedUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likedFireFlower" ADD CONSTRAINT "likedFireFlower_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likedFireFlower" ADD CONSTRAINT "likedFireFlower_fireFlowerId_fkey" FOREIGN KEY ("fireFlowerId") REFERENCES "fireFlower"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat" ADD CONSTRAINT "chat_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat" ADD CONSTRAINT "chat_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;
