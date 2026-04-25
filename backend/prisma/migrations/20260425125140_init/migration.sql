-- CreateTable
CREATE TABLE "UnidadeGestora" (
    "id" SERIAL NOT NULL,
    "codigo" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "sigla" TEXT,

    CONSTRAINT "UnidadeGestora_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Credor" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "cnpj" TEXT,

    CONSTRAINT "Credor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Despesa" (
    "id" SERIAL NOT NULL,
    "codigoEmpenho" TEXT,
    "descricao" TEXT NOT NULL,
    "dataEmissao" TIMESTAMP(3) NOT NULL,
    "valorEmpenhado" DECIMAL(14,2),
    "valorLiquidado" DECIMAL(14,2),
    "valorPago" DECIMAL(14,2),
    "naturezaDespesa" TEXT,
    "funcao" TEXT,
    "subfuncao" TEXT,
    "programa" TEXT,
    "acao" TEXT,
    "fonte" TEXT,
    "tipoDespesa" TEXT,
    "categoria" TEXT,
    "unidadeGestoraId" INTEGER NOT NULL,
    "credorId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Despesa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Receita" (
    "id" SERIAL NOT NULL,
    "codigo" TEXT,
    "descricao" TEXT NOT NULL,
    "valorPrevisto" DECIMAL(14,2) NOT NULL,
    "valorRealizado" DECIMAL(14,2) NOT NULL,
    "ano" INTEGER NOT NULL,
    "mes" INTEGER,
    "naturezaReceita" TEXT NOT NULL,
    "fonte" TEXT,
    "categoria" TEXT,
    "unidadeGestoraId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Receita_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transferencia" (
    "id" SERIAL NOT NULL,
    "tipo" TEXT NOT NULL,
    "ano" INTEGER NOT NULL,
    "mes" INTEGER,
    "descricao" TEXT,
    "valorPrevisto" DECIMAL(14,2),
    "valorRealizado" DECIMAL(14,2),
    "valorEmpenhado" DECIMAL(14,2),
    "valorLiquidado" DECIMAL(14,2),
    "valorPago" DECIMAL(14,2),
    "natureza" TEXT,
    "fonte" TEXT,
    "funcao" TEXT,
    "programa" TEXT,
    "categoria" TEXT,
    "unidadeGestoraId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transferencia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Servidor" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "cpf" TEXT,
    "matricula" TEXT,

    CONSTRAINT "Servidor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Remuneracao" (
    "id" SERIAL NOT NULL,
    "ano" INTEGER NOT NULL,
    "mes" INTEGER NOT NULL,
    "valor" DECIMAL(14,2),
    "cargo" TEXT NOT NULL,
    "naturezaCargo" TEXT NOT NULL,
    "categoria" TEXT,
    "unidadeGestoraId" INTEGER NOT NULL,
    "servidorId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Remuneracao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TipoContratacao" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "TipoContratacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Licitacao" (
    "id" SERIAL NOT NULL,
    "numeroProcesso" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "ano" INTEGER NOT NULL,
    "dataPublicacao" TIMESTAMP(3),
    "dataAbertura" TIMESTAMP(3),
    "status" TEXT NOT NULL,
    "valorEstimado" DECIMAL(14,2),
    "valorHomologado" DECIMAL(14,2),
    "prazoEntrega" TEXT,
    "localEntrega" TEXT,
    "categoria" TEXT,
    "unidadeGestoraId" INTEGER NOT NULL,
    "tipoContratacaoId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Licitacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contrato" (
    "id" SERIAL NOT NULL,
    "numero" TEXT NOT NULL,
    "ano" INTEGER NOT NULL,
    "objeto" TEXT NOT NULL,
    "dataAssinatura" TIMESTAMP(3),
    "valorGlobal" DECIMAL(14,2),
    "inicioVigencia" TIMESTAMP(3),
    "fimVigencia" TIMESTAMP(3),
    "status" TEXT,
    "origem" TEXT,
    "categoria" TEXT,
    "unidadeGestoraId" INTEGER NOT NULL,
    "credorId" INTEGER,
    "tipoContratacaoId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Contrato_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Obra" (
    "id" SERIAL NOT NULL,
    "descricao" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "percentualExecucao" DOUBLE PRECISION,
    "dataInicio" TIMESTAMP(3),
    "dataPrevisaoFim" TIMESTAMP(3),
    "dataAtualizacao" TIMESTAMP(3),
    "valorContrato" DECIMAL(14,2),
    "valorAditivo" DECIMAL(14,2),
    "valorTotal" DECIMAL(14,2),
    "saldo" DECIMAL(14,2),
    "municipio" TEXT NOT NULL,
    "localidade" TEXT,
    "categoria" TEXT,
    "unidadeGestoraId" INTEGER NOT NULL,
    "credorId" INTEGER,
    "contratoId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Obra_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmendaParlamentar" (
    "id" SERIAL NOT NULL,
    "numeroEmpenho" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "descricao" TEXT,
    "dataEmissao" TIMESTAMP(3),
    "valorEmpenhado" DECIMAL(14,2),
    "valorLiquidado" DECIMAL(14,2),
    "valorPago" DECIMAL(14,2),
    "funcao" TEXT,
    "subfuncao" TEXT,
    "programa" TEXT,
    "acao" TEXT,
    "fonte" TEXT,
    "naturezaDespesa" TEXT,
    "processo" TEXT,
    "categoria" TEXT,
    "unidadeGestoraId" INTEGER NOT NULL,
    "credorId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EmendaParlamentar_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UnidadeGestora_codigo_key" ON "UnidadeGestora"("codigo");

-- CreateIndex
CREATE INDEX "Credor_cnpj_idx" ON "Credor"("cnpj");

-- CreateIndex
CREATE INDEX "Despesa_unidadeGestoraId_idx" ON "Despesa"("unidadeGestoraId");

-- CreateIndex
CREATE INDEX "Despesa_dataEmissao_idx" ON "Despesa"("dataEmissao");

-- CreateIndex
CREATE INDEX "Receita_unidadeGestoraId_idx" ON "Receita"("unidadeGestoraId");

-- CreateIndex
CREATE INDEX "Receita_ano_mes_idx" ON "Receita"("ano", "mes");

-- CreateIndex
CREATE INDEX "Transferencia_unidadeGestoraId_idx" ON "Transferencia"("unidadeGestoraId");

-- CreateIndex
CREATE INDEX "Transferencia_ano_mes_idx" ON "Transferencia"("ano", "mes");

-- CreateIndex
CREATE INDEX "Servidor_cpf_idx" ON "Servidor"("cpf");

-- CreateIndex
CREATE INDEX "Remuneracao_unidadeGestoraId_idx" ON "Remuneracao"("unidadeGestoraId");

-- CreateIndex
CREATE INDEX "Remuneracao_ano_mes_idx" ON "Remuneracao"("ano", "mes");

-- CreateIndex
CREATE UNIQUE INDEX "TipoContratacao_nome_key" ON "TipoContratacao"("nome");

-- CreateIndex
CREATE INDEX "Licitacao_unidadeGestoraId_idx" ON "Licitacao"("unidadeGestoraId");

-- CreateIndex
CREATE INDEX "Licitacao_ano_idx" ON "Licitacao"("ano");

-- CreateIndex
CREATE INDEX "Contrato_unidadeGestoraId_idx" ON "Contrato"("unidadeGestoraId");

-- CreateIndex
CREATE INDEX "Contrato_ano_idx" ON "Contrato"("ano");

-- CreateIndex
CREATE INDEX "Obra_unidadeGestoraId_idx" ON "Obra"("unidadeGestoraId");

-- CreateIndex
CREATE INDEX "Obra_municipio_idx" ON "Obra"("municipio");

-- CreateIndex
CREATE INDEX "EmendaParlamentar_unidadeGestoraId_idx" ON "EmendaParlamentar"("unidadeGestoraId");

-- CreateIndex
CREATE INDEX "EmendaParlamentar_dataEmissao_idx" ON "EmendaParlamentar"("dataEmissao");

-- AddForeignKey
ALTER TABLE "Despesa" ADD CONSTRAINT "Despesa_unidadeGestoraId_fkey" FOREIGN KEY ("unidadeGestoraId") REFERENCES "UnidadeGestora"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Despesa" ADD CONSTRAINT "Despesa_credorId_fkey" FOREIGN KEY ("credorId") REFERENCES "Credor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Receita" ADD CONSTRAINT "Receita_unidadeGestoraId_fkey" FOREIGN KEY ("unidadeGestoraId") REFERENCES "UnidadeGestora"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transferencia" ADD CONSTRAINT "Transferencia_unidadeGestoraId_fkey" FOREIGN KEY ("unidadeGestoraId") REFERENCES "UnidadeGestora"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Remuneracao" ADD CONSTRAINT "Remuneracao_unidadeGestoraId_fkey" FOREIGN KEY ("unidadeGestoraId") REFERENCES "UnidadeGestora"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Remuneracao" ADD CONSTRAINT "Remuneracao_servidorId_fkey" FOREIGN KEY ("servidorId") REFERENCES "Servidor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Licitacao" ADD CONSTRAINT "Licitacao_unidadeGestoraId_fkey" FOREIGN KEY ("unidadeGestoraId") REFERENCES "UnidadeGestora"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Licitacao" ADD CONSTRAINT "Licitacao_tipoContratacaoId_fkey" FOREIGN KEY ("tipoContratacaoId") REFERENCES "TipoContratacao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contrato" ADD CONSTRAINT "Contrato_unidadeGestoraId_fkey" FOREIGN KEY ("unidadeGestoraId") REFERENCES "UnidadeGestora"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contrato" ADD CONSTRAINT "Contrato_credorId_fkey" FOREIGN KEY ("credorId") REFERENCES "Credor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contrato" ADD CONSTRAINT "Contrato_tipoContratacaoId_fkey" FOREIGN KEY ("tipoContratacaoId") REFERENCES "TipoContratacao"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Obra" ADD CONSTRAINT "Obra_unidadeGestoraId_fkey" FOREIGN KEY ("unidadeGestoraId") REFERENCES "UnidadeGestora"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Obra" ADD CONSTRAINT "Obra_credorId_fkey" FOREIGN KEY ("credorId") REFERENCES "Credor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Obra" ADD CONSTRAINT "Obra_contratoId_fkey" FOREIGN KEY ("contratoId") REFERENCES "Contrato"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmendaParlamentar" ADD CONSTRAINT "EmendaParlamentar_unidadeGestoraId_fkey" FOREIGN KEY ("unidadeGestoraId") REFERENCES "UnidadeGestora"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmendaParlamentar" ADD CONSTRAINT "EmendaParlamentar_credorId_fkey" FOREIGN KEY ("credorId") REFERENCES "Credor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
