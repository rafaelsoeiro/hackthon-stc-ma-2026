-- CreateTable
CREATE TABLE "ProgramaSocial" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "detalhe" TEXT,
    "secretaria" TEXT,
    "status" TEXT NOT NULL DEFAULT 'ativo',
    "beneficiados" INTEGER,
    "municipiosCobertos" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProgramaSocial_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProgramaSocial_nome_key" ON "ProgramaSocial"("nome");

-- CreateIndex
CREATE INDEX "ProgramaSocial_status_idx" ON "ProgramaSocial"("status");
