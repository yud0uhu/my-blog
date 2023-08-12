/*
  Warnings:

  - You are about to drop the column `tagId` on the `Post` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_tagId_fkey";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "tagId";

-- AlterTable
ALTER TABLE "Tag" ADD COLUMN     "post_id" TEXT;

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;
