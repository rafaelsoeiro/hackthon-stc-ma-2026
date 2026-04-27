-- Despesa
CREATE INDEX "Despesa_categoria_idx" ON "Despesa"("categoria");
CREATE INDEX "Despesa_programa_idx" ON "Despesa"("programa");
CREATE INDEX "Despesa_funcao_idx" ON "Despesa"("funcao");

-- Receita
CREATE INDEX "Receita_categoria_idx" ON "Receita"("categoria");
CREATE INDEX "Receita_naturezaReceita_idx" ON "Receita"("naturezaReceita");

-- Transferencia
CREATE INDEX "Transferencia_tipo_idx" ON "Transferencia"("tipo");
CREATE INDEX "Transferencia_categoria_idx" ON "Transferencia"("categoria");
CREATE INDEX "Transferencia_programa_idx" ON "Transferencia"("programa");

-- Remuneracao
CREATE INDEX "Remuneracao_cargo_idx" ON "Remuneracao"("cargo");
CREATE INDEX "Remuneracao_naturezaCargo_idx" ON "Remuneracao"("naturezaCargo");

-- Licitacao
CREATE INDEX "Licitacao_status_idx" ON "Licitacao"("status");
CREATE INDEX "Licitacao_categoria_idx" ON "Licitacao"("categoria");

-- Contrato
CREATE INDEX "Contrato_status_idx" ON "Contrato"("status");
CREATE INDEX "Contrato_categoria_idx" ON "Contrato"("categoria");
CREATE INDEX "Contrato_tipoContratacaoId_idx" ON "Contrato"("tipoContratacaoId");
CREATE INDEX "Contrato_dataAssinatura_idx" ON "Contrato"("dataAssinatura");

-- Obra
CREATE INDEX "Obra_status_idx" ON "Obra"("status");
CREATE INDEX "Obra_categoria_idx" ON "Obra"("categoria");
CREATE INDEX "Obra_dataAtualizacao_idx" ON "Obra"("dataAtualizacao");

-- EmendaParlamentar
CREATE INDEX "EmendaParlamentar_tipo_idx" ON "EmendaParlamentar"("tipo");
CREATE INDEX "EmendaParlamentar_categoria_idx" ON "EmendaParlamentar"("categoria");
CREATE INDEX "EmendaParlamentar_programa_idx" ON "EmendaParlamentar"("programa");
