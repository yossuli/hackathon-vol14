-- CreateTable
CREATE TABLE "UserInRoom" (
    "userId" TEXT NOT NULL,
    "enteredAt" TIMESTAMP(3) NOT NULL,
    "roomId" TEXT NOT NULL,

    CONSTRAINT "UserInRoom_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "FireFlowerWithUser" (
    "userInRoomUserId" TEXT NOT NULL,
    "fireFlowerId" TEXT NOT NULL,

    CONSTRAINT "FireFlowerWithUser_pkey" PRIMARY KEY ("userInRoomUserId","fireFlowerId")
);

-- CreateTable
CREATE TABLE "chat" (
    "id" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "chat_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserInRoom" ADD CONSTRAINT "UserInRoom_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserInRoom" ADD CONSTRAINT "UserInRoom_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FireFlowerWithUser" ADD CONSTRAINT "FireFlowerWithUser_userInRoomUserId_fkey" FOREIGN KEY ("userInRoomUserId") REFERENCES "UserInRoom"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FireFlowerWithUser" ADD CONSTRAINT "FireFlowerWithUser_fireFlowerId_fkey" FOREIGN KEY ("fireFlowerId") REFERENCES "fireFlower"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat" ADD CONSTRAINT "chat_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat" ADD CONSTRAINT "chat_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
