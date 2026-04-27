// src/modules/transparency/constants/thesaurus.map.ts
// Tesauro de Transparência do Maranhão — v2.2
// Gerado automaticamente a partir da planilha oficial da SEATRAN/STC
// IN nº 001/2025 — Maranhão Transparente | ISO 25964

export const THESAURUS_MAP: Record<
  string,
  {
    id: string;
    assunto: string;
    termoGenerico: string;
    termosEspecificos: string[];
    termosRelacionados: string[];
    termosNaoPreferenciais: string[];
    definicao: string;
    escopo: string;
    metadados: string[];
    prazoPublicacao: string;
    cicloColeta: string;
    fluxoOrigem: string;
    baseLegal: string[];
    status: string;
  }
> = {
  // ─────────────────────────────────────────────────────────────────────────────
  // ABA: Institucional
  // ─────────────────────────────────────────────────────────────────────────────

  'ESTRUTURA ORGANIZACIONAL': {
    id: 'MT-0001',
    assunto: 'Institucional',
    termoGenerico: 'INFORMAÇÃO INSTITUCIONAL',
    termosEspecificos: [
      'ORGANOGRAMA',
      'UNIDADE ADMINISTRATIVA',
      'VÍNCULO HIERÁRQUICO',
      'COMPETÊNCIA INSTITUCIONAL',
    ],
    termosRelacionados: [
      'DIRIGENTE',
      'ATO DE NOMEAÇÃO',
      'REGIMENTO INTERNO',
      'BASE NORMATIVA',
    ],
    termosNaoPreferenciais: ['ESTRUTURA DO ÓRGÃO', 'ORGANIZAÇÃO INTERNA'],
    definicao:
      'Arranjo formal das unidades administrativas de um órgão ou entidade, incluindo suas competências e relações hierárquicas.',
    escopo:
      'Enviar representação oficial da organização interna do órgão. Não incluir dados de contato, endereços ou informações funcionais de servidores específicos. Atualizar sempre que houver alteração estrutural formal (decreto ou portaria).',
    metadados: [
      'Código da Unidade',
      'Nome da Unidade',
      'Unidade Superior',
      'Nível Hierárquico',
      'Competência',
      'Dirigente Vinculado',
      'Data de Atualização',
      'Fonte Oficial',
    ],
    prazoPublicacao: 'Sob alteração estrutural formal (LAI – Art. 8º, §1º, I)',
    cicloColeta:
      'Sob evento (alteração estrutural) — Envio imediato após publicação do ato',
    fluxoOrigem: '🔵 Coleta manual — Maranhão Transparente',
    baseLegal: [
      'Lei nº 12.527/2011 – Art. 8º, §1º, I',
      'Decreto Federal nº 7.724/2012',
      'Cartilha PNTP 2025 – Critério 2.1',
    ],
    status: 'Em validação',
  },

  DIRIGENTE: {
    id: 'MT-0002',
    assunto: 'Institucional',
    termoGenerico: 'ESTRUTURA ORGANIZACIONAL',
    termosEspecificos: [
      'SECRETÁRIO',
      'SECRETÁRIO ADJUNTO',
      'DIRETOR',
      'COORDENADOR',
      'SUBSECRETÁRIO',
    ],
    termosRelacionados: [
      'ATO DE NOMEAÇÃO',
      'REMUNERAÇÃO',
      'COMPETÊNCIA INSTITUCIONAL',
      'ESTRUTURA ORGANIZACIONAL',
    ],
    termosNaoPreferenciais: ['GESTOR', 'CHEFIA', 'DIRIGENTE ATUAL'],
    definicao:
      'Pessoa formalmente designada para exercer função de direção ou gestão no âmbito de órgão ou entidade pública.',
    escopo:
      'Enviar apenas o ocupante atual do cargo. Não incluir histórico de ex-ocupantes. Atualizar imediatamente após nomeação ou exoneração publicada no Diário Oficial. Não confundir com SERVIDOR PÚBLICO ATIVO (MT-0012).',
    metadados: [
      'Nome',
      'Cargo',
      'Data de Início',
      'Ato de Nomeação (link)',
      'Data de Atualização',
      'Fonte Oficial',
    ],
    prazoPublicacao: 'Imediato após publicação do ato (LAI – Art. 8º, §1º, I)',
    cicloColeta: 'Sob evento (nomeação / exoneração) — Envio imediato',
    fluxoOrigem: '🔵 Coleta manual — Maranhão Transparente',
    baseLegal: [
      'Lei nº 12.527/2011 – Art. 8º, §1º, I',
      'Decreto Federal nº 7.724/2012',
      'Cartilha PNTP 2025 – Critério 2.3',
    ],
    status: 'Em validação',
  },

  'CONTATO INSTITUCIONAL': {
    id: 'MT-0003',
    assunto: 'Institucional',
    termoGenerico: 'INFORMAÇÃO INSTITUCIONAL',
    termosEspecificos: [
      'ENDEREÇO INSTITUCIONAL',
      'TELEFONE INSTITUCIONAL',
      'E-MAIL INSTITUCIONAL',
      'SÍTIO ELETRÔNICO',
      'HORÁRIO DE ATENDIMENTO',
    ],
    termosRelacionados: [
      'OUVIDORIA',
      'SERVIÇO DE INFORMAÇÃO AO CIDADÃO (SIC)',
      'E-SIC',
      'CARTA DE SERVIÇOS AO USUÁRIO',
    ],
    termosNaoPreferenciais: [
      'CANAL DE ATENDIMENTO',
      'CONTATO DO ÓRGÃO',
      'FORMAS DE CONTATO',
    ],
    definicao:
      'Meios oficiais disponibilizados para comunicação entre o cidadão e o órgão ou entidade pública.',
    escopo:
      'Divulgar exclusivamente canais institucionais oficiais e verificados. Não incluir contatos pessoais de servidores. Validar operacionalidade dos canais ao menos uma vez por ano.',
    metadados: [
      'Tipo de Canal',
      'Endereço',
      'Telefone',
      'E-mail',
      'Horário de Funcionamento',
      'Data de Atualização',
      'Fonte Oficial',
    ],
    prazoPublicacao: 'Sob alteração (LAI – Art. 8º, §1º, I)',
    cicloColeta:
      'Sob evento (mudança de endereço, telefone ou horário) — Validação anual obrigatória',
    fluxoOrigem: '🔵 Coleta manual — Maranhão Transparente',
    baseLegal: [
      'Lei nº 12.527/2011 – Art. 8º, §1º, I',
      'Decreto Federal nº 7.724/2012',
      'Cartilha PNTP 2025 – Critérios 2.4 e 2.5',
    ],
    status: 'Em validação',
  },

  'LEGISLAÇÃO INSTITUCIONAL': {
    id: 'MT-0004',
    assunto: 'Institucional',
    termoGenerico: 'BASE NORMATIVA',
    termosEspecificos: [
      'LEI',
      'DECRETO',
      'PORTARIA',
      'RESOLUÇÃO',
      'INSTRUÇÃO NORMATIVA',
      'ATO ADMINISTRATIVO',
    ],
    termosRelacionados: [
      'DIÁRIO OFICIAL',
      'REGIMENTO INTERNO',
      'COMPETÊNCIA INSTITUCIONAL',
      'ESTRUTURA ORGANIZACIONAL',
    ],
    termosNaoPreferenciais: [
      'NORMAS DO ÓRGÃO',
      'LEGISLAÇÃO APLICÁVEL',
      'BASE LEGAL',
    ],
    definicao:
      'Conjunto de atos normativos que regulam e fundamentam a atuação institucional do órgão ou entidade.',
    escopo:
      'Incluir apenas atos com publicação oficial verificável no Diário Oficial. Registrar a situação de cada ato: vigente ou revogado. Link para o Diário Oficial é obrigatório.',
    metadados: [
      'Tipo do Ato',
      'Número',
      'Data de Publicação',
      'Ementa',
      'Link (Diário Oficial)',
      'Situação (vigente / revogado)',
      'Fonte Oficial',
    ],
    prazoPublicacao: 'Sempre que houver novo ato normativo (LAI – Art. 8º)',
    cicloColeta:
      'Sob evento (publicação de novo ato) — Envio imediato após publicação',
    fluxoOrigem: '🔵 Coleta manual — Maranhão Transparente',
    baseLegal: [
      'Lei nº 12.527/2011 – Art. 8º',
      'Decreto Federal nº 7.724/2012',
      'Cartilha PNTP 2025 – Critério 2.6',
    ],
    status: 'Em validação',
  },

  'SERVIÇO PÚBLICO': {
    id: 'MT-0005',
    assunto: 'Institucional',
    termoGenerico: 'ATUAÇÃO INSTITUCIONAL',
    termosEspecificos: [
      'CATÁLOGO DE SERVIÇOS',
      'PRAZO DE ATENDIMENTO',
      'TAXA',
      'FORMULÁRIO',
      'REQUISITO',
      'CANAL DE PRESTAÇÃO',
    ],
    termosRelacionados: [
      'CARTA DE SERVIÇOS AO USUÁRIO',
      'CONTATO INSTITUCIONAL',
      'USUÁRIO',
      'PROTOCOLO',
    ],
    termosNaoPreferenciais: [
      'SERVIÇOS OFERECIDOS',
      'ATENDIMENTO AO CIDADÃO',
      'PRESTAÇÃO DE SERVIÇOS',
    ],
    definicao:
      'Atividade administrativa destinada ao atendimento de demandas do cidadão ou usuário, com requisitos, prazos e custos definidos.',
    escopo:
      'Descrever requisitos, prazos e custos com linguagem acessível. Se o serviço for gratuito, registrar explicitamente. Atualizar sempre que houver alteração nas condições de prestação.',
    metadados: [
      'Nome do Serviço',
      'Descrição',
      'Requisitos',
      'Prazo de Atendimento',
      'Taxa (se houver)',
      'Formulário (link)',
      'Canal de Acesso',
      'Data de Atualização',
      'Fonte Oficial',
    ],
    prazoPublicacao: 'Revisão anual obrigatória (Lei nº 13.460/2017)',
    cicloColeta: 'Ciclo anual — Janeiro de cada exercício',
    fluxoOrigem: '🔵 Coleta manual — Maranhão Transparente',
    baseLegal: [
      'Lei nº 12.527/2011 – Art. 8º, §1º, III',
      'Lei nº 13.460/2017 (Carta de Serviços)',
      'Cartilha PNTP 2025 – Critério 14.2',
    ],
    status: 'Em validação',
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // ABA: Gestão Fiscal
  // ─────────────────────────────────────────────────────────────────────────────

  'EXECUÇÃO ORÇAMENTÁRIA': {
    id: 'MT-0006',
    assunto: 'Gestão Fiscal',
    termoGenerico: 'GESTÃO FISCAL',
    termosEspecificos: [
      'RECEITA PÚBLICA',
      'DESPESA PÚBLICA',
      'CRÉDITO ORÇAMENTÁRIO',
      'RESULTADO ORÇAMENTÁRIO',
    ],
    termosRelacionados: [
      'PLANO PLURIANUAL (PPA)',
      'LEI DE DIRETRIZES ORÇAMENTÁRIAS (LDO)',
      'LEI ORÇAMENTÁRIA ANUAL (LOA)',
      'RELATÓRIO RESUMIDO DA EXECUÇÃO ORÇAMENTÁRIA (RREO)',
    ],
    termosNaoPreferenciais: ['ORÇAMENTO EXECUTADO', 'EXECUÇÃO DO ORÇAMENTO'],
    definicao:
      'Conjunto de atos que demonstram a realização das receitas e das despesas previstas na Lei Orçamentária Anual, evidenciando o cumprimento das metas fiscais.',
    escopo:
      'Dado gerado automaticamente pelo SIGEF — não requer envio manual pelo órgão. A SEATRAN valida a consistência dos dados exportados antes da publicação. Ver detalhamento em RECEITAS PÚBLICAS (MT-0007) e DESPESAS PÚBLICAS (MT-0008).',
    metadados: [
      'Unidade Gestora',
      'Exercício',
      'Receita Prevista',
      'Receita Arrecadada',
      'Despesa Fixada',
      'Despesa Empenhada',
      'Despesa Liquidada',
      'Despesa Paga',
      'Resultado Orçamentário',
      'Fonte de Recursos',
      'Data de Atualização',
      'Fonte Oficial',
    ],
    prazoPublicacao:
      'D+1 útil após registro contábil (LC 131/2009 + Decreto 10.540/2020)',
    cicloColeta:
      'Automatizado — sem ciclo de coleta manual. Validação mensal pela SEATRAN',
    fluxoOrigem: '🟢 Automatizado — SIGEF',
    baseLegal: [
      'LC nº 131/2009',
      'LC nº 101/2000 (LRF)',
      'Decreto Federal nº 10.540/2020',
      'Cartilha PNTP 2025 – Critérios 3.1, 4.1 e 4.2',
    ],
    status: 'Em validação',
  },

  'RECEITAS PÚBLICAS': {
    id: 'MT-0007',
    assunto: 'Gestão Fiscal',
    termoGenerico: 'EXECUÇÃO ORÇAMENTÁRIA',
    termosEspecificos: [
      'ARRECADAÇÃO',
      'CLASSIFICAÇÃO ECONÔMICA DA RECEITA',
      'RECEITA CORRENTE',
      'RECEITA DE CAPITAL',
      'FONTE DE RECURSOS',
      'DÍVIDA ATIVA',
    ],
    termosRelacionados: [
      'EXECUÇÃO ORÇAMENTÁRIA',
      'BALANÇO ORÇAMENTÁRIO',
      'TRANSFERÊNCIA RECEBIDA',
    ],
    termosNaoPreferenciais: [
      'RECEITAS',
      'ENTRADA DE RECURSOS',
      'ARRECADAÇÃO DO ESTADO',
    ],
    definicao:
      'Ingressos financeiros arrecadados pelo ente público, classificados conforme a legislação orçamentária federal em correntes e de capital.',
    escopo:
      'Dado gerado automaticamente pelo SIGEF — não requer envio manual. Divulgar valores efetivamente arrecadados — nunca estimativas ou previsões. Classificação econômica detalhada é obrigatória. Não confundir com TRANSFERÊNCIAS RECEBIDAS (MT-0009).',
    metadados: [
      'Tipo',
      'Categoria Econômica',
      'Origem',
      'Espécie',
      'Rubrica / Alínea',
      'Fonte de Recursos',
      'Unidade Gestora',
      'Exercício / Período',
      'Valor Arrecadado',
      'Valor Previsto',
      'Data de Arrecadação',
      'Data de Atualização',
      'Fonte Oficial',
    ],
    prazoPublicacao:
      'D+1 útil após lançamento/recebimento (LC 131/2009 + Decreto 10.540/2020)',
    cicloColeta:
      'Automatizado — sem ciclo de coleta manual. Validação mensal pela SEATRAN',
    fluxoOrigem: '🟢 Automatizado — SIGEF',
    baseLegal: [
      'LC nº 131/2009',
      'Lei nº 12.527/2011 – Art. 8º, §1º, II',
      'LC nº 101/2000 (LRF)',
      'Cartilha PNTP 2025 – Critérios 3.1 e 3.2',
    ],
    status: 'Em validação',
  },

  'DESPESAS PÚBLICAS': {
    id: 'MT-0008',
    assunto: 'Gestão Fiscal',
    termoGenerico: 'EXECUÇÃO ORÇAMENTÁRIA',
    termosEspecificos: [
      'EMPENHO',
      'LIQUIDAÇÃO',
      'PAGAMENTO',
      'CLASSIFICAÇÃO DA DESPESA',
      'NATUREZA DA DESPESA',
      'DESPESA DE PATROCÍNIO',
      'DESPESA DE PUBLICIDADE',
      'ORDEM BANCÁRIA',
    ],
    termosRelacionados: [
      'CONTRATAÇÃO PÚBLICA',
      'FORNECEDOR',
      'LICITAÇÃO',
      'CONTRATO ADMINISTRATIVO',
      'ORDEM CRONOLÓGICA DE PAGAMENTOS',
    ],
    termosNaoPreferenciais: ['GASTOS PÚBLICOS', 'SAÍDA DE RECURSOS', 'DESPESA'],
    definicao:
      'Aplicação de recursos públicos formalizada nas três fases orçamentárias — empenho, liquidação e pagamento — com identificação do favorecido e da natureza da despesa.',
    escopo:
      'Dado gerado automaticamente pelo SIGEF — não requer envio manual. Divulgar as três fases separadamente (empenho, liquidação, pagamento). Identificação do favorecido e do processo vinculado são obrigatórios.',
    metadados: [
      'Número do Empenho',
      'Fase (Empenho / Liquidação / Pagamento)',
      'Unidade Gestora',
      'Favorecido (CPF/CNPJ)',
      'Natureza da Despesa',
      'Categoria Econômica',
      'Função / Subfunção',
      'Programa / Ação',
      'Fonte de Recursos',
      'Valor',
      'Data',
      'Processo Vinculado',
      'Exercício',
      'Data de Atualização',
      'Fonte Oficial',
    ],
    prazoPublicacao:
      'D+1 útil após registro do ato de despesa (LC 131/2009 + Decreto 10.540/2020)',
    cicloColeta:
      'Automatizado — sem ciclo de coleta manual. Validação mensal pela SEATRAN',
    fluxoOrigem: '🟢 Automatizado — SIGEF',
    baseLegal: [
      'LC nº 131/2009',
      'Lei nº 12.527/2011 – Art. 8º, §1º, II',
      'LC nº 101/2000 (LRF)',
      'Cartilha PNTP 2025 – Critérios 4.1 a 4.6',
    ],
    status: 'Em validação',
  },

  EMPENHO: {
    id: 'MT-0008-TE',
    assunto: 'Gestão Fiscal',
    termoGenerico: 'DESPESAS PÚBLICAS',
    termosEspecificos: [],
    termosRelacionados: ['LIQUIDAÇÃO', 'PAGAMENTO', 'ORDEM BANCÁRIA'],
    termosNaoPreferenciais: ['DINHEIRO RESERVADO', 'RESERVA DE DOTAÇÃO'],
    definicao:
      'Ato pelo qual a autoridade competente cria para o Estado a obrigação de pagamento, pendente ou não de implemento de condição. É a primeira fase da despesa pública.',
    escopo:
      'O governo reserva o dinheiro para garantir que pagará o fornecedor após a entrega do serviço ou produto. Não representa ainda a confirmação de que o serviço foi entregue.',
    metadados: [
      'Número do Empenho',
      'Unidade Gestora',
      'Favorecido',
      'Natureza da Despesa',
      'Valor',
      'Data',
      'Processo Vinculado',
    ],
    prazoPublicacao:
      'D+1 útil após registro (LC 131/2009 + Decreto 10.540/2020)',
    cicloColeta: 'Automatizado — SIGEF',
    fluxoOrigem: '🟢 Automatizado — SIGEF',
    baseLegal: ['LC nº 131/2009', 'Lei nº 4.320/1964 – Art. 58'],
    status: 'Em validação',
  },

  LIQUIDAÇÃO: {
    id: 'MT-0008-TE2',
    assunto: 'Gestão Fiscal',
    termoGenerico: 'DESPESAS PÚBLICAS',
    termosEspecificos: [],
    termosRelacionados: ['EMPENHO', 'PAGAMENTO', 'ORDEM BANCÁRIA'],
    termosNaoPreferenciais: ['SERVIÇO CONFERIDO', 'CONFIRMAÇÃO DE ENTREGA'],
    definicao:
      'Segunda fase da despesa pública, que consiste na verificação do direito adquirido pelo credor, tendo por base os documentos hábeis de comprovação da entrega.',
    escopo:
      'O governo confirmou que o serviço foi entregue corretamente e autorizou o pagamento. Somente após a liquidação o pagamento pode ser efetuado.',
    metadados: [
      'Número do Empenho',
      'Data da Liquidação',
      'Favorecido',
      'Valor Liquidado',
      'Documento Comprobatório',
    ],
    prazoPublicacao:
      'D+1 útil após registro (LC 131/2009 + Decreto 10.540/2020)',
    cicloColeta: 'Automatizado — SIGEF',
    fluxoOrigem: '🟢 Automatizado — SIGEF',
    baseLegal: ['LC nº 131/2009', 'Lei nº 4.320/1964 – Art. 63'],
    status: 'Em validação',
  },

  'TRANSFERÊNCIAS RECEBIDAS': {
    id: 'MT-0009',
    assunto: 'Gestão Fiscal',
    termoGenerico: 'RECEITAS PÚBLICAS',
    termosEspecificos: [
      'TRANSFERÊNCIA DA UNIÃO',
      'TRANSFERÊNCIA VOLUNTÁRIA',
      'CONVÊNIO',
      'CONTRATO DE REPASSE',
      'FUNDO CONSTITUCIONAL',
      'EMENDA PARLAMENTAR',
    ],
    termosRelacionados: [
      'RECEITAS PÚBLICAS',
      'EXECUÇÃO ORÇAMENTÁRIA',
      'PARCERIA PÚBLICA',
      'DESPESAS PÚBLICAS',
    ],
    termosNaoPreferenciais: [
      'REPASSE RECEBIDO',
      'TRANSFERÊNCIA INTERGOVERNAMENTAL',
    ],
    definicao:
      'Recursos financeiros recebidos pelo ente estadual provenientes de outros entes federativos ou entidades, formalizados por convênio, contrato de repasse ou outro instrumento.',
    escopo:
      'Dado gerado automaticamente pelo SIGEF. Divulgar apenas valores efetivamente recebidos. Número do instrumento e ente transferidor são obrigatórios. Não confundir com PARCERIA PÚBLICA (MT-0018).',
    metadados: [
      'Tipo de Transferência',
      'Ente Transferidor',
      'Instrumento / Número',
      'Objeto',
      'Unidade Gestora',
      'Fonte de Recursos',
      'Valor Pactuado',
      'Valor Recebido',
      'Data do Recebimento',
      'Exercício',
      'Data de Atualização',
      'Fonte Oficial',
    ],
    prazoPublicacao:
      'D+1 útil após registro do recebimento (LC 131/2009 + Decreto 10.540/2020)',
    cicloColeta:
      'Automatizado — sem ciclo de coleta manual. Validação mensal pela SEATRAN',
    fluxoOrigem: '🟢 Automatizado — SIGEF',
    baseLegal: [
      'LC nº 131/2009',
      'Lei nº 12.527/2011 – Art. 8º, §1º, II',
      'Cartilha PNTP 2025 – Critério 5.1',
    ],
    status: 'Em validação',
  },

  'RELATÓRIO RESUMIDO DA EXECUÇÃO ORÇAMENTÁRIA (RREO)': {
    id: 'MT-0010',
    assunto: 'Gestão Fiscal',
    termoGenerico: 'GESTÃO FISCAL',
    termosEspecificos: [
      'BALANÇO ORÇAMENTÁRIO',
      'DEMONSTRATIVO DAS RECEITAS E DESPESAS',
      'DEMONSTRATIVO DA DÍVIDA FUNDADA',
      'DEMONSTRATIVO DE RESTOS A PAGAR',
    ],
    termosRelacionados: [
      'EXECUÇÃO ORÇAMENTÁRIA',
      'RELATÓRIO DE GESTÃO FISCAL (RGF)',
      'LEI ORÇAMENTÁRIA ANUAL (LOA)',
    ],
    termosNaoPreferenciais: ['RREO', 'RELATÓRIO BIMESTRAL'],
    definicao:
      'Relatório bimestral exigido pela LRF que consolida a execução orçamentária do ente, com demonstrativos de receitas, despesas, dívida e restos a pagar.',
    escopo:
      'Dado gerado automaticamente pelo SIGEF. Publicar até 30 dias após o encerramento de cada bimestre. O relatório deve conter todos os demonstrativos exigidos pelo art. 52 da LRF.',
    metadados: [
      'Período de Referência (bimestre)',
      'Exercício',
      'Demonstrativo (tipo)',
      'Link do Relatório',
      'Data de Publicação',
      'Fonte Oficial',
    ],
    prazoPublicacao:
      'Até 30 dias após o encerramento do bimestre (LRF – Art. 52)',
    cicloColeta:
      'Automatizado — sem ciclo de coleta manual. Validação bimestral pela SEATRAN',
    fluxoOrigem: '🟢 Automatizado — SIGEF',
    baseLegal: [
      'LC nº 101/2000 (LRF) – Art. 52 e 53',
      'Cartilha PNTP 2025 – Critério 11.6',
    ],
    status: 'Em validação',
  },

  'RELATÓRIO DE GESTÃO FISCAL (RGF)': {
    id: 'MT-0011',
    assunto: 'Gestão Fiscal',
    termoGenerico: 'GESTÃO FISCAL',
    termosEspecificos: [
      'DEMONSTRATIVO DA DESPESA COM PESSOAL',
      'DEMONSTRATIVO DA DÍVIDA CONSOLIDADA',
      'DEMONSTRATIVO DAS GARANTIAS E CONTRAGARANTIAS',
      'DEMONSTRATIVO DAS OPERAÇÕES DE CRÉDITO',
    ],
    termosRelacionados: [
      'EXECUÇÃO ORÇAMENTÁRIA',
      'RELATÓRIO RESUMIDO DA EXECUÇÃO ORÇAMENTÁRIA (RREO)',
      'GESTÃO FISCAL',
    ],
    termosNaoPreferenciais: ['RGF', 'RELATÓRIO QUADRIMESTRAL'],
    definicao:
      'Relatório quadrimestral exigido pela LRF que demonstra o cumprimento dos limites fiscais pelo ente, abrangendo despesa com pessoal, dívida consolidada, garantias e operações de crédito.',
    escopo:
      'Dado gerado automaticamente pelo SIGEF. Publicar até 30 dias após o encerramento de cada quadrimestre. Todos os demonstrativos do art. 55 da LRF são obrigatórios.',
    metadados: [
      'Período de Referência (quadrimestre)',
      'Exercício',
      'Demonstrativo (tipo)',
      'Link do Relatório',
      'Data de Publicação',
      'Fonte Oficial',
    ],
    prazoPublicacao:
      'Até 30 dias após o encerramento do quadrimestre (LRF – Art. 55)',
    cicloColeta:
      'Automatizado — sem ciclo de coleta manual. Validação quadrimestral pela SEATRAN',
    fluxoOrigem: '🔵 Coleta manual — Maranhão Transparente',
    baseLegal: [
      'LC nº 101/2000 (LRF) – Art. 54 e 55',
      'Cartilha PNTP 2025 – Critério 11.5',
    ],
    status: 'Em validação',
  },

  'DÍVIDA ATIVA': {
    id: 'MT-0036',
    assunto: 'Gestão Fiscal',
    termoGenerico: 'GESTÃO FISCAL',
    termosEspecificos: [
      'INSCRIÇÃO EM DÍVIDA ATIVA',
      'CRÉDITO NÃO TRIBUTÁRIO',
      'CRÉDITO TRIBUTÁRIO',
      'DEVEDOR',
      'VALOR INSCRITO',
      'SITUAÇÃO DO DÉBITO',
    ],
    termosRelacionados: [
      'RECEITAS PÚBLICAS',
      'EXECUÇÃO ORÇAMENTÁRIA',
      'COBRANÇA JUDICIAL',
      'EXECUÇÃO FISCAL',
    ],
    termosNaoPreferenciais: [
      'DÍVIDA ATIVA ESTADUAL',
      'DÉBITO INSCRITO',
      'CRÉDITO PÚBLICO NÃO PAGO',
    ],
    definicao:
      'Conjunto de créditos públicos de natureza tributária ou não tributária, não pagos nos prazos definidos em lei, formalmente inscritos em registro próprio para cobrança administrativa ou judicial.',
    escopo:
      'Divulgar exclusivamente inscrições formalmente registradas. Vedado incluir CPF completo ou dados sensíveis além do mínimo legal. Observar restrições da LGPD e legislação tributária estadual sobre sigilo fiscal.',
    metadados: [
      'Nome do Inscrito',
      'CNPJ/CPF (parcial)',
      'Natureza do Crédito',
      'Valor Inscrito',
      'Data de Inscrição',
      'Situação',
      'Data de Atualização',
      'Fonte Oficial',
    ],
    prazoPublicacao:
      'Contínua — atualização imediata após inscrição (LAI – Art. 8º + Cartilha PNTP 2025 – Critério 3.3)',
    cicloColeta:
      'Ciclo contínuo — Envio imediato após cada inscrição ou alteração de situação',
    fluxoOrigem: '🔵 Coleta manual — Maranhão Transparente',
    baseLegal: [
      'Lei nº 12.527/2011 – Art. 8º',
      'Lei nº 6.830/1980 (LEF)',
      'Lei nº 13.709/2018 (LGPD)',
      'Cartilha PNTP 2025 – Critério 3.3',
    ],
    status: 'Em validação',
  },

  'PUBLICIDADE INSTITUCIONAL': {
    id: 'MT-0037',
    assunto: 'Gestão Fiscal',
    termoGenerico: 'DESPESAS PÚBLICAS',
    termosEspecificos: [
      'CONTRATO DE PUBLICIDADE',
      'VEÍCULO DE COMUNICAÇÃO',
      'CAMPANHA PUBLICITÁRIA',
      'SERVIÇO DE COMUNICAÇÃO SOCIAL',
      'AGÊNCIA DE PUBLICIDADE',
    ],
    termosRelacionados: [
      'PATROCÍNIO INSTITUCIONAL',
      'DESPESAS PÚBLICAS',
      'CONTRATO ADMINISTRATIVO',
      'FORNECEDOR',
    ],
    termosNaoPreferenciais: [
      'PROPAGANDA INSTITUCIONAL',
      'GASTOS COM PUBLICIDADE',
      'COMUNICAÇÃO PÚBLICA',
    ],
    definicao:
      'Despesas realizadas com contratos de publicidade institucional, comunicação social e serviços especializados de veiculação em mídia, com identificação dos fornecedores, veículos e valores por tipo de serviço.',
    escopo:
      'Detalhar por fornecedor, veículo e tipo de serviço. Não confundir com PATROCÍNIO INSTITUCIONAL (MT-0038). Incluir o número do contrato vinculado e o processo licitatório de origem.',
    metadados: [
      'Fornecedor / Agência',
      'CNPJ',
      'Veículo de Divulgação',
      'Tipo de Serviço',
      'Número do Contrato',
      'Valor Pago',
      'Período',
      'Campanha / Objeto',
      'Unidade Gestora',
      'Data de Atualização',
      'Fonte Oficial',
    ],
    prazoPublicacao:
      'Mensal (LAI – Art. 8º + Cartilha PNTP 2025 – Critério 4.6)',
    cicloColeta: 'Ciclo mensal — Envio até o 10º dia útil do mês subsequente',
    fluxoOrigem: '🔵 Coleta manual — Maranhão Transparente',
    baseLegal: [
      'Lei nº 12.527/2011 – Art. 8º',
      'LC nº 131/2009',
      'Lei nº 12.232/2010 (Publicidade Pública)',
      'Cartilha PNTP 2025 – Critério 4.6',
    ],
    status: 'Em validação',
  },

  'PATROCÍNIO INSTITUCIONAL': {
    id: 'MT-0038',
    assunto: 'Gestão Fiscal',
    termoGenerico: 'DESPESAS PÚBLICAS',
    termosEspecificos: [
      'CONTRATO DE PATROCÍNIO',
      'EVENTO PATROCINADO',
      'ENTIDADE BENEFICIADA',
      'CONTRAPARTIDA',
      'VALOR DO PATROCÍNIO',
    ],
    termosRelacionados: [
      'PUBLICIDADE INSTITUCIONAL',
      'DESPESAS PÚBLICAS',
      'CONTRATO ADMINISTRATIVO',
      'CONVÊNIO CELEBRADO',
    ],
    termosNaoPreferenciais: [
      'APOIO INSTITUCIONAL',
      'CO-PATROCÍNIO',
      'SUBVENÇÃO',
    ],
    definicao:
      'Despesa pública decorrente do apoio financeiro a eventos, projetos ou iniciativas de terceiros com associação da imagem do ente público, mediante contrato formal de patrocínio.',
    escopo:
      'Não confundir com PUBLICIDADE INSTITUCIONAL (MT-0037). Identificar o evento ou projeto beneficiado, a entidade e o valor. Incluir obrigatoriamente a contrapartida prevista ao ente.',
    metadados: [
      'Entidade Beneficiada',
      'CNPJ',
      'Evento / Projeto',
      'Valor do Patrocínio',
      'Contrapartida Prevista',
      'Número do Contrato',
      'Vigência',
      'Unidade Gestora',
      'Data de Atualização',
      'Fonte Oficial',
    ],
    prazoPublicacao:
      'Mensal (LAI – Art. 8º + Cartilha PNTP 2025 – Critério 4.5)',
    cicloColeta: 'Ciclo mensal — Envio até o 10º dia útil do mês subsequente',
    fluxoOrigem: '🔵 Coleta manual — Maranhão Transparente',
    baseLegal: [
      'Lei nº 12.527/2011 – Art. 8º',
      'LC nº 131/2009',
      'Cartilha PNTP 2025 – Critério 4.5',
    ],
    status: 'Em validação',
  },

  'ORDEM BANCÁRIA': {
    id: 'MT-0049',
    assunto: 'Gestão Fiscal',
    termoGenerico: 'DESPESAS PÚBLICAS',
    termosEspecificos: [
      'NÚMERO DA ORDEM BANCÁRIA',
      'DATA DE EMISSÃO',
      'FAVORECIDO',
      'VALOR PAGO',
      'BANCO / AGÊNCIA / CONTA',
    ],
    termosRelacionados: [
      'DESPESAS PÚBLICAS',
      'PAGAMENTO',
      'EMPENHO',
      'LIQUIDAÇÃO',
      'SIGEF',
    ],
    termosNaoPreferenciais: ['OB', 'ORDEM DE PAGAMENTO'],
    definicao:
      'Documento financeiro emitido pelo ente público para efetivar o pagamento de despesas previamente empenhadas e liquidadas, identificando o favorecido, o valor e a instituição financeira operadora.',
    escopo:
      'Dado gerado automaticamente pelo SIGEF. Vinculada obrigatoriamente a um empenho e a uma liquidação previamente registrados. Não confundir com o empenho — a OB representa a fase de pagamento efetivo.',
    metadados: [
      'Número da OB',
      'Data da OB',
      'Unidade Gestora / Código SIGEF',
      'Número do Empenho Vinculado',
      'Valor Total Pago',
      'Forma de Pagamento',
      'Pagamentos Processados',
      'Pagamentos Devolvidos / Recusados',
      'Data de Atualização',
      'Fonte Oficial',
    ],
    prazoPublicacao:
      'D+1 útil após emissão da OB (LC 131/2009 + Decreto 10.540/2020)',
    cicloColeta:
      'Ciclo manual — Envio pelo responsável do órgão após emissão da OB',
    fluxoOrigem: '🔵 Coleta manual — Maranhão Transparente',
    baseLegal: [
      'LC nº 131/2009',
      'Lei nº 12.527/2011 – Art. 8º, §1º, II',
      'LC nº 101/2000 (LRF)',
      'Cartilha PNTP 2025 – Critérios 4.1 a 4.6',
    ],
    status: 'Em validação',
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // ABA: Obras e Infraestrutura
  // ─────────────────────────────────────────────────────────────────────────────

  'OBRA PÚBLICA EM EXECUÇÃO': {
    id: 'MT-0012',
    assunto: 'Obras e Infraestrutura',
    termoGenerico: 'OBRA PÚBLICA',
    termosEspecificos: [
      'IDENTIFICAÇÃO DA OBRA',
      'LOCALIDADE',
      'VALOR CONTRATADO',
      'PERCENTUAL EXECUTADO (FÍSICO)',
      'PERCENTUAL EXECUTADO (FINANCEIRO)',
      'SITUAÇÃO DA OBRA',
    ],
    termosRelacionados: [
      'CONTRATO ADMINISTRATIVO',
      'LICITAÇÃO',
      'DESPESAS PÚBLICAS',
      'EMPENHO',
      'FISCALIZAÇÃO DE OBRAS',
    ],
    termosNaoPreferenciais: [
      'OBRA EM ANDAMENTO',
      'CONSTRUÇÃO EM EXECUÇÃO',
      'EMPREENDIMENTO EM ANDAMENTO',
    ],
    definicao:
      'Empreendimento público contratado e em fase ativa de execução física e/ou financeira, com acompanhamento periódico de progresso.',
    escopo:
      'Enviar exclusivamente obras com execução ativa no período de referência. Acompanhamento físico e financeiro separados são obrigatórios. Não confundir com OBRA PÚBLICA CONCLUÍDA (MT-0013).',
    metadados: [
      'Nome da Obra',
      'Código da Obra',
      'Município / Localização',
      'Objeto',
      'Número do Contrato',
      'Número do Processo',
      'Unidade Gestora',
      'Valor Contratado',
      'Valor Empenhado',
      'Valor Pago',
      '% Executado (Físico)',
      '% Executado (Financeiro)',
      'Prazo de Início',
      'Prazo de Conclusão Previsto',
      'Fonte de Recursos',
      'Situação Atual',
      'Data de Atualização',
      'Fonte Oficial',
    ],
    prazoPublicacao:
      'Boa prática: atualização mensal (LAI – Art. 8º + PNTP 2025 – Critério 10.1)',
    cicloColeta: 'Ciclo mensal — Envio até o 10º dia útil do mês subsequente',
    fluxoOrigem: '🔵 Coleta manual — Maranhão Transparente',
    baseLegal: [
      'Lei nº 12.527/2011 – Art. 8º',
      'LC nº 131/2009',
      'Lei nº 14.133/2021 – Art. 174',
      'Cartilha PNTP 2025 – Critérios 10.1, 10.2 e 10.3',
    ],
    status: 'Em validação',
  },

  'OBRA PÚBLICA CONCLUÍDA': {
    id: 'MT-0013',
    assunto: 'Obras e Infraestrutura',
    termoGenerico: 'OBRA PÚBLICA',
    termosEspecificos: [
      'NOME DA OBRA',
      'VALOR TOTAL EXECUTADO',
      'DATA DE ENTREGA',
      'TERMO DE RECEBIMENTO',
      'RESPONSÁVEL TÉCNICO',
    ],
    termosRelacionados: [
      'CONTRATO ADMINISTRATIVO',
      'FISCALIZAÇÃO DE OBRAS',
      'EXECUÇÃO ORÇAMENTÁRIA',
      'OBRA PÚBLICA EM EXECUÇÃO',
    ],
    termosNaoPreferenciais: [
      'OBRA FINALIZADA',
      'OBRA ENTREGUE',
      'EMPREENDIMENTO CONCLUÍDO',
    ],
    definicao:
      'Empreendimento público com execução física encerrada e entrega formalizada por termo de recebimento definitivo.',
    escopo:
      'Não incluir obras paralisadas ou em andamento — apenas as com encerramento formal. Termo de recebimento é documento obrigatório. Histórico permanente: registros não devem ser removidos do portal.',
    metadados: [
      'Nome da Obra',
      'Código da Obra',
      'Município',
      'Objeto',
      'Número do Contrato',
      'Unidade Gestora',
      'Valor Contratado',
      'Valor Final Executado',
      'Valor Pago',
      'Data de Início',
      'Data de Conclusão',
      'Responsável Técnico',
      'Termo de Recebimento (link)',
      'Fonte de Recursos',
      'Data de Atualização',
      'Fonte Oficial',
    ],
    prazoPublicacao:
      'Sob conclusão — publicação na entrega formal (LAI – Art. 8º + Lei 14.133/2021 – Art. 174)',
    cicloColeta:
      'Sob evento (conclusão da obra) — Envio imediato após assinatura do termo de recebimento',
    fluxoOrigem: '🔵 Coleta manual — Maranhão Transparente',
    baseLegal: [
      'Lei nº 12.527/2011 – Art. 8º, §1º, II e IV',
      'LC nº 131/2009',
      'Lei nº 14.133/2021 – Art. 174',
      'Cartilha PNTP 2025 – Critério 10.1',
    ],
    status: 'Em validação',
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // ABA: Pessoal
  // ─────────────────────────────────────────────────────────────────────────────

  'SERVIDOR PÚBLICO ATIVO': {
    id: 'MT-0014',
    assunto: 'Pessoal',
    termoGenerico: 'PESSOAL',
    termosEspecificos: [
      'NOME DO SERVIDOR',
      'CARGO',
      'TIPO DE VÍNCULO',
      'REMUNERAÇÃO BRUTA',
      'REMUNERAÇÃO LÍQUIDA',
      'LOTAÇÃO',
      'MATRÍCULA FUNCIONAL',
    ],
    termosRelacionados: [
      'FOLHA DE PAGAMENTO',
      'ATO DE NOMEAÇÃO',
      'CARGO EFETIVO',
      'CARGO COMISSIONADO',
      'DIRIGENTE',
      'DESPESAS PÚBLICAS',
    ],
    termosNaoPreferenciais: [
      'FUNCIONÁRIO PÚBLICO',
      'COLABORADOR PÚBLICO',
      'SERVIDOR ATIVO',
    ],
    definicao:
      'Agente público titular de cargo efetivo, comissionado ou temporário, em exercício ativo no ente estadual.',
    escopo:
      'Dado gerado automaticamente pelo PeopleSoft. Vedado incluir CPF completo, endereço residencial, telefone pessoal ou dados bancários. Observar os limites da LGPD e a jurisprudência do STF (Tema 483). Não confundir com TRABALHADOR TERCEIRIZADO (MT-0015).',
    metadados: [
      'Nome',
      'Matrícula Funcional',
      'Cargo',
      'Tipo de Vínculo',
      'Lotação',
      'Unidade de Exercício',
      'Remuneração Bruta',
      'Remuneração Líquida',
      'Vantagens',
      'Descontos',
      'Mês de Referência',
      'Exercício',
      'Situação Funcional',
      'Data de Atualização',
      'Fonte Oficial',
    ],
    prazoPublicacao: 'Mensal (LC 131/2009 + LAI – Art. 8º)',
    cicloColeta:
      'Automatizado — sem ciclo de coleta manual. Validação mensal pela SEATRAN',
    fluxoOrigem: '🟢 Automatizado — PeopleSoft',
    baseLegal: [
      'Lei nº 12.527/2011 – Art. 8º',
      'LC nº 131/2009',
      'LC nº 101/2000 – Art. 48',
      'STF – Tema 483',
      'Lei nº 13.709/2018 (LGPD) – Art. 7º, §3º',
      'Cartilha PNTP 2025 – Critérios 6.1 e 6.2',
    ],
    status: 'Em validação',
  },

  'TRABALHADOR TERCEIRIZADO': {
    id: 'MT-0015',
    assunto: 'Pessoal',
    termoGenerico: 'PESSOAL',
    termosEspecificos: [
      'EMPRESA CONTRATADA',
      'FUNÇÃO EXERCIDA',
      'CONTRATO ADMINISTRATIVO',
      'LOTAÇÃO',
      'QUANTITATIVO',
    ],
    termosRelacionados: [
      'CONTRATO ADMINISTRATIVO',
      'DESPESAS PÚBLICAS',
      'SERVIÇO CONTINUADO',
      'SERVIDOR PÚBLICO ATIVO',
    ],
    termosNaoPreferenciais: [
      'COLABORADOR TERCEIRIZADO',
      'FUNCIONÁRIO DE EMPRESA CONTRATADA',
      'TERCEIRIZADO',
    ],
    definicao:
      'Trabalhador vinculado a empresa privada contratada que exerce atividade de serviço continuado ou eventual no órgão público, sem vínculo empregatício direto com o ente.',
    escopo:
      'Enviar quando houver intermediação por contrato administrativo formal. Vedado divulgar CPF, endereço ou dados pessoais sensíveis do trabalhador. Identificação da empresa e do contrato são obrigatórias. Não confundir com SERVIDOR PÚBLICO ATIVO (MT-0014).',
    metadados: [
      'Nome da Empresa',
      'CNPJ da Empresa',
      'Número do Contrato',
      'Objeto do Contrato',
      'Nome do Trabalhador',
      'Função',
      'Unidade de Lotação',
      'Quantidade de Trabalhadores',
      'Valor Contratual Global',
      'Exercício',
      'Data de Atualização',
      'Fonte Oficial',
    ],
    prazoPublicacao: 'Mensal (LAI – Art. 8º + LC 131/2009)',
    cicloColeta: 'Ciclo mensal — Envio até o 10º dia útil do mês subsequente',
    fluxoOrigem: '🔵 Coleta manual — Maranhão Transparente',
    baseLegal: [
      'Lei nº 12.527/2011 – Art. 8º',
      'LC nº 131/2009',
      'Lei nº 14.133/2021',
      'Lei nº 13.709/2018 (LGPD)',
      'Cartilha PNTP 2025 – Critério 6.4',
    ],
    status: 'Em validação',
  },

  'REMUNERAÇÃO NOMINAL DO SERVIDOR': {
    id: 'MT-0039',
    assunto: 'Pessoal',
    termoGenerico: 'PESSOAL',
    termosEspecificos: [
      'REMUNERAÇÃO BRUTA',
      'REMUNERAÇÃO LÍQUIDA',
      'VANTAGENS',
      'DESCONTOS',
      'SUBSÍDIO',
    ],
    termosRelacionados: [
      'SERVIDOR PÚBLICO ATIVO',
      'TABELA DE CARGOS E REMUNERAÇÃO',
      'FOLHA DE PAGAMENTO',
      'DESPESA COM PESSOAL',
    ],
    termosNaoPreferenciais: ['CONTRACHEQUE', 'HOLERITH', 'SALÁRIO DO SERVIDOR'],
    definicao:
      'Identificação nominal da remuneração bruta e líquida de cada servidor, autoridade ou membro, com detalhamento de vantagens e descontos, publicada individualmente.',
    escopo:
      'Publicar por servidor — nunca em formato agregado por cargo ou unidade. Dados mínimos do PNTP: nome, remuneração bruta, remuneração líquida. Vedado CPF completo. Observar STF Tema 483 e LGPD. Não confundir com TABELA DE CARGOS E REMUNERAÇÃO (MT-0040).',
    metadados: [
      'Nome do Servidor',
      'Matrícula Funcional',
      'Cargo',
      'Unidade',
      'Remuneração Bruta',
      'Vantagens (detalhadas)',
      'Descontos (detalhados)',
      'Remuneração Líquida',
      'Mês de Referência',
      'Data de Atualização',
      'Fonte Oficial',
    ],
    prazoPublicacao: 'Mensal (LC 131/2009 + LAI – Art. 8º)',
    cicloColeta: 'Ciclo mensal — Envio até o 10º dia útil do mês subsequente',
    fluxoOrigem: '🟢 Automatizado — PeopleSoft',
    baseLegal: [
      'Lei nº 12.527/2011 – Art. 8º',
      'LC nº 131/2009',
      'Lei nº 13.709/2018 (LGPD)',
      'STF – Tema 483',
      'Cartilha PNTP 2025 – Critério 6.2',
    ],
    status: 'Em validação',
  },

  'TABELA DE CARGOS E REMUNERAÇÃO': {
    id: 'MT-0040',
    assunto: 'Pessoal',
    termoGenerico: 'PESSOAL',
    termosEspecificos: [
      'CARGO EFETIVO',
      'CARGO COMISSIONADO',
      'FUNÇÃO DE CONFIANÇA',
      'NÍVEL DE REFERÊNCIA',
      'PADRÃO REMUNERATÓRIO',
      'PISO SALARIAL',
    ],
    termosRelacionados: [
      'REMUNERAÇÃO NOMINAL DO SERVIDOR',
      'LEGISLAÇÃO INSTITUCIONAL',
      'ESTRUTURA ORGANIZACIONAL',
    ],
    termosNaoPreferenciais: [
      'PLANO DE CARGOS E SALÁRIOS',
      'TABELA SALARIAL',
      'QUADRO DE PESSOAL',
    ],
    definicao:
      'Estrutura remuneratória fixada em lei que define os valores de referência para cada cargo, função ou nível do quadro de pessoal do ente público.',
    escopo:
      'Publicar a tabela vigente com embasamento legal. Não confundir com REMUNERAÇÃO NOMINAL DO SERVIDOR (MT-0039): este registro é a tabela de referência, não os dados individuais. Atualizar sempre que houver alteração legal.',
    metadados: [
      'Cargo / Função',
      'Nível / Referência',
      'Valores de Vencimento Base',
      'Gratificações Previstas',
      'Remuneração Total do Cargo',
      'Base Legal (lei ou decreto)',
      'Data de Vigência',
      'Data de Atualização',
      'Fonte Oficial',
    ],
    prazoPublicacao:
      'Sob alteração legal (LAI – Art. 8º + Cartilha PNTP 2025 – Critério 6.2)',
    cicloColeta:
      'Sob evento (lei de reajuste ou reestruturação de cargos) — Envio imediato após publicação do ato',
    fluxoOrigem: '🔵 Coleta manual — Maranhão Transparente',
    baseLegal: [
      'Lei nº 12.527/2011 – Art. 8º',
      'LC nº 131/2009',
      'Cartilha PNTP 2025 – Critério 6.2',
    ],
    status: 'Em validação',
  },

  'CONCURSO PÚBLICO E PROCESSO SELETIVO': {
    id: 'MT-0041',
    assunto: 'Pessoal',
    termoGenerico: 'PESSOAL',
    termosEspecificos: [
      'EDITAL DE CONCURSO',
      'LISTA DE APROVADOS',
      'CLASSIFICAÇÃO FINAL',
      'NOMEAÇÃO',
      'GABARITO',
      'RECURSO DE CANDIDATO',
      'VALIDADE DO CONCURSO',
    ],
    termosRelacionados: [
      'SERVIDOR PÚBLICO ATIVO',
      'ATO DE NOMEAÇÃO',
      'ESTRUTURA ORGANIZACIONAL',
      'LEGISLAÇÃO INSTITUCIONAL',
    ],
    termosNaoPreferenciais: [
      'SELEÇÃO PÚBLICA',
      'CONCURSO DE PROVAS',
      'SELEÇÃO SIMPLIFICADA',
    ],
    definicao:
      'Procedimento administrativo para seleção e provimento de cargos ou empregos públicos, mediante concurso de provas ou de provas e títulos, com publicidade obrigatória de todos os atos.',
    escopo:
      'Publicar a íntegra dos editais e todos os atos subsequentes: gabarito, resultado preliminar, recurso, resultado final, lista de aprovados e nomeações. Manter os registros durante toda a validade do concurso.',
    metadados: [
      'Número do Edital',
      'Modalidade',
      'Cargo',
      'Quantidade de Vagas',
      'Data de Abertura',
      'Data de Encerramento',
      'Situação',
      'Documentos Vinculados',
      'Link de Acesso',
      'Data de Atualização',
      'Fonte Oficial',
    ],
    prazoPublicacao:
      'Sob evento — imediato após cada ato do processo (LAI – Art. 8º + Cartilha PNTP 2025 – Critérios 6.5 e 6.6)',
    cicloColeta:
      'Ciclo contínuo — sob evento (publicação de cada ato) — Envio imediato',
    fluxoOrigem: '🔵 Coleta manual — Maranhão Transparente',
    baseLegal: [
      'Lei nº 12.527/2011 – Art. 8º',
      'Lei nº 8.112/1990',
      'Constituição Federal – Art. 37, II',
      'Cartilha PNTP 2025 – Critérios 6.5 e 6.6',
    ],
    status: 'Em validação',
  },

  ESTAGIÁRIO: {
    id: 'MT-0016',
    assunto: 'Pessoal',
    termoGenerico: 'PESSOAL',
    termosEspecificos: [
      'NOME',
      'ÓRGÃO',
      'FUNÇÃO',
      'UNIDADE',
      'PERÍODO DE ESTÁGIO',
      'TIPO DE ESTÁGIO',
    ],
    termosRelacionados: [
      'TERMO DE COMPROMISSO DE ESTÁGIO',
      'BOLSA DE ESTÁGIO',
      'INSTITUIÇÃO DE ENSINO',
      'SERVIDOR PÚBLICO ATIVO',
    ],
    termosNaoPreferenciais: ['BOLSISTA', 'ESTA'],
    definicao:
      'Estudante de curso de educação profissional, de ensino médio ou de educação superior vinculado ao órgão público mediante termo de compromisso de estágio.',
    escopo:
      'Enviar lista de estagiários com vínculo ativo no período de referência. Vedado divulgar CPF, endereço ou dados pessoais sensíveis. Identificar o tipo de estágio (obrigatório / não obrigatório). Não confundir com TRABALHADOR TERCEIRIZADO (MT-0015).',
    metadados: [
      'Nome',
      'Órgão',
      'Unidade',
      'Função',
      'Tipo de Estágio',
      'Instituição de Ensino',
      'Período (início e término)',
      'Valor da Bolsa',
      'Exercício',
      'Data de Atualização',
      'Fonte Oficial',
    ],
    prazoPublicacao: 'Mensal (LAI – Art. 8º + LC 131/2009)',
    cicloColeta: 'Ciclo mensal — Envio até o 10º dia útil do mês subsequente',
    fluxoOrigem: '🔵 Coleta manual — Maranhão Transparente',
    baseLegal: [
      'Lei nº 12.527/2011 – Art. 8º',
      'LC nº 131/2009',
      'Lei nº 11.788/2008 (Lei de Estágio)',
      'Lei nº 13.709/2018 (LGPD)',
      'Cartilha PNTP 2025 – Critério 6.3',
    ],
    status: 'Em validação',
  },

  DIÁRIAS: {
    id: 'MT-0017',
    assunto: 'Pessoal',
    termoGenerico: 'DESPESAS PÚBLICAS',
    termosEspecificos: [
      'SERVIDOR BENEFICIADO',
      'DESTINO',
      'MOTIVO DA VIAGEM',
      'VALOR DA DIÁRIA',
      'DATA',
    ],
    termosRelacionados: [
      'DESPESAS PÚBLICAS',
      'EMPENHO',
      'MISSÃO OFICIAL',
      'SERVIDOR PÚBLICO ATIVO',
    ],
    termosNaoPreferenciais: [
      'AJUDA DE CUSTO DE VIAGEM',
      'DESLOCAMENTO OFICIAL',
      'VIAGEM A SERVIÇO',
    ],
    definicao:
      'Despesa pública destinada ao custeio de deslocamento e permanência de agente público em missão oficial, compreendendo diárias.',
    escopo:
      'Enviar apenas atos formalmente autorizados por ordem de serviço ou equivalente. Identificação do beneficiário, cargo, destino e motivo são obrigatórios. Observar LGPD quanto à minimização de dados pessoais.',
    metadados: [
      'Nome do Beneficiário',
      'Cargo',
      'Unidade',
      'Destino',
      'Motivo',
      'Valor da Diária',
      'Data de Saída / Retorno',
      'Número do Processo',
      'Exercício',
      'Data de Atualização',
      'Fonte Oficial',
    ],
    prazoPublicacao: 'Mensal (LAI – Art. 8º + LC 131/2009)',
    cicloColeta: 'Ciclo diário (D-1)',
    fluxoOrigem: '🟢 Automatizado — SIGEF',
    baseLegal: [
      'Lei nº 12.527/2011 – Art. 8º',
      'LC nº 131/2009',
      'LC nº 101/2000 (LRF) – Art. 48',
      'Cartilha PNTP 2025 – Critérios 7.1 e 7.2',
    ],
    status: 'Em validação',
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // ABA: Licitações e Contratos
  // ─────────────────────────────────────────────────────────────────────────────

  LICITAÇÃO: {
    id: 'MT-0018',
    assunto: 'Licitações e Contratos',
    termoGenerico: 'CONTRATAÇÃO PÚBLICA',
    termosEspecificos: [
      'PREGÃO ELETRÔNICO',
      'CONCORRÊNCIA',
      'CHAMAMENTO PÚBLICO',
      'DISPENSA DE LICITAÇÃO',
      'INEXIGIBILIDADE',
      'EDITAL',
      'ATA DE ADESÃO (SRP)',
      'PLANO DE CONTRATAÇÕES ANUAL',
    ],
    termosRelacionados: [
      'CONTRATO ADMINISTRATIVO',
      'DESPESAS PÚBLICAS',
      'FORNECEDOR',
      'PARCERIA PÚBLICA',
      'LICITANTE SANCIONADO',
    ],
    termosNaoPreferenciais: [
      'PROCESSO LICITATÓRIO',
      'PROCESSO DE COMPRA',
      'SELEÇÃO DE FORNECEDOR',
    ],
    definicao:
      'Procedimento administrativo formal pelo qual a Administração Pública seleciona a proposta mais vantajosa para a celebração de contrato de compra, obra ou serviço.',
    escopo:
      'Enviar processos em andamento e concluídos. Incluir link para o Portal Nacional de Contratações Públicas (PNCP). Dispensas e inexigibilidades devem conter fundamentação legal explícita.',
    metadados: [
      'Número do Processo',
      'Modalidade',
      'Objeto',
      'Valor Estimado',
      'Situação',
      'Data de Abertura',
      'Unidade Gestora',
      'Link PNCP',
      'Data de Atualização',
      'Fonte Oficial',
    ],
    prazoPublicacao:
      'Contínua — publicação imediata (Lei 14.133/2021 – Art. 174 + PNCP)',
    cicloColeta: 'Ciclo contínuo — Envio imediato após cada ato do processo',
    fluxoOrigem: '🔵 Coleta manual — Maranhão Transparente',
    baseLegal: [
      'Lei nº 12.527/2011 – Art. 8º',
      'LC nº 131/2009',
      'Lei nº 14.133/2021 – Art. 174',
      'Cartilha PNTP 2025 – Critérios 8.1 a 8.8',
    ],
    status: 'Em validação',
  },

  'CONTRATO ADMINISTRATIVO': {
    id: 'MT-0019',
    assunto: 'Licitações e Contratos',
    termoGenerico: 'CONTRATAÇÃO PÚBLICA',
    termosEspecificos: [
      'CONTRATADO',
      'OBJETO DO CONTRATO',
      'VALOR CONTRATUAL',
      'VIGÊNCIA',
      'ADITIVO CONTRATUAL',
      'RESCISÃO',
      'FISCAL DO CONTRATO',
      'ORDEM CRONOLÓGICA DE PAGAMENTOS',
    ],
    termosRelacionados: [
      'LICITAÇÃO',
      'DESPESAS PÚBLICAS',
      'FORNECEDOR',
      'FISCALIZAÇÃO DE OBRAS',
      'TRABALHADOR TERCEIRIZADO',
    ],
    termosNaoPreferenciais: [
      'CONTRATO FIRMADO',
      'INSTRUMENTO CONTRATUAL',
      'CONTRATO DE PRESTAÇÃO DE SERVIÇO',
    ],
    definicao:
      'Instrumento jurídico que formaliza o acordo entre a Administração Pública e o fornecedor ou prestador de serviço, fixando objeto, valor, prazo e condições de execução.',
    escopo:
      'Enviar apenas contratos com assinatura formal. Aditivos contratuais devem ser vinculados ao contrato original. Rescisões devem constar com data e motivação.',
    metadados: [
      'Número do Contrato',
      'Contratado (CPF/CNPJ)',
      'Objeto',
      'Valor Contratual',
      'Data de Início / Término',
      'Situação',
      'Unidade Gestora',
      'Processo Licitatório Vinculado',
      'Fonte de Recursos',
      'Data de Atualização',
      'Fonte Oficial',
    ],
    prazoPublicacao:
      'Contínua — publicação imediata após assinatura (Lei 14.133/2021 – Art. 174)',
    cicloColeta: 'Ciclo contínuo — Envio imediato após cada evento contratual',
    fluxoOrigem: '🔵 Coleta manual — Maranhão Transparente',
    baseLegal: [
      'Lei nº 12.527/2011 – Art. 8º',
      'LC nº 131/2009',
      'Lei nº 14.133/2021 – Art. 174',
      'Cartilha PNTP 2025 – Critérios 9.1 a 9.4',
    ],
    status: 'Em validação',
  },

  'PARCERIA PÚBLICA': {
    id: 'MT-0020',
    assunto: 'Licitações e Contratos',
    termoGenerico: 'CONTRATAÇÃO PÚBLICA',
    termosEspecificos: [
      'TERMO DE COOPERAÇÃO',
      'CONVÊNIO DE SAÍDA',
      'TERMO DE FOMENTO',
      'TERMO DE COLABORAÇÃO',
      'ACORDO DE COOPERAÇÃO TÉCNICA',
    ],
    termosRelacionados: [
      'TRANSFERÊNCIAS RECEBIDAS',
      'CONTRATO ADMINISTRATIVO',
      'ENTIDADE PARCEIRA',
      'EXECUÇÃO ORÇAMENTÁRIA',
    ],
    termosNaoPreferenciais: [
      'CONVÊNIO',
      'PARCERIA',
      'INSTRUMENTO DE COOPERAÇÃO',
    ],
    definicao:
      'Instrumento jurídico que formaliza a cooperação entre o ente público e outra entidade pública ou privada sem fins lucrativos, para consecução de objeto de interesse comum.',
    escopo:
      'Não confundir com TRANSFERÊNCIAS RECEBIDAS (MT-0009). Identificação do parceiro e do objeto são obrigatórias. Situação do instrumento deve ser mantida atualizada.',
    metadados: [
      'Tipo de Instrumento',
      'Parceiro (CNPJ / Esfera)',
      'Objeto',
      'Valor (se houver)',
      'Vigência',
      'Situação',
      'Unidade Gestora',
      'Data de Atualização',
      'Fonte Oficial',
    ],
    prazoPublicacao:
      'Contínua — publicação imediata após celebração (LAI – Art. 8º + Lei 13.019/2014)',
    cicloColeta: 'Ciclo contínuo — Envio imediato após celebração ou alteração',
    fluxoOrigem: '🔵 Coleta manual — Maranhão Transparente',
    baseLegal: [
      'Lei nº 12.527/2011 – Art. 8º',
      'Lei nº 13.019/2014 (Marco Regulatório das OSCs)',
      'LC nº 131/2009',
      'Cartilha PNTP 2025 – Critérios 5.2 e 5.3',
    ],
    status: 'Em validação',
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // ABA: Planejamento e Resultados
  // ─────────────────────────────────────────────────────────────────────────────

  'BALANÇO GERAL DO EXERCÍCIO': {
    id: 'MT-0042',
    assunto: 'Planejamento e Resultados',
    termoGenerico: 'PLANEJAMENTO E RESULTADOS',
    termosEspecificos: [
      'BALANÇO ORÇAMENTÁRIO',
      'BALANÇO FINANCEIRO',
      'BALANÇO PATRIMONIAL',
      'DEMONSTRAÇÕES CONTÁBEIS',
      'PRESTAÇÃO DE CONTAS ANUAL',
    ],
    termosRelacionados: [
      'EXECUÇÃO ORÇAMENTÁRIA',
      'RELATÓRIO DE GESTÃO',
      'RELATÓRIO RESUMIDO DA EXECUÇÃO ORÇAMENTÁRIA (RREO)',
      'DECISÃO DO TCE SOBRE AS CONTAS',
    ],
    termosNaoPreferenciais: [
      'PRESTAÇÃO DE CONTAS DO EXERCÍCIO',
      'BALANÇO ANUAL',
      'CONTAS DO GOVERNADOR',
    ],
    definicao:
      'Conjunto de demonstrações contábeis e financeiras que registram o resultado da gestão orçamentária, financeira e patrimonial do exercício encerrado, submetido ao controle externo.',
    escopo:
      'Publicar o balanço do exercício anterior completo com todos os demonstrativos contábeis exigidos pela Lei 4.320/1964. Não substituir pelo RREO ou pelo RGF.',
    metadados: [
      'Exercício de Referência',
      'Tipo de Demonstrativo',
      'Link do Documento',
      'Data de Publicação',
      'Órgão Responsável',
      'Fonte Oficial',
    ],
    prazoPublicacao:
      'Até 31 de março do exercício seguinte (Lei 4.320/1964 + Cartilha PNTP 2025 – Critério 11.1)',
    cicloColeta: 'Ciclo anual — Envio até 31 de março do exercício subsequente',
    fluxoOrigem: '🔵 Coleta manual — Maranhão Transparente',
    baseLegal: [
      'Lei nº 12.527/2011 – Art. 8º',
      'Lei nº 4.320/1964',
      'LC nº 101/2000 (LRF)',
      'Cartilha PNTP 2025 – Critério 11.1',
    ],
    status: 'Em validação',
  },

  'RELATÓRIO DE GESTÃO OU ATIVIDADES': {
    id: 'MT-0043',
    assunto: 'Planejamento e Resultados',
    termoGenerico: 'PLANEJAMENTO E RESULTADOS',
    termosEspecificos: [
      'RELATÓRIO ANUAL DE ATIVIDADES',
      'RESULTADOS ALCANÇADOS',
      'INDICADORES DE DESEMPENHO',
      'METAS REALIZADAS',
      'PROGRAMAS EXECUTADOS',
    ],
    termosRelacionados: [
      'BALANÇO GERAL DO EXERCÍCIO',
      'PLANO PLURIANUAL (PPA)',
      'AVALIAÇÃO DE RESULTADOS',
      'CONTROLE EXTERNO',
    ],
    termosNaoPreferenciais: [
      'RELATÓRIO ANUAL DE GESTÃO',
      'MEMÓRIA DE GESTÃO',
      'PRESTAÇÃO DE CONTAS DO GESTOR',
    ],
    definicao:
      'Documento que registra as ações executadas, os resultados alcançados e o desempenho institucional do órgão durante o exercício, produzido para fins de prestação de contas e transparência.',
    escopo:
      'Publicar o relatório referente ao exercício anterior. O documento deve cobrir ações realizadas, metas alcançadas e recursos aplicados. Não confundir com o Balanço Geral (MT-0042), que é contábil.',
    metadados: [
      'Exercício de Referência',
      'Título do Relatório',
      'Órgão Responsável',
      'Link do Documento',
      'Data de Publicação',
      'Fonte Oficial',
    ],
    prazoPublicacao:
      'Até 31 de março do exercício seguinte (LAI – Art. 8º + Cartilha PNTP 2025 – Critério 11.2)',
    cicloColeta: 'Ciclo anual — Envio até 31 de março do exercício subsequente',
    fluxoOrigem: '🔵 Coleta manual — Maranhão Transparente',
    baseLegal: [
      'Lei nº 12.527/2011 – Art. 8º',
      'LC nº 101/2000 (LRF) – Art. 48',
      'Cartilha PNTP 2025 – Critério 11.2',
    ],
    status: 'Em validação',
  },

  'PLANO PLURIANUAL (PPA)': {
    id: 'MT-0021',
    assunto: 'Planejamento e Resultados',
    termoGenerico: 'INSTRUMENTO DE PLANEJAMENTO',
    termosEspecificos: [
      'PROGRAMA',
      'AÇÃO',
      'INICIATIVA',
      'META FÍSICA',
      'META FINANCEIRA',
      'INDICADOR DE PROGRAMA',
    ],
    termosRelacionados: [
      'LEI DE DIRETRIZES ORÇAMENTÁRIAS (LDO)',
      'LEI ORÇAMENTÁRIA ANUAL (LOA)',
      'AVALIAÇÃO DE RESULTADOS',
      'METAS E PROGRAMAS GOVERNAMENTAIS',
    ],
    termosNaoPreferenciais: [
      'PPA',
      'PLANO DE GOVERNO',
      'PLANEJAMENTO PLURIANUAL',
    ],
    definicao:
      'Lei de vigência quadrienal que estabelece os programas, as ações e as metas do governo para o período, orientando as leis orçamentárias anuais.',
    escopo:
      'Enviar o texto da lei aprovada e a proposta enviada à Assembleia. Atualizar quando houver revisão ou adequação do PPA.',
    metadados: [
      'Período de Vigência',
      'Número da Lei',
      'Data de Publicação',
      'Proposta (link)',
      'Lei Aprovada (link)',
      'Situação',
      'Data de Atualização',
      'Fonte Oficial',
    ],
    prazoPublicacao:
      'Na aprovação + revisões quando houver (CF/1988 – Art. 165)',
    cicloColeta:
      'Sob evento (aprovação ou revisão) — Envio imediato após publicação',
    fluxoOrigem: '🔵 Coleta manual — Maranhão Transparente',
    baseLegal: [
      'Lei nº 12.527/2011 – Art. 8º',
      'Lei nº 4.320/1964',
      'CF/1988 – Art. 165',
      'Cartilha PNTP 2025 – Critério 11.8',
    ],
    status: 'Em validação',
  },

  'LEI DE DIRETRIZES ORÇAMENTÁRIAS (LDO)': {
    id: 'MT-0022',
    assunto: 'Planejamento e Resultados',
    termoGenerico: 'INSTRUMENTO DE PLANEJAMENTO',
    termosEspecificos: [
      'METAS FISCAIS',
      'RISCOS FISCAIS',
      'PRIORIDADES DO EXERCÍCIO',
      'DIRETRIZES PARA LOA',
    ],
    termosRelacionados: [
      'PLANO PLURIANUAL (PPA)',
      'LEI ORÇAMENTÁRIA ANUAL (LOA)',
      'EXECUÇÃO ORÇAMENTÁRIA',
      'GESTÃO FISCAL',
    ],
    termosNaoPreferenciais: ['LDO', 'DIRETRIZES ORÇAMENTÁRIAS'],
    definicao:
      'Lei anual que estabelece metas e prioridades da Administração Pública, orienta a elaboração da LOA e dispõe sobre política fiscal e equilíbrio das contas públicas.',
    escopo:
      'Enviar proposta enviada à Assembleia e lei aprovada. O Anexo de Metas Fiscais e o Anexo de Riscos Fiscais são partes obrigatórias. Não substituir pela LOA.',
    metadados: [
      'Exercício de Referência',
      'Número da Lei',
      'Data de Publicação',
      'Proposta (link)',
      'Lei Aprovada (link)',
      'Anexo de Metas Fiscais (link)',
      'Anexo de Riscos Fiscais (link)',
      'Data de Atualização',
      'Fonte Oficial',
    ],
    prazoPublicacao:
      'Anual — na aprovação (LRF – Art. 4º + CF/1988 – Art. 165)',
    cicloColeta: 'Sob evento (aprovação) — Envio imediato após publicação',
    fluxoOrigem: '🔵 Coleta manual — Maranhão Transparente',
    baseLegal: [
      'Lei nº 12.527/2011 – Art. 8º',
      'LC nº 101/2000 (LRF) – Art. 4º',
      'CF/1988 – Art. 165',
      'Cartilha PNTP 2025 – Critério 11.9',
    ],
    status: 'Em validação',
  },

  'LEI ORÇAMENTÁRIA ANUAL (LOA)': {
    id: 'MT-0023',
    assunto: 'Planejamento e Resultados',
    termoGenerico: 'INSTRUMENTO DE PLANEJAMENTO',
    termosEspecificos: [
      'RECEITA PREVISTA',
      'DESPESA FIXADA',
      'CRÉDITO ORÇAMENTÁRIO',
      'CRÉDITO ADICIONAL',
      'PROGRAMA',
      'AÇÃO ORÇAMENTÁRIA',
    ],
    termosRelacionados: [
      'PLANO PLURIANUAL (PPA)',
      'LEI DE DIRETRIZES ORÇAMENTÁRIAS (LDO)',
      'EXECUÇÃO ORÇAMENTÁRIA',
      'RECEITAS PÚBLICAS',
      'DESPESAS PÚBLICAS',
    ],
    termosNaoPreferenciais: ['LOA', 'ORÇAMENTO ANUAL', 'LEI DO ORÇAMENTO'],
    definicao:
      'Lei anual que estima a receita e fixa a despesa do ente público para o exercício financeiro, detalhando programas e ações governamentais.',
    escopo:
      'Enviar proposta enviada à Assembleia e lei aprovada com eventuais créditos adicionais. Não substituir pela execução orçamentária — a LOA é o instrumento de previsão.',
    metadados: [
      'Exercício',
      'Número da Lei',
      'Data de Publicação',
      'Proposta (link)',
      'Lei Aprovada (link)',
      'Créditos Adicionais (link)',
      'Data de Atualização',
      'Fonte Oficial',
    ],
    prazoPublicacao:
      'Anual — na aprovação + créditos adicionais quando editados (LRF + CF/1988 – Art. 165)',
    cicloColeta:
      'Sob evento (aprovação ou crédito adicional) — Envio imediato após publicação',
    fluxoOrigem: '🔵 Coleta manual — Maranhão Transparente',
    baseLegal: [
      'Lei nº 12.527/2011 – Art. 8º',
      'Lei nº 4.320/1964',
      'CF/1988 – Art. 165',
      'Cartilha PNTP 2025 – Critério 11.10',
    ],
    status: 'Em validação',
  },

  DOTAÇÃO: {
    id: 'MT-0023-TE',
    assunto: 'Planejamento e Resultados',
    termoGenerico: 'LEI ORÇAMENTÁRIA ANUAL (LOA)',
    termosEspecificos: ['CRÉDITO ORÇAMENTÁRIO', 'CRÉDITO ADICIONAL'],
    termosRelacionados: ['EXECUÇÃO ORÇAMENTÁRIA', 'DESPESAS PÚBLICAS'],
    termosNaoPreferenciais: ['LIMITE PARA GASTAR', 'TETO DE GASTO'],
    definicao:
      'Autorização orçamentária inscrita na LOA que representa o valor máximo que o governo planejou gastar com aquele objetivo no exercício.',
    escopo:
      'O valor máximo que o governo planejou gastar com aquele objetivo no ano. Não confundir com o valor efetivamente empenhado ou pago.',
    metadados: [
      'Programa',
      'Ação',
      'Unidade Gestora',
      'Valor Dotado',
      'Créditos Adicionais',
      'Exercício',
    ],
    prazoPublicacao: 'Na aprovação da LOA (CF/1988 – Art. 165)',
    cicloColeta: 'Sob evento (aprovação ou crédito adicional)',
    fluxoOrigem: '🔵 Coleta manual — Maranhão Transparente',
    baseLegal: ['Lei nº 4.320/1964', 'CF/1988 – Art. 165'],
    status: 'Em validação',
  },

  'METAS E PROGRAMAS GOVERNAMENTAIS': {
    id: 'MT-0024',
    assunto: 'Planejamento e Resultados',
    termoGenerico: 'PLANEJAMENTO E RESULTADOS',
    termosEspecificos: [
      'PROGRAMA GOVERNAMENTAL',
      'AÇÃO',
      'INDICADOR DE DESEMPENHO',
      'META FÍSICA',
      'META FINANCEIRA',
      'INICIATIVA ESTRATÉGICA',
    ],
    termosRelacionados: [
      'PLANO PLURIANUAL (PPA)',
      'AVALIAÇÃO DE RESULTADOS',
      'EXECUÇÃO ORÇAMENTÁRIA',
    ],
    termosNaoPreferenciais: [
      'METAS DO GOVERNO',
      'PROGRAMAS DE GOVERNO',
      'INDICADORES DE GESTÃO',
    ],
    definicao:
      'Conjunto de programas, ações e indicadores que operacionalizam as prioridades estabelecidas no PPA, com metas físicas e financeiras mensuráveis.',
    escopo:
      'Apresentar metas com linha de base, valor previsto e valor realizado. Indicadores devem ter metodologia de cálculo explícita. Atualizar conforme revisões do PPA ou relatórios de monitoramento.',
    metadados: [
      'Programa',
      'Ação',
      'Indicador',
      'Linha de Base',
      'Meta Prevista',
      'Meta Realizada',
      'Período',
      'Unidade Responsável',
      'Fonte',
      'Data de Atualização',
    ],
    prazoPublicacao: 'Semestral mínima (LAI – Art. 8º + Decreto 7.724/2012)',
    cicloColeta:
      'Ciclo semestral — Envio até 30 dias após o encerramento de cada semestre',
    fluxoOrigem: '🔵 Coleta manual — Maranhão Transparente',
    baseLegal: [
      'Lei nº 12.527/2011 – Art. 8º',
      'Decreto Federal nº 7.724/2012',
      'Cartilha PNTP 2025 – Critério 11.7',
    ],
    status: 'Em validação',
  },

  'AVALIAÇÃO DE RESULTADOS': {
    id: 'MT-0025',
    assunto: 'Planejamento e Resultados',
    termoGenerico: 'PLANEJAMENTO E RESULTADOS',
    termosEspecificos: [
      'RELATÓRIO DE DESEMPENHO',
      'INDICADOR REALIZADO',
      'TAXA DE EXECUÇÃO',
      'RELATÓRIO DE GESTÃO',
      'BALANÇO ANUAL',
    ],
    termosRelacionados: [
      'METAS E PROGRAMAS GOVERNAMENTAIS',
      'EXECUÇÃO ORÇAMENTÁRIA',
      'AUDITORIA E FISCALIZAÇÃO',
    ],
    termosNaoPreferenciais: [
      'RESULTADOS DO GOVERNO',
      'DESEMPENHO GOVERNAMENTAL',
      'PRESTAÇÃO DE CONTAS',
    ],
    definicao:
      'Conjunto de relatórios e indicadores que demonstram o grau de cumprimento das metas governamentais e a efetividade das políticas públicas no período avaliado.',
    escopo:
      'Utilizar dados consolidados e verificáveis. Indicadores realizados devem estar vinculados às metas previstas em MT-0024. Relatórios de gestão anuais são obrigatórios pela LRF.',
    metadados: [
      'Indicador',
      'Valor de Referência',
      'Valor Realizado',
      'Taxa de Execução',
      'Período',
      'Unidade Responsável',
      'Relatório Vinculado (link)',
      'Fonte',
      'Data de Atualização',
    ],
    prazoPublicacao: 'Anual mínima (LRF – Art. 48 e 49)',
    cicloColeta: 'Ciclo anual — Envio até 31 de março do exercício subsequente',
    fluxoOrigem: '🔵 Coleta manual — Maranhão Transparente',
    baseLegal: [
      'Lei nº 12.527/2011 – Art. 8º',
      'LC nº 101/2000 (LRF) – Art. 48 e 49',
      'Cartilha PNTP 2025 – Critérios 11.1 e 11.2',
    ],
    status: 'Em validação',
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // ABA: Transparência Passiva
  // ─────────────────────────────────────────────────────────────────────────────

  'SERVIÇO DE INFORMAÇÃO AO CIDADÃO (SIC)': {
    id: 'MT-0026',
    assunto: 'Transparência Passiva',
    termoGenerico: 'TRANSPARÊNCIA PASSIVA',
    termosEspecificos: [
      'E-SIC',
      'SIC FÍSICO',
      'RESPONSÁVEL PELO SIC',
      'ENDEREÇO DO SIC',
      'HORÁRIO DE ATENDIMENTO',
    ],
    termosRelacionados: [
      'PEDIDO DE INFORMAÇÃO',
      'OUVIDORIA',
      'CONTATO INSTITUCIONAL',
      'DIREITO DE ACESSO À INFORMAÇÃO',
    ],
    termosNaoPreferenciais: ['CANAL DE ACESSO À INFORMAÇÃO', 'SIC ELETRÔNICO'],
    definicao:
      'Canal oficial, físico e eletrônico, por meio do qual o cidadão pode solicitar acesso a informações públicas ao ente estadual, conforme a Lei de Acesso à Informação.',
    escopo:
      'Indicar endereço físico e link do e-SIC de forma clara e acessível. Identificar o responsável institucional pelo SIC. Atualizar sempre que houver mudança.',
    metadados: [
      'Endereço do SIC Físico',
      'Link do e-SIC',
      'Responsável Institucional',
      'Horário de Atendimento',
      'Data de Atualização',
      'Fonte Oficial',
    ],
    prazoPublicacao: 'Sob alteração (LAI – Art. 9º e 10º)',
    cicloColeta:
      'Sob evento (mudança de endereço, responsável ou horário) — Validação anual obrigatória',
    fluxoOrigem: '🔵 Coleta manual — Maranhão Transparente',
    baseLegal: [
      'Lei nº 12.527/2011 – Art. 9º e 10º',
      'Decreto Federal nº 7.724/2012 – Art. 9º',
      'Cartilha PNTP 2025 – Critérios 12.1 a 12.4',
    ],
    status: 'Em validação',
  },

  'PEDIDO DE INFORMAÇÃO': {
    id: 'MT-0027',
    assunto: 'Transparência Passiva',
    termoGenerico: 'TRANSPARÊNCIA PASSIVA',
    termosEspecificos: [
      'QUANTIDADE DE PEDIDOS',
      'PRAZO DE RESPOSTA',
      'PEDIDO ATENDIDO',
      'PEDIDO INDEFERIDO',
      'RECURSO',
      'MOTIVO DE INDEFERIMENTO',
    ],
    termosRelacionados: [
      'SERVIÇO DE INFORMAÇÃO AO CIDADÃO (SIC)',
      'OUVIDORIA',
      'INFORMAÇÕES CLASSIFICADAS',
    ],
    termosNaoPreferenciais: [
      'SOLICITAÇÃO DE INFORMAÇÃO',
      'DEMANDA DE ACESSO',
      'REQUISIÇÃO LAI',
    ],
    definicao:
      'Registro estatístico das solicitações de acesso à informação recebidas pelo ente, com dados sobre prazo de resposta, resultado e motivação de indeferimentos.',
    escopo:
      'Publicar apenas dados estatísticos e agregados — nunca identificar o solicitante. Incluir o motivo de cada indeferimento classificado conforme a LAI.',
    metadados: [
      'Mês de Referência',
      'Total de Pedidos Recebidos',
      'Pedidos Atendidos',
      'Pedidos Indeferidos',
      'Recursos Interpostos',
      'Prazo Médio de Resposta (dias)',
      'Motivo de Indeferimento (categorias LAI)',
      'Data de Atualização',
      'Fonte Oficial',
    ],
    prazoPublicacao: 'Anual (relatório estatístico) (LAI – Art. 30)',
    cicloColeta:
      'Ciclo anual — Envio até 31 de janeiro do exercício subsequente',
    fluxoOrigem: '🔵 Coleta manual — Maranhão Transparente',
    baseLegal: [
      'Lei nº 12.527/2011 – Art. 30',
      'Decreto Federal nº 7.724/2012 – Art. 69',
      'Cartilha PNTP 2025 – Critério 12.7',
    ],
    status: 'Em validação',
  },

  'INFORMAÇÕES CLASSIFICADAS': {
    id: 'MT-0028',
    assunto: 'Transparência Passiva',
    termoGenerico: 'TRANSPARÊNCIA PASSIVA',
    termosEspecificos: [
      'GRAU DE SIGILO (ULTRASSECRETO / SECRETO / RESERVADO)',
      'PRAZO DE CLASSIFICAÇÃO',
      'AUTORIDADE CLASSIFICADORA',
      'DESCLASSIFICAÇÃO',
    ],
    termosRelacionados: [
      'PEDIDO DE INFORMAÇÃO',
      'DIREITO DE ACESSO À INFORMAÇÃO',
      'SEGURANÇA DA INFORMAÇÃO',
    ],
    termosNaoPreferenciais: [
      'DOCUMENTOS SIGILOSOS',
      'INFORMAÇÕES SIGILOSAS',
      'CLASSIFICAÇÃO DE SIGILO',
    ],
    definicao:
      'Conjunto de informações submetidas a restrição de acesso temporária, classificadas por autoridade competente conforme grau de sigilo estabelecido na LAI.',
    escopo:
      'Publicar apenas dados quantitativos e rol de categorias — nunca o conteúdo classificado. O rol de documentos classificados deve ser atualizado anualmente.',
    metadados: [
      'Tipo de Documento',
      'Grau de Sigilo',
      'Quantidade',
      'Autoridade Classificadora',
      'Prazo de Vigência da Classificação',
      'Data de Desclassificação (quando aplicável)',
      'Fonte Oficial',
    ],
    prazoPublicacao: 'Anual (rol de documentos) (LAI – Art. 30)',
    cicloColeta:
      'Ciclo anual — Envio até 31 de janeiro do exercício subsequente',
    fluxoOrigem: '🔵 Coleta manual — Maranhão Transparente',
    baseLegal: [
      'Lei nº 12.527/2011 – Art. 23 a 30',
      'Decreto Federal nº 7.845/2012',
      'Cartilha PNTP 2025 – Critérios 12.8 e 12.9',
    ],
    status: 'Em validação',
  },

  'PESQUISA DE SATISFAÇÃO': {
    id: 'MT-0047',
    assunto: 'Transparência Passiva',
    termoGenerico: 'TRANSPARÊNCIA PASSIVA',
    termosEspecificos: [
      'AVALIAÇÃO DE ATENDIMENTO',
      'ÍNDICE DE SATISFAÇÃO',
      'FEEDBACK DO USUÁRIO',
      'QUALIDADE DO SERVIÇO',
    ],
    termosRelacionados: [
      'SERVIÇO DE INFORMAÇÃO AO CIDADÃO (SIC)',
      'OUVIDORIA',
      'SERVIÇO PÚBLICO',
      'CARTA DE SERVIÇOS AO USUÁRIO',
    ],
    termosNaoPreferenciais: [
      'PESQUISA DE OPINIÃO',
      'SATISFAÇÃO DO CIDADÃO',
      'AVALIAÇÃO DOS SERVIÇOS PÚBLICOS',
    ],
    definicao:
      'Instrumento de coleta da percepção dos cidadãos e usuários sobre a qualidade dos serviços públicos prestados pelo órgão, com divulgação de resultados consolidados.',
    escopo:
      'Publicar apenas resultados consolidados e anonimizados. Informar a metodologia, o período e o universo de respondentes.',
    metadados: [
      'Órgão / Serviço Avaliado',
      'Período de Referência',
      'Metodologia',
      'Número de Respondentes',
      'Índice de Satisfação (%)',
      'Principais Resultados',
      'Link do Relatório',
      'Data de Publicação',
      'Fonte Oficial',
    ],
    prazoPublicacao:
      'Anual mínimo (Lei 13.460/2017 – Art. 7º + Cartilha PNTP 2025)',
    cicloColeta: 'Ciclo anual — Envio até 31 de março do exercício subsequente',
    fluxoOrigem: '🔵 Coleta manual — Maranhão Transparente',
    baseLegal: [
      'Lei nº 13.460/2017 – Art. 7º, IV',
      'Lei nº 12.527/2011 – Art. 8º',
      'Cartilha PNTP 2025',
    ],
    status: 'Em validação',
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // ABA: Emendas Parlamentares
  // ─────────────────────────────────────────────────────────────────────────────

  'EMENDA PARLAMENTAR': {
    id: 'MT-0048',
    assunto: 'Emendas Parlamentares',
    termoGenerico: 'GESTÃO FISCAL',
    termosEspecificos: [
      'EMENDA INDIVIDUAL',
      'EMENDA DE BANCADA',
      'EMENDA DE COMISSÃO',
      'EMENDA IMPOSITIVA',
      'DOTAÇÃO ORÇAMENTÁRIA',
      'EXECUÇÃO DE EMENDA PARLAMENTAR',
      'AUTOR',
    ],
    termosRelacionados: [
      'EXECUÇÃO ORÇAMENTÁRIA',
      'DESPESAS PÚBLICAS',
      'LEI ORÇAMENTÁRIA ANUAL (LOA)',
      'TRANSFERÊNCIAS RECEBIDAS',
      'CONVÊNIO RECEBIDO',
    ],
    termosNaoPreferenciais: [
      'EMENDA AO ORÇAMENTO',
      'EMENDA PARLAMENTAR FEDERAL',
      'EMENDA ESTADUAL',
    ],
    definicao:
      'Dotação orçamentária incluída na LOA por iniciativa de parlamentar federal ou estadual, destinada a programações específicas com indicação do autor e do objeto.',
    escopo:
      'Identificar obrigatoriamente o parlamentar autor, o tipo de emenda e o objeto. Publicar execução individualizada por emenda. Manter série histórica de no mínimo 3 anos. Não confundir com transferências constitucionais obrigatórias.',
    metadados: [
      'Número da Emenda',
      'Tipo (individual / bancada / comissão)',
      'Autor (nome e partido)',
      'Objeto / Descrição',
      'Beneficiário / Município',
      'Valor Dotado',
      'Valor Empenhado',
      'Valor Liquidado',
      'Valor Pago',
      'Exercício',
      'Situação',
      'Link da LOA / SIAFI',
      'Data de Atualização',
      'Fonte Oficial',
    ],
    prazoPublicacao:
      'Contínua — sob execução do orçamento (LAI – Art. 8º + CF Art. 166-A + Cartilha PNTP 2025)',
    cicloColeta: 'Ciclo mensal — Envio até o 10º dia útil do mês subsequente',
    fluxoOrigem: '🔵 Coleta manual — Maranhão Transparente',
    baseLegal: [
      'Constituição Federal – Art. 166 e 166-A',
      'Lei nº 12.527/2011 – Art. 8º',
      'LC nº 101/2000 (LRF)',
      'LC nº 131/2009',
      'Cartilha PNTP 2025 – Critério específico Emendas Parlamentares',
    ],
    status: 'Em validação',
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // ABA: Controle e Integridade
  // ─────────────────────────────────────────────────────────────────────────────

  'DECISÃO DO TCE SOBRE AS CONTAS': {
    id: 'MT-0044',
    assunto: 'Controle e Integridade',
    termoGenerico: 'CONTROLE E INTEGRIDADE',
    termosEspecificos: [
      'ACÓRDÃO',
      'PARECER PRÉVIO',
      'JULGAMENTO DE CONTAS',
      'DECISÃO DE REGULARIDADE',
      'DECISÃO DE IRREGULARIDADE',
      'RECOMENDAÇÃO DO TCE',
    ],
    termosRelacionados: [
      'BALANÇO GERAL DO EXERCÍCIO',
      'AUDITORIA E FISCALIZAÇÃO',
      'INTEGRIDADE PÚBLICA',
      'CONTROLE EXTERNO',
    ],
    termosNaoPreferenciais: [
      'PARECER DO TRIBUNAL DE CONTAS',
      'JULGAMENTO DE CONTAS PÚBLICAS',
      'ACÓRDÃO DO TCE',
    ],
    definicao:
      'Decisão proferida pelo Tribunal de Contas do Estado (TCE-MA) sobre as contas anuais do ente, incluindo pareceres prévios, acórdãos de julgamento e recomendações de regularidade ou irregularidade.',
    escopo:
      'Publicar a íntegra da decisão assim que disponibilizada pelo TCE-MA. Manter histórico de decisões dos últimos 3 anos no mínimo.',
    metadados: [
      'Exercício de Referência',
      'Tipo de Decisão (Parecer Prévio / Acórdão)',
      'Número do Processo (TCE-MA)',
      'Resultado (regular / irregular / com ressalvas)',
      'Link para a Decisão Integral',
      'Data de Publicação',
      'Fonte Oficial',
    ],
    prazoPublicacao:
      'Sob evento — imediato após publicação pelo TCE-MA (LAI – Art. 8º + Cartilha PNTP 2025 – Critério 11.3)',
    cicloColeta:
      'Sob evento — Envio imediato após disponibilização pelo TCE-MA',
    fluxoOrigem: '🔵 Coleta manual — Maranhão Transparente',
    baseLegal: [
      'Lei nº 12.527/2011 – Art. 8º',
      'LC nº 101/2000 (LRF) – Art. 56',
      'Lei Orgânica do TCE-MA',
      'Cartilha PNTP 2025 – Critério 11.3',
    ],
    status: 'Em validação',
  },

  'POLÍTICA DE PRIVACIDADE E PROTEÇÃO DE DADOS': {
    id: 'MT-0045',
    assunto: 'Controle e Integridade',
    termoGenerico: 'CONTROLE E INTEGRIDADE',
    termosEspecificos: [
      'POLÍTICA DE PRIVACIDADE',
      'TRATAMENTO DE DADOS PESSOAIS',
      'ENCARREGADO DE DADOS (DPO)',
      'BASE LEGAL DO TRATAMENTO',
      'DIREITOS DO TITULAR',
    ],
    termosRelacionados: [
      'INTEGRIDADE PÚBLICA',
      'SERVIÇO DE INFORMAÇÃO AO CIDADÃO (SIC)',
      'SERVIÇOS PÚBLICOS DIGITAIS',
      'LGPD',
    ],
    termosNaoPreferenciais: [
      'POLÍTICA DE DADOS',
      'AVISO DE PRIVACIDADE',
      'TERMO DE USO E PRIVACIDADE',
    ],
    definicao:
      'Documento institucional que informa aos cidadãos como o ente público realiza o tratamento de dados pessoais, com identificação do encarregado, bases legais, finalidades e direitos dos titulares.',
    escopo:
      'Publicar a política vigente com identificação nominal e de contato do Encarregado de Dados (DPO). Descrever explicitamente as bases legais para cada tipo de tratamento.',
    metadados: [
      'Nome do Encarregado (DPO)',
      'Contato do Encarregado',
      'Bases Legais do Tratamento',
      'Finalidades do Tratamento',
      'Direitos dos Titulares',
      'Link para o Documento',
      'Data de Publicação',
      'Versão',
      'Data de Atualização',
      'Fonte Oficial',
    ],
    prazoPublicacao:
      'Sob alteração relevante no tratamento de dados (LGPD – Art. 37 + Cartilha PNTP 2025)',
    cicloColeta:
      'Sob evento (publicação inicial e revisão anual obrigatória) — Revisão anual até 31 de janeiro',
    fluxoOrigem: '🔵 Coleta manual — Maranhão Transparente',
    baseLegal: [
      'Lei nº 13.709/2018 (LGPD) – Art. 37 e 41',
      'Decreto Federal nº 10.474/2020',
      'Lei nº 12.527/2011 – Art. 8º',
      'Cartilha PNTP 2025',
    ],
    status: 'Em validação',
  },

  'AUDITORIA E FISCALIZAÇÃO': {
    id: 'MT-0029',
    assunto: 'Controle e Integridade',
    termoGenerico: 'CONTROLE E INTEGRIDADE',
    termosEspecificos: [
      'RELATÓRIO DE AUDITORIA',
      'PARECER',
      'RECOMENDAÇÃO',
      'DETERMINAÇÃO',
      'ACORDÃO',
    ],
    termosRelacionados: [
      'AVALIAÇÃO DE RESULTADOS',
      'INTEGRIDADE PÚBLICA',
      'OUVIDORIA',
      'CONTROLE INTERNO',
      'CONTROLE EXTERNO',
    ],
    termosNaoPreferenciais: [
      'AUDITORIA GOVERNAMENTAL',
      'FISCALIZAÇÃO PÚBLICA',
      'RELATÓRIO DE CONTROLE',
    ],
    definicao:
      'Documentos produzidos por órgãos de controle interno ou externo que registram achados, recomendações e determinações decorrentes de ações fiscalizatórias sobre o ente público.',
    escopo:
      'Enviar apenas relatórios com versão final e publicação oficial. Identificar o órgão de controle emissor (CGE-MA, TCE-MA, CGU, TCU). Incluir link para o documento na íntegra.',
    metadados: [
      'Tipo de Documento',
      'Órgão Emissor',
      'Ano',
      'Objeto da Auditoria',
      'Unidade Auditada',
      'Link do Relatório',
      'Data de Publicação',
      'Situação (em acompanhamento / encerrado)',
      'Data de Atualização',
      'Fonte Oficial',
    ],
    prazoPublicacao:
      'Contínua — publicação imediata após emissão (LAI – Art. 8º + LC 131/2009)',
    cicloColeta: 'Sob evento (publicação do relatório final) — Envio imediato',
    fluxoOrigem: '🔵 Coleta manual — Maranhão Transparente',
    baseLegal: [
      'Lei nº 12.527/2011 – Art. 8º',
      'LC nº 131/2009',
      'Cartilha PNTP 2025 – Critérios 11.3 e 11.4',
    ],
    status: 'Em validação',
  },

  OUVIDORIA: {
    id: 'MT-0030',
    assunto: 'Controle e Integridade',
    termoGenerico: 'CONTROLE E INTEGRIDADE',
    termosEspecificos: [
      'MANIFESTAÇÃO',
      'DENÚNCIA',
      'RECLAMAÇÃO',
      'SUGESTÃO',
      'ELOGIO',
      'SOLICITAÇÃO',
      'TEMPO MÉDIO DE RESPOSTA',
    ],
    termosRelacionados: [
      'SERVIÇO DE INFORMAÇÃO AO CIDADÃO (SIC)',
      'PEDIDO DE INFORMAÇÃO',
      'INTEGRIDADE PÚBLICA',
      'CONTROLE SOCIAL',
    ],
    termosNaoPreferenciais: [
      'OUVIDORIA PÚBLICA',
      'CANAL DE MANIFESTAÇÃO',
      'ATENDIMENTO DE DEMANDAS',
    ],
    definicao:
      'Serviço público que recebe, analisa e encaminha manifestações dos cidadãos, promovendo a mediação entre cidadão e Administração.',
    escopo:
      'Publicar apenas dados estatísticos e agregados — nunca identificar o manifestante. Classificar as manifestações por tipo conforme padrão OGU.',
    metadados: [
      'Tipo de Manifestação',
      'Quantidade Recebida',
      'Quantidade Respondida',
      'Tempo Médio de Resposta (dias)',
      'Período de Referência',
      'Órgão Destinatário',
      'Data de Atualização',
      'Fonte Oficial',
    ],
    prazoPublicacao: 'Mensal (Lei 13.460/2017 – Art. 13 + Decreto 9.492/2018)',
    cicloColeta: 'Ciclo mensal — Envio até o 10º dia útil do mês subsequente',
    fluxoOrigem: '🔵 Coleta manual — Maranhão Transparente',
    baseLegal: [
      'Lei nº 12.527/2011 – Art. 9º, §1º',
      'Lei nº 13.460/2017 – Art. 13',
      'Decreto Federal nº 9.492/2018',
      'Cartilha PNTP 2025 – Critério 14.3',
    ],
    status: 'Em validação',
  },

  'INTEGRIDADE PÚBLICA': {
    id: 'MT-0031',
    assunto: 'Controle e Integridade',
    termoGenerico: 'CONTROLE E INTEGRIDADE',
    termosEspecificos: [
      'PLANO DE INTEGRIDADE',
      'COMITÊ DE INTEGRIDADE',
      'CÓDIGO DE CONDUTA',
      'GESTÃO DE RISCOS',
      'PROGRAMA ANTICORRUPÇÃO',
      'AVALIAÇÃO DE CONFORMIDADE',
    ],
    termosRelacionados: [
      'AUDITORIA E FISCALIZAÇÃO',
      'OUVIDORIA',
      'CONTROLE INTERNO',
      'TRANSPARÊNCIA ATIVA',
    ],
    termosNaoPreferenciais: [
      'PROGRAMA DE INTEGRIDADE',
      'COMPLIANCE PÚBLICO',
      'ÉTICA PÚBLICA',
    ],
    definicao:
      'Conjunto de medidas institucionais voltadas à prevenção, detecção e remediação de desvios, fraudes e corrupção, incluindo planos de integridade, comitês e avaliações de conformidade.',
    escopo:
      'Publicar o plano de integridade vigente com suas metas e resultados. Identificar composição e atas do Comitê de Integridade quando existente.',
    metadados: [
      'Tipo de Documento (Plano / Ata / Código / Avaliação)',
      'Órgão Responsável',
      'Data de Aprovação',
      'Período de Vigência',
      'Link do Documento',
      'Resultados (quando aplicável)',
      'Data de Atualização',
      'Fonte Oficial',
    ],
    prazoPublicacao: 'Revisão anual mínima (Decreto 11.529/2023)',
    cicloColeta: 'Ciclo anual — Envio até 31 de março do exercício subsequente',
    fluxoOrigem: '🔵 Coleta manual — Maranhão Transparente',
    baseLegal: [
      'Lei nº 12.527/2011 – Art. 8º',
      'Decreto Federal nº 11.529/2023',
      'Cartilha PNTP 2025',
    ],
    status: 'Em validação',
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // ABA: Convênios e Transferências
  // ─────────────────────────────────────────────────────────────────────────────

  'CONVÊNIO CELEBRADO': {
    id: 'MT-0034',
    assunto: 'Convênios e Transferências',
    termoGenerico: 'INSTRUMENTO DE REPASSE',
    termosEspecificos: [
      'CONVÊNIO CONCEDENTE',
      'TERMO DE FOMENTO',
      'TERMO DE COLABORAÇÃO',
      'ACORDO DE COOPERAÇÃO',
      'PLANO DE TRABALHO',
      'PRESTAÇÃO DE CONTAS',
      'RENÚNCIA FISCAL',
    ],
    termosRelacionados: [
      'TRANSFERÊNCIA VOLUNTÁRIA',
      'CONVÊNIO RECEBIDO',
      'FUNDO ESTADUAL',
      'DESPESA PÚBLICA',
      'CONTROLE INTERNO',
    ],
    termosNaoPreferenciais: [
      'CONVÊNIO DE SAÍDA',
      'CONVÊNIO OUTORGADO',
      'REPASSE PARA MUNICÍPIOS',
      'REPASSE PARA ENTIDADES',
    ],
    definicao:
      'Instrumento por meio do qual o Estado do Maranhão, na qualidade de concedente, transfere recursos financeiros a municípios, órgãos públicos ou entidades privadas sem fins lucrativos para a execução de objeto de interesse mútuo.',
    escopo:
      'Enviar todos os convênios em que o órgão figure como concedente, independentemente do valor ou da situação. Não confundir com contratos de prestação de serviço nem com transferências constitucionais obrigatórias.',
    metadados: [
      'Número do Convênio',
      'Objeto',
      'Convenente (nome e CNPJ/CPF)',
      'Valor Total',
      'Valor Repassado',
      'Data de Assinatura',
      'Data de Vigência',
      'Situação',
      'Link para o Plano de Trabalho',
      'Data de Atualização',
      'Fonte Oficial',
    ],
    prazoPublicacao:
      'Contínuo — imediato após assinatura (LAI – Art. 8º, §1º, II; Decreto Federal nº 7.724/2012 – Art. 7º, VI)',
    cicloColeta:
      'Contínuo — sob evento (assinatura, aditivo, encerramento, aprovação de prestação de contas) — Envio imediato',
    fluxoOrigem: '🔵 Coleta manual — Maranhão Transparente',
    baseLegal: [
      'Lei nº 12.527/2011 – Art. 8º, §1º, II',
      'Decreto Federal nº 7.724/2012 – Art. 7º, VI',
      'Lei nº 13.019/2014 (OSCs)',
      'Portaria Interministerial CGU/MP nº 424/2016',
      'Cartilha PNTP 2025 – Critério 7.1',
    ],
    status: 'Em validação',
  },

  'ACORDO SEM TRANSFERÊNCIA DE RECURSOS': {
    id: 'MT-0046',
    assunto: 'Convênios e Transferências',
    termoGenerico: 'INSTRUMENTO DE REPASSE',
    termosEspecificos: [
      'ACORDO DE COOPERAÇÃO TÉCNICA',
      'PROTOCOLO DE INTENÇÕES',
      'ACORDO DE COOPERAÇÃO',
      'OBRIGAÇÕES AJUSTADAS',
      'PARTES SIGNATÁRIAS',
    ],
    termosRelacionados: [
      'CONVÊNIO CELEBRADO',
      'CONVÊNIO RECEBIDO',
      'PARCERIA PÚBLICA',
      'LEGISLAÇÃO INSTITUCIONAL',
    ],
    termosNaoPreferenciais: [
      'COOPERAÇÃO TÉCNICA',
      'ACORDO INTERINSTITUCIONAL',
      'MEMORANDO DE ENTENDIMENTO',
    ],
    definicao:
      'Instrumento jurídico firmado entre o ente público e outros órgãos ou entidades para cooperação mútua sem envolvimento de transferência de recursos financeiros, com identificação das partes, objeto e obrigações.',
    escopo:
      'Publicar todos os acordos vigentes e encerrados. Identificar obrigatoriamente: partes, objeto e obrigações ajustadas. Não confundir com CONVÊNIO CELEBRADO (MT-0034) nem com CONVÊNIO RECEBIDO (MT-0035).',
    metadados: [
      'Número / Identificação do Acordo',
      'Tipo',
      'Partes Signatárias',
      'Objeto',
      'Obrigações Ajustadas',
      'Data de Assinatura',
      'Data de Vigência',
      'Situação',
      'Link do Instrumento',
      'Data de Atualização',
      'Fonte Oficial',
    ],
    prazoPublicacao:
      'Contínua — imediato após assinatura (LAI – Art. 8º + Cartilha PNTP 2025 – Critério 5.3)',
    cicloColeta:
      'Sob evento (assinatura, renovação ou encerramento) — Envio imediato',
    fluxoOrigem: '🔵 Coleta manual — Maranhão Transparente',
    baseLegal: [
      'Lei nº 12.527/2011 – Art. 8º',
      'LC nº 131/2009',
      'Cartilha PNTP 2025 – Critério 5.3',
    ],
    status: 'Em validação',
  },

  'CONVÊNIO RECEBIDO': {
    id: 'MT-0035',
    assunto: 'Convênios e Transferências',
    termoGenerico: 'INSTRUMENTO DE REPASSE',
    termosEspecificos: [
      'CONVÊNIO CONVENENTE',
      'CONTRAPARTIDA',
      'PLANO DE TRABALHO',
      'PRESTAÇÃO DE CONTAS',
      'EXECUÇÃO FÍSICA E FINANCEIRA',
    ],
    termosRelacionados: [
      'TRANSFERÊNCIA VOLUNTÁRIA',
      'CONVÊNIO CELEBRADO',
      'RECEITA PÚBLICA',
      'CONTROLE INTERNO',
      'FUNDO FEDERAL',
    ],
    termosNaoPreferenciais: [
      'CONVÊNIO DE ENTRADA',
      'CONVÊNIO FEDERAL',
      'RECEBIMENTO DE RECURSOS',
      'CONVÊNIO COM A UNIÃO',
    ],
    definicao:
      'Instrumento por meio do qual o Estado do Maranhão, na qualidade de convenente, recebe recursos financeiros da União ou de outro ente para a execução de objeto de interesse mútuo, com contraparte de contrapartida estadual.',
    escopo:
      'Enviar todos os convênios em que o órgão figure como convenente. Não confundir com transferências constitucionais (FPE, SUS, FUNDEB) nem com operações de crédito. Incluir o valor da contrapartida estadual e o percentual de execução física.',
    metadados: [
      'Número do Convênio (SICONV/Transferegov)',
      'Objeto',
      'Concedente (nome e CNPJ)',
      'Valor Total',
      'Valor Recebido',
      'Contrapartida Estadual',
      '% de Execução Física',
      'Data de Assinatura',
      'Data de Vigência',
      'Situação',
      'Link para o Plano de Trabalho',
      'Data de Atualização',
      'Fonte Oficial',
    ],
    prazoPublicacao:
      'Contínuo — imediato após assinatura (LAI – Art. 8º, §1º, II; Decreto Federal nº 7.724/2012 – Art. 7º, VI)',
    cicloColeta:
      'Contínuo — sob evento (assinatura, aditivo, recebimento de parcela, encerramento) — Envio imediato',
    fluxoOrigem: '🔵 Coleta manual — Maranhão Transparente',
    baseLegal: [
      'Lei nº 12.527/2011 – Art. 8º, §1º, II',
      'Decreto Federal nº 7.724/2012 – Art. 7º, VI',
      'Decreto Federal nº 6.170/2007',
      'Portaria Interministerial CGU/MP nº 424/2016',
      'Cartilha PNTP 2025 – Critério 7.1',
    ],
    status: 'Em validação',
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // ABA: Dados Abertos
  // ─────────────────────────────────────────────────────────────────────────────

  'CATÁLOGO DE DADOS ABERTOS': {
    id: 'MT-0032',
    assunto: 'Dados Abertos',
    termoGenerico: 'DADOS ABERTOS',
    termosEspecificos: [
      'CONJUNTO DE DADOS',
      'APLICATIVO PROGRAMÁTICO (API)',
      'FORMATO ABERTO',
      'LICENÇA DE USO',
      'METADADOS DO CONJUNTO',
    ],
    termosRelacionados: [
      'SERVIÇOS PÚBLICOS DIGITAIS',
      'EXECUÇÃO ORÇAMENTÁRIA',
      'INTEROPERABILIDADE',
      'PORTAL DE DADOS ABERTOS',
    ],
    termosNaoPreferenciais: [
      'DADOS GOVERNAMENTAIS ABERTOS',
      'OPEN DATA',
      'CONJUNTO DE DADOS ABERTOS',
    ],
    definicao:
      'Inventário estruturado dos conjuntos de dados publicados pelo ente em formatos abertos e reutilizáveis, com metadados suficientes para localização, compreensão e uso por terceiros.',
    escopo:
      'Publicar apenas conjuntos com licença livre de restrições de reuso. Metadados mínimos obrigatórios: nome, descrição, formato, frequência de atualização, licença e link.',
    metadados: [
      'Nome do Conjunto de Dados',
      'Descrição',
      'Órgão Publicador',
      'Formato (CSV / JSON / XML / ODS)',
      'Frequência de Atualização',
      'Licença de Uso',
      'Link de Acesso',
      'Data da Última Atualização',
      'Fonte Oficial',
    ],
    prazoPublicacao:
      'Contínua — atualização conforme frequência de cada conjunto (Decreto 8.777/2016 + LAI – Art. 8º, §3º)',
    cicloColeta:
      'Ciclo conforme frequência de cada conjunto — Revisão do catálogo: semestral',
    fluxoOrigem: '🔵 Coleta manual — Maranhão Transparente',
    baseLegal: [
      'Lei nº 12.527/2011 – Art. 8º, §3º',
      'Decreto Federal nº 8.777/2016',
      'Lei nº 14.129/2021 (Governo Digital)',
      'Cartilha PNTP 2025 – Critério 16.2',
    ],
    status: 'Em validação',
  },

  'SERVIÇOS PÚBLICOS DIGITAIS': {
    id: 'MT-0033',
    assunto: 'Dados Abertos',
    termoGenerico: 'DADOS ABERTOS',
    termosEspecificos: [
      'APLICATIVO GOVERNAMENTAL',
      'PORTAL DE SERVIÇOS',
      'LINK DE ACESSO',
      'TUTORIAL',
      'CANAL DIGITAL',
    ],
    termosRelacionados: [
      'CATÁLOGO DE DADOS ABERTOS',
      'SERVIÇO PÚBLICO',
      'CONTATO INSTITUCIONAL',
      'CARTA DE SERVIÇOS AO USUÁRIO',
    ],
    termosNaoPreferenciais: [
      'SERVIÇOS ONLINE',
      'SERVIÇOS ELETRÔNICOS',
      'GOVERNO DIGITAL',
    ],
    definicao:
      'Conjunto de serviços públicos disponibilizados ao cidadão exclusivamente por meio de canais digitais, com link de acesso e orientações de uso.',
    escopo:
      'Incluir apenas serviços digitais oficiais e operacionais. Link de acesso e órgão responsável são obrigatórios. Serviços fora do ar ou descontinuados devem ser marcados como inativos.',
    metadados: [
      'Nome do Serviço',
      'Descrição',
      'Link de Acesso',
      'Órgão Responsável',
      'Status (ativo / inativo)',
      'Tutorial (link, se disponível)',
      'Data de Atualização',
      'Fonte Oficial',
    ],
    prazoPublicacao: 'Sob alteração (Lei 14.129/2021 – Governo Digital)',
    cicloColeta: 'Sob evento (novo serviço ou alteração) — Validação semestral',
    fluxoOrigem: '🔵 Coleta manual — Maranhão Transparente',
    baseLegal: [
      'Lei nº 12.527/2011 – Art. 8º',
      'Lei nº 14.129/2021 (Governo Digital)',
      'Decreto Federal nº 10.332/2020',
      'Cartilha PNTP 2025 – Critério 15.1',
    ],
    status: 'Em validação',
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Helper: busca por ID (ex: "MT-0008")
// ─────────────────────────────────────────────────────────────────────────────
export function buscarPorId(id: string) {
  return Object.values(THESAURUS_MAP).find((t) => t.id === id) ?? null;
}

// Helper: busca por termo não preferencial / sinônimo
export function buscarPorSinonimo(
  sinonimo: string,
): [string, (typeof THESAURUS_MAP)[string]] | null {
  const upper = sinonimo.toUpperCase();
  for (const [termo, entry] of Object.entries(THESAURUS_MAP)) {
    if (entry.termosNaoPreferenciais.some((s) => s.toUpperCase() === upper)) {
      return [termo, entry];
    }
  }
  return null;
}

// Helper: lista todos os assuntos únicos
export const ASSUNTOS = [
  ...new Set(Object.values(THESAURUS_MAP).map((t) => t.assunto)),
];
