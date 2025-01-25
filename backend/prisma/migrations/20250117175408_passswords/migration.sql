-- AlterTable
ALTER TABLE "Cliente" ADD COLUMN     "passwordResetToken" TEXT,
ADD COLUMN     "passwordResetTokenExpiration" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Proprietario" ADD COLUMN     "passwordResetToken" TEXT,
ADD COLUMN     "passwordResetTokenExpiration" TIMESTAMP(3);
