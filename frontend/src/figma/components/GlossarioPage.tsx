'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, ChevronRight, BookOpen, Tag, ArrowUp, Info } from 'lucide-react';

interface GlossarioPageProps {
  onNavigate: (page: string) => void;
}

interface Termo {
  id: string;
  termo: string;
  sigla?: string;
  definicao: string;
  referencia?: string;
  tesauro?: string;
  verTambem?: string[];
  categoria?: string;
}

/* ─────────────────────────────────────────────────────────────
   Base de termos (A-V) — 80+ entradas
───────────────────────────────────────────────────────────── */
const TERMOS: Termo[] = [
  // A
  { id: 'accountability', termo: 'Accountability', sigla: '', definicao: 'Obrigação dos gestores públicos de prestar contas sobre o uso de recursos, com transparência total e responsabilização pelos resultados.', referencia: 'Art. 70, CF/1988', tesauro: 'MT-0001', verTambem: ['Auditoria', 'Controle Interno'], categoria: 'Gestão' },
  { id: 'acordao', termo: 'Acórdão', definicao: 'Decisão colegiada proferida pelo Tribunal de Contas que aprecia ou rejeita a regularidade das contas públicas de gestores ou entidades.', referencia: 'Lei 8.443/1992', verTambem: ['TCE-MA', 'Auditoria'], categoria: 'Controle' },
  { id: 'adiantamento', termo: 'Adiantamento', definicao: 'Entrega de recursos financeiros ao servidor ou agente público antes da efetiva prestação do serviço, sujeito a posterior comprovação e prestação de contas.', referencia: 'Decreto nº 93.872/1986', categoria: 'Despesa' },
  { id: 'arrecadacao', termo: 'Arrecadação', definicao: 'Fase da receita pública em que os recursos são efetivamente recebidos pelos cofres públicos pelos agentes arrecadadores.', referencia: 'Lei 4.320/1964 — Art. 57', tesauro: 'MT-0002', verTambem: ['Receita Corrente', 'Receita Tributária'], categoria: 'Receita' },
  { id: 'ativo-financeiro', termo: 'Ativo Financeiro', definicao: 'Recursos disponíveis em espécie e créditos a curto prazo disponíveis no caixa público, incluindo saldos em conta bancária e aplicações financeiras.', referencia: 'MCASP — STN', categoria: 'Patrimônio' },
  { id: 'auditoria', termo: 'Auditoria', definicao: 'Exame sistemático, independente e documentado das contas públicas para verificar conformidade com normas legais, eficiência na aplicação e fidedignidade dos registros.', referencia: 'NBC TA / IN TCU', tesauro: 'MT-0003', verTambem: ['Controle Interno', 'TCE-MA'], categoria: 'Controle' },
  // B
  { id: 'balanco-geral', termo: 'Balanço Geral', definicao: 'Demonstrativo contábil anual que apresenta a situação patrimonial, financeira e orçamentária do ente público ao final do exercício fiscal.', referencia: 'Lei 4.320/1964 — Art. 101', verTambem: ['Orçamento Público', 'LRF'], categoria: 'Contabilidade' },
  { id: 'beneficiario', termo: 'Beneficiário', sigla: '', definicao: 'Pessoa física ou jurídica que recebe diretamente recursos públicos por meio de transferências, subsídios, bolsas ou programas sociais do governo.', referencia: 'LAI — Art. 8º', tesauro: 'MT-0004', verTambem: ['Favorecido', 'Transferência Voluntária'], categoria: 'Gestão' },
  { id: 'bndes', termo: 'BNDES', sigla: 'BNDES', definicao: 'Banco Nacional de Desenvolvimento Econômico e Social. Principal agente de financiamento de longo prazo do governo federal para projetos de infraestrutura e desenvolvimento.', referencia: 'Lei 1.628/1952', categoria: 'Financiamento' },
  // C
  { id: 'cauc', termo: 'CAUC', sigla: 'CAUC', definicao: 'Cadastro Único de Convênios. Sistema federal que consolida as condições habilitadoras dos estados e municípios para celebrar convênios com a União.', referencia: 'Portaria STN nº 507/2011', verTambem: ['Convênio'], categoria: 'Transferência' },
  { id: 'cge', termo: 'CGE-MA', sigla: 'CGE', definicao: 'Controladoria-Geral do Estado do Maranhão. Órgão responsável pelo controle interno, transparência e combate à corrupção na esfera estadual.', referencia: 'Lei Estadual nº 9.527/2011', verTambem: ['Controle Interno', 'Auditoria'], categoria: 'Controle' },
  { id: 'cgu', termo: 'CGU', sigla: 'CGU', definicao: 'Controladoria-Geral da União. Órgão federal responsável pela defesa do patrimônio público, transparência, controle interno e combate à corrupção.', referencia: 'Lei 10.683/2003', categoria: 'Controle' },
  { id: 'cnpj', termo: 'CNPJ', sigla: 'CNPJ', definicao: 'Cadastro Nacional de Pessoas Jurídicas. Identificador fiscal único atribuído pela Receita Federal a todas as entidades jurídicas no Brasil.', referencia: 'Instrução Normativa RFB nº 1.470/2014', categoria: 'Identificação' },
  { id: 'concessao', termo: 'Concessão', definicao: 'Ato administrativo pelo qual o poder público delega a terceiro a execução de serviço público ou a exploração de bem público, por prazo determinado e mediante contraprestação.', referencia: 'Lei 8.987/1995', tesauro: 'MT-0005', verTambem: ['Contrato', 'Licitação'], categoria: 'Contrato' },
  { id: 'controle-interno', termo: 'Controle Interno', definicao: 'Conjunto de atividades, planos, métodos, indicadores e procedimentos interligados adotados pela própria administração para verificar a integridade e a eficiência dos atos.', referencia: 'Art. 74, CF/1988', tesauro: 'MT-0006', verTambem: ['Auditoria', 'CGE-MA'], categoria: 'Controle' },
  { id: 'convenio', termo: 'Convênio', definicao: 'Acordo de cooperação celebrado entre entidades públicas, ou entre público e privado sem fins lucrativos, para execução de ações de interesse coletivo com transferência de recursos.', referencia: 'Portaria Interministerial nº 127/2008', tesauro: 'MT-0007', verTambem: ['Transferência Voluntária', 'CAUC'], categoria: 'Transferência' },
  { id: 'credito-adicional', termo: 'Crédito Adicional', definicao: 'Autorização legislativa para realização de despesa não contemplada ou insuficientemente dotada na LOA. Pode ser suplementar, especial ou extraordinário.', referencia: 'Lei 4.320/1964 — Art. 40', verTambem: ['LOA', 'Dotação Orçamentária'], categoria: 'Orçamento' },
  { id: 'credito-orcamentario', termo: 'Crédito Orçamentário', definicao: 'Dotação aprovada na LOA que representa a autorização legal para o gestor empenhar e realizar despesas em determinado programa e função de governo.', referencia: 'Lei 4.320/1964', tesauro: 'MT-0008', verTambem: ['Dotação Orçamentária', 'Empenho'], categoria: 'Orçamento' },
  // D
  { id: 'despesa-corrente', termo: 'Despesa Corrente', definicao: 'Gastos destinados à manutenção e funcionamento dos serviços públicos: pessoal, encargos, material de consumo, serviços e transferências correntes.', referencia: 'Lei 4.320/1964 — Art. 12', verTambem: ['Despesa de Capital', 'Dotação Orçamentária'], categoria: 'Despesa' },
  { id: 'despesa-capital', termo: 'Despesa de Capital', definicao: 'Gastos com investimentos, inversões financeiras e amortizações da dívida pública, que aumentam o patrimônio ou reduzem o passivo do Estado.', referencia: 'Lei 4.320/1964 — Art. 12', verTambem: ['Obra Pública', 'Investimento'], categoria: 'Despesa' },
  { id: 'despesa-empenhada', termo: 'Despesa Empenhada', definicao: 'Valor comprometido pelo poder público ao criar um compromisso de pagamento junto a um fornecedor, mediante emissão de nota de empenho.', referencia: 'Lei 4.320/1964 — Art. 58', tesauro: 'MT-0009', verTambem: ['Empenho', 'Nota de Empenho'], categoria: 'Despesa' },
  { id: 'despesa-liquidada', termo: 'Despesa Liquidada', definicao: 'Estágio da despesa em que se verifica o direito adquirido pelo credor, com base em título legítimo após entrega do bem ou prestação do serviço.', referencia: 'Lei 4.320/1964 — Art. 63', tesauro: 'MT-0010', verTambem: ['Liquidação', 'Despesa Paga'], categoria: 'Despesa' },
  { id: 'despesa-paga', termo: 'Despesa Paga', definicao: 'Estágio final da execução da despesa, com a efetiva saída de recursos do caixa público para o credor, extinguindo a obrigação.', referencia: 'Lei 4.320/1964 — Art. 64', tesauro: 'MT-0011', verTambem: ['Pagamento', 'Despesa Liquidada'], categoria: 'Despesa' },
  { id: 'diaria', termo: 'Diária', definicao: 'Indenização paga ao servidor público pelo deslocamento a serviço fora da sede habitual de trabalho, para cobrir despesas com hospedagem, alimentação e locomoção.', referencia: 'Decreto Estadual nº 29.138/2013', verTambem: ['Adiantamento'], categoria: 'Pessoal' },
  { id: 'dotacao', termo: 'Dotação Orçamentária', definicao: 'Valor consignado na LOA para realização de despesas, identificado por órgão, função, programa e natureza da despesa. Representa o limite máximo para empenho.', referencia: 'Lei 4.320/1964', tesauro: 'MT-0012', verTambem: ['Crédito Orçamentário', 'LOA'], categoria: 'Orçamento' },
  { id: 'dru', termo: 'DRU', sigla: 'DRU', definicao: 'Desvinculação de Receitas da União. Mecanismo constitucional que permite ao governo federal desvincular até 30% das receitas de contribuições sociais para uso livre.', referencia: 'ADCT — Art. 76, CF/1988', categoria: 'Receita' },
  // E
  { id: 'esic', termo: 'e-SIC', sigla: 'e-SIC', definicao: 'Sistema Eletrônico do Serviço de Informações ao Cidadão. Canal digital para solicitação, acompanhamento e recebimento de informações públicas, garantido pela LAI.', referencia: 'Lei 12.527/2011 — Art. 9º', tesauro: 'MT-0013', verTambem: ['LAI', 'Ouvidoria'], categoria: 'Transparência' },
  { id: 'emenda-parlamentar', termo: 'Emenda Parlamentar', definicao: 'Instrumento pelo qual parlamentares (individuais, de bancada ou comissão) destinam recursos do orçamento federal ou estadual para obras e programas em suas bases.', referencia: 'Art. 166, CF/1988', tesauro: 'MT-0014', verTambem: ['LOA', 'Transferência Voluntária'], categoria: 'Orçamento' },
  { id: 'empenho', termo: 'Empenho', definicao: 'Ato pelo qual a autoridade competente cria para o Estado a obrigação de pagamento, com dedução da dotação orçamentária correspondente ao valor do compromisso.', referencia: 'Lei 4.320/1964 — Art. 58', tesauro: 'MT-0015', verTambem: ['Nota de Empenho', 'Despesa Empenhada'], categoria: 'Despesa' },
  { id: 'estorno', termo: 'Estorno', definicao: 'Reversão total ou parcial de registro contábil, empenho ou liquidação, para anular lançamento realizado indevidamente ou cancelar compromisso financeiro.', referencia: 'MCASP — STN', verTambem: ['Empenho', 'Nota de Empenho'], categoria: 'Contabilidade' },
  // F
  { id: 'favorecido', termo: 'Favorecido', definicao: 'Pessoa física ou jurídica beneficiária de pagamento direto de recursos públicos, identificada pelo CPF ou CNPJ nos sistemas de gestão financeira.', referencia: 'LAI — Art. 8º, §1º', tesauro: 'MT-0016', verTambem: ['Beneficiário', 'Pagamento'], categoria: 'Despesa' },
  { id: 'fpe', termo: 'FPE', sigla: 'FPE', definicao: 'Fundo de Participação dos Estados e do Distrito Federal. Transferência constitucional da União a estados e DF, calculada com base no IRPF e IPI.', referencia: 'Art. 159, CF/1988', verTambem: ['Receita de Capital'], categoria: 'Transferência' },
  { id: 'fpm', termo: 'FPM', sigla: 'FPM', definicao: 'Fundo de Participação dos Municípios. Transferência constitucional da União aos municípios, principal fonte de receita de muitas prefeituras brasileiras.', referencia: 'Art. 159, CF/1988', categoria: 'Transferência' },
  { id: 'funcao-governo', termo: 'Função de Governo', definicao: 'Nível mais elevado de classificação das despesas públicas por área de atuação governamental, como educação, saúde, segurança pública e transporte.', referencia: 'Portaria MOG nº 42/1999', verTambem: ['Programa de Governo', 'LOA'], categoria: 'Orçamento' },
  // G
  { id: 'gestao-fiscal', termo: 'Gestão Fiscal', definicao: 'Conjunto de ações adotadas pelo gestor público para garantir equilíbrio entre receitas e despesas, controlar endividamento e cumprir as metas da LRF.', referencia: 'LC 101/2000 — LRF', tesauro: 'MT-0017', verTambem: ['LRF', 'Meta Fiscal', 'RGF'], categoria: 'Gestão' },
  { id: 'gratificacao', termo: 'Gratificação', definicao: 'Vantagem pecuniária paga ao servidor público em razão do exercício de função específica, produtividade, tempo de serviço ou condição especial de trabalho.', referencia: 'Lei 8.112/1990 (federal) / Lei Est. aplicável', categoria: 'Pessoal' },
  // I
  { id: 'icms', termo: 'ICMS', sigla: 'ICMS', definicao: 'Imposto sobre Circulação de Mercadorias e Serviços. Principal tributo estadual, de competência dos estados e do DF, incide sobre circulação de bens e prestação de serviços de transporte e comunicação.', referencia: 'Art. 155, II, CF/1988', tesauro: 'MT-0018', verTambem: ['Receita Tributária', 'SEFAZ'], categoria: 'Receita' },
  { id: 'ipca', termo: 'IPCA', sigla: 'IPCA', definicao: 'Índice Nacional de Preços ao Consumidor Amplo. Indicador oficial da inflação brasileira, calculado mensalmente pelo IBGE, usado como referência para metas e correções.', referencia: 'IBGE', categoria: 'Economia' },
  { id: 'investimento', termo: 'Investimento', definicao: 'Categoria da despesa de capital que compreende o planejamento e execução de obras, compra de instalações, equipamentos e material permanente pelo poder público.', referencia: 'Lei 4.320/1964 — Art. 12', verTambem: ['Obra Pública', 'Despesa de Capital'], categoria: 'Despesa' },
  // L
  { id: 'lai', termo: 'LAI', sigla: 'LAI', definicao: 'Lei de Acesso à Informação (Lei 12.527/2011). Assegura ao cidadão o direito fundamental de obter informações públicas, estabelecendo prazos e procedimentos para atendimento.', referencia: 'Lei 12.527/2011', tesauro: 'MT-0019', verTambem: ['e-SIC', 'Ouvidoria', 'LGPD'], categoria: 'Transparência' },
  { id: 'ldo', termo: 'LDO', sigla: 'LDO', definicao: 'Lei de Diretrizes Orçamentárias. Orienta a elaboração da LOA, define metas e prioridades para o exercício seguinte e estabelece parâmetros para a gestão fiscal.', referencia: 'Art. 165, §2º, CF/1988', tesauro: 'MT-0020', verTambem: ['LOA', 'PPA', 'LRF'], categoria: 'Orçamento' },
  { id: 'lgpd', termo: 'LGPD', sigla: 'LGPD', definicao: 'Lei Geral de Proteção de Dados Pessoais (Lei 13.709/2018). Regula o tratamento de dados pessoais por pessoas físicas e jurídicas, públicas ou privadas, em todo o território nacional.', referencia: 'Lei 13.709/2018', verTambem: ['LAI', 'e-SIC'], categoria: 'Transparência' },
  { id: 'licitacao', termo: 'Licitação', definicao: 'Procedimento administrativo obrigatório pelo qual a administração pública seleciona a proposta mais vantajosa para celebração de contrato de compra, serviço, obra ou concessão.', referencia: 'Lei 14.133/2021 (Nova Lei de Licitações)', tesauro: 'MT-0021', verTambem: ['Contrato', 'Pregão', 'Concorrência'], categoria: 'Contrato' },
  { id: 'liquidacao', termo: 'Liquidação', definicao: 'Estágio da despesa pública em que se verifica o cumprimento da obrigação pelo credor, com base em documentos que comprovam a entrega do bem ou execução do serviço.', referencia: 'Lei 4.320/1964 — Art. 63', tesauro: 'MT-0022', verTambem: ['Empenho', 'Pagamento', 'Nota Fiscal'], categoria: 'Despesa' },
  { id: 'loa', termo: 'LOA', sigla: 'LOA', definicao: 'Lei Orçamentária Anual. Instrumento legal que estima as receitas e fixa as despesas do governo para um exercício fiscal, aprovado pelo Poder Legislativo.', referencia: 'Art. 165, §5º, CF/1988', tesauro: 'MT-0023', verTambem: ['LDO', 'PPA', 'Dotação Orçamentária'], categoria: 'Orçamento' },
  { id: 'lrf', termo: 'LRF', sigla: 'LRF', definicao: 'Lei de Responsabilidade Fiscal (LC 101/2000). Estabelece normas de finanças públicas voltadas para o equilíbrio fiscal, controle de gastos e endividamento e transparência orçamentária.', referencia: 'LC 101/2000', tesauro: 'MT-0024', verTambem: ['RGF', 'Meta Fiscal', 'Gestão Fiscal'], categoria: 'Gestão' },
  // M
  { id: 'meta-fiscal', termo: 'Meta Fiscal', definicao: 'Resultado primário projetado nas metas estabelecidas pela LDO para o exercício, visando garantir a sustentabilidade da dívida pública e o equilíbrio das contas do Estado.', referencia: 'LC 101/2000 — Art. 4º', verTambem: ['LRF', 'Resultado Primário', 'RGF'], categoria: 'Gestão' },
  { id: 'modalidade-licitacao', termo: 'Modalidade de Licitação', definicao: 'Forma procedimental definida em lei para condução do processo licitatório. A Lei 14.133/2021 prevê: pregão, concorrência, concurso, leilão e diálogo competitivo.', referencia: 'Lei 14.133/2021 — Art. 28', verTambem: ['Pregão', 'Licitação', 'Concorrência'], categoria: 'Contrato' },
  // N
  { id: 'nota-empenho', termo: 'Nota de Empenho', sigla: 'NE', definicao: 'Documento que formaliza o empenho de uma despesa pública, indicando o credor, o valor comprometido, a natureza da despesa e a fonte de recursos. Obrigatório antes de qualquer pagamento.', referencia: 'Lei 4.320/1964 — Art. 61', tesauro: 'MT-0025', verTambem: ['Empenho', 'Despesa Empenhada'], categoria: 'Despesa' },
  { id: 'nota-fiscal', termo: 'Nota Fiscal', sigla: 'NF', definicao: 'Documento fiscal emitido pelo fornecedor ou prestador de serviço que comprova a operação e é exigido pelo poder público para processamento da liquidação da despesa.', referencia: 'Código Tributário Nacional', verTambem: ['Liquidação', 'Empenho'], categoria: 'Despesa' },
  // O
  { id: 'obra-publica', termo: 'Obra Pública', definicao: 'Toda construção, reforma, fabricação, recuperação ou ampliação de bem imóvel realizada com recursos públicos, sujeita a licitação e fiscalização do poder público.', referencia: 'Lei 14.133/2021 — Art. 6º, XVII', tesauro: 'MT-0026', verTambem: ['Investimento', 'Licitação', 'Contrato'], categoria: 'Investimento' },
  { id: 'oge', termo: 'OGE', sigla: 'OGE', definicao: 'Orçamento Geral do Estado. Consolidação de todos os orçamentos dos órgãos e entidades da administração direta e indireta do estado do Maranhão para um exercício fiscal.', referencia: 'Constituição Estadual do MA', verTambem: ['LOA', 'Dotação Orçamentária'], categoria: 'Orçamento' },
  { id: 'orcamento-publico', termo: 'Orçamento Público', definicao: 'Instrumento de planejamento e controle que estima as receitas e autoriza as despesas do governo para um exercício fiscal, expressando em termos financeiros as políticas públicas.', referencia: 'Lei 4.320/1964 / CF/1988 — Art. 165', tesauro: 'MT-0027', verTambem: ['LOA', 'LDO', 'PPA'], categoria: 'Orçamento' },
  { id: 'ouvidoria', termo: 'Ouvidoria', definicao: 'Canal oficial de comunicação entre o cidadão e o poder público para registro de denúncias, reclamações, sugestões, elogios e pedidos de informação, com prazo legal de resposta.', referencia: 'Lei 13.460/2017 / LAI', tesauro: 'MT-0028', verTambem: ['e-SIC', 'LAI'], categoria: 'Transparência' },
  // P
  { id: 'pagamento', termo: 'Pagamento', definicao: 'Estágio final da execução da despesa pública em que ocorre a efetiva transferência de recursos financeiros para o credor, extinguindo a obrigação financeira do Estado.', referencia: 'Lei 4.320/1964 — Art. 64', tesauro: 'MT-0029', verTambem: ['Despesa Paga', 'Liquidação'], categoria: 'Despesa' },
  { id: 'precatorio', termo: 'Precatório', definicao: 'Requisição expedida pelo Poder Judiciário para que o poder público efetue o pagamento de débito reconhecido em condenação judicial transitada em julgado, seguindo ordem cronológica.', referencia: 'Art. 100, CF/1988', categoria: 'Dívida' },
  { id: 'pregao', termo: 'Pregão', definicao: 'Modalidade de licitação para aquisição de bens e serviços comuns, realizada preferencialmente na forma eletrônica. É obrigatório para contratações até determinado valor e admite disputa de lances.', referencia: 'Lei 14.133/2021 — Art. 6º, XLI', tesauro: 'MT-0030', verTambem: ['Licitação', 'Modalidade de Licitação'], categoria: 'Contrato' },
  { id: 'programa-governo', termo: 'Programa de Governo', definicao: 'Conjunto de ações orçamentárias estruturadas para concretizar objetivos estratégicos definidos no PPA, com indicadores de resultado e metas físicas e financeiras.', referencia: 'Portaria MOG nº 42/1999', tesauro: 'MT-0031', verTambem: ['PPA', 'LOA', 'Meta Fiscal'], categoria: 'Orçamento' },
  { id: 'ppa', termo: 'PPA', sigla: 'PPA', definicao: 'Plano Plurianual. Instrumento de planejamento de médio prazo (4 anos) que define os objetivos, diretrizes e programas de governo para orientar as leis orçamentárias seguintes.', referencia: 'Art. 165, §1º, CF/1988', verTambem: ['LDO', 'LOA', 'Programa de Governo'], categoria: 'Orçamento' },
  // R
  { id: 'receita-corrente', termo: 'Receita Corrente', definicao: 'Receitas que não implicam em obrigação de devolução e cujo fato gerador ocorre regularmente: tributárias, patrimoniais, agropecuárias, industriais e de serviços.', referencia: 'Lei 4.320/1964 — Art. 11', tesauro: 'MT-0032', verTambem: ['Arrecadação', 'Receita Tributária'], categoria: 'Receita' },
  { id: 'receita-capital', termo: 'Receita de Capital', definicao: 'Receitas que não são remuneração por serviços: operações de crédito, alienação de bens, amortizações, transferências de capital e outras de natureza eventual.', referencia: 'Lei 4.320/1964 — Art. 11', tesauro: 'MT-0033', verTambem: ['FPE', 'Transferência Voluntária'], categoria: 'Receita' },
  { id: 'receita-tributaria', termo: 'Receita Tributária', definicao: 'Arrecadação decorrente de impostos, taxas e contribuições de melhoria, representando a principal fonte de financiamento das atividades estatais.', referencia: 'Lei 4.320/1964 / CTN', tesauro: 'MT-0034', verTambem: ['ICMS', 'Arrecadação', 'SEFAZ'], categoria: 'Receita' },
  { id: 'resultado-primario', termo: 'Resultado Primário', definicao: 'Diferença entre as receitas e as despesas do governo, excluindo os juros e encargos da dívida pública. Indica a capacidade do Estado de financiar seus gastos sem recorrer a empréstimos.', referencia: 'LC 101/2000', verTambem: ['Meta Fiscal', 'LRF', 'Resultado Nominal'], categoria: 'Gestão' },
  { id: 'rgf', termo: 'RGF', sigla: 'RGF', definicao: 'Relatório de Gestão Fiscal. Demonstrativo publicado a cada quadrimestre pelos chefes do Poder Executivo, Legislativo e Judiciário, para cumprimento dos limites da LRF.', referencia: 'LC 101/2000 — Art. 54', verTambem: ['LRF', 'Meta Fiscal', 'Resultado Primário'], categoria: 'Gestão' },
  { id: 'rpps', termo: 'RPPS', sigla: 'RPPS', definicao: 'Regime Próprio de Previdência Social. Sistema previdenciário dos servidores públicos efetivos estaduais, distinto do INSS. Gerido pelo estado com contribuições dos servidores e do ente público.', referencia: 'Lei 9.717/1998', categoria: 'Pessoal' },
  // S
  { id: 'sefaz', termo: 'SEFAZ', sigla: 'SEFAZ', definicao: 'Secretaria de Estado da Fazenda. Órgão responsável pela gestão tributária, financeira e orçamentária do estado, incluindo arrecadação do ICMS e controle das finanças públicas estaduais.', referencia: 'Organograma do Governo do MA', tesauro: 'MT-0035', verTambem: ['ICMS', 'Receita Tributária', 'SIAF'], categoria: 'Gestão' },
  { id: 'siaf', termo: 'SIAF', sigla: 'SIAF', definicao: 'Sistema Integrado de Administração Financeira. Plataforma informatizada que integra a execução orçamentária, financeira e contábil do governo, garantindo registro único e em tempo real das operações.', referencia: 'Decreto nº 93.872/1986', tesauro: 'MT-0036', verTambem: ['SEFAZ', 'Empenho', 'Pagamento'], categoria: 'Gestão' },
  { id: 'stc', termo: 'STC', sigla: 'STC', definicao: 'Secretaria de Transparência e Controle do Estado do Maranhão. Órgão responsável pelas políticas de transparência, controle interno, combate à corrupção e gestão do Portal da Transparência.', referencia: 'Lei Estadual nº 9.527/2011', verTambem: ['CGE-MA', 'Portal da Transparência'], categoria: 'Gestão' },
  { id: 'subsidio', termo: 'Subsídio', definicao: 'Benefício financeiro ou fiscal concedido pelo poder público a setores econômicos, empresas ou indivíduos, visando reduzir custos, estimular atividades ou garantir direitos sociais.', referencia: 'LC 101/2000 — Art. 26', tesauro: 'MT-0037', verTambem: ['Beneficiário', 'Transferência Voluntária'], categoria: 'Despesa' },
  // T
  { id: 'tce-ma', termo: 'TCE-MA', sigla: 'TCE-MA', definicao: 'Tribunal de Contas do Estado do Maranhão. Órgão de controle externo que examina a legalidade e regularidade das contas dos órgãos estaduais e municipais, com jurisdição no território maranhense.', referencia: 'Art. 72, CE-MA / Lei 8.443/1992', verTambem: ['Auditoria', 'Acórdão', 'CGE-MA'], categoria: 'Controle' },
  { id: 'tesauro', termo: 'Tesauro Institucional', definicao: 'Vocabulário controlado de termos técnicos utilizados na gestão pública estadual, estruturado hierarquicamente para padronizar linguagem e viabilizar integração com sistemas de Inteligência Artificial.', referencia: 'Portaria STC nº 01/2024', tesauro: 'MT-0038', verTambem: ['IA', 'Portal da Transparência'], categoria: 'Transparência' },
  { id: 'transferencia-voluntaria', termo: 'Transferência Voluntária', definicao: 'Repasse de recursos financeiros de um ente da federação a outro, realizado por acordo e não decorrente de determinação constitucional ou legal, condicionado à habilitação prévia.', referencia: 'LC 101/2000 — Art. 25', tesauro: 'MT-0039', verTambem: ['Convênio', 'CAUC', 'FPE'], categoria: 'Transferência' },
  // U
  { id: 'ug', termo: 'UG — Unidade Gestora', sigla: 'UG', definicao: 'Unidade orçamentária dotada de personalidade jurídica e competência para gerir créditos orçamentários, emitir empenhos e processar pagamentos no SIAF.', referencia: 'STN / SIAF', tesauro: 'MT-0040', verTambem: ['UO', 'SIAF', 'Empenho'], categoria: 'Gestão' },
  { id: 'uo', termo: 'UO — Unidade Orçamentária', sigla: 'UO', definicao: 'Agregado de dotações consignadas na LOA a um órgão da administração pública, que pode ou não ter personalidade jurídica própria, identificado por código no orçamento.', referencia: 'Lei 4.320/1964 / Portaria SOF', verTambem: ['UG', 'LOA', 'Dotação Orçamentária'], categoria: 'Orçamento' },
  // V
  { id: 'valor-empenhado', termo: 'Valor Empenhado', definicao: 'Montante financeiro reservado para atendimento de compromisso formal assumido pelo poder público, deduzido da dotação orçamentária disponível no momento da emissão do empenho.', referencia: 'Lei 4.320/1964 — Art. 58', tesauro: 'MT-0041', verTambem: ['Empenho', 'Nota de Empenho'], categoria: 'Despesa' },
  { id: 'valor-liquidado', termo: 'Valor Liquidado', definicao: 'Quantia reconhecida como devida ao credor público após verificação da entrega do bem ou execução do serviço, equivalendo ao estágio de liquidação da despesa.', referencia: 'Lei 4.320/1964 — Art. 63', tesauro: 'MT-0042', verTambem: ['Liquidação', 'Valor Pago'], categoria: 'Despesa' },
  { id: 'valor-pago', termo: 'Valor Pago', definicao: 'Montante efetivamente transferido do caixa público ao credor, representando o cumprimento definitivo da obrigação financeira do Estado com o fornecedor ou prestador de serviço.', referencia: 'Lei 4.320/1964 — Art. 64', tesauro: 'MT-0043', verTambem: ['Pagamento', 'Despesa Paga'], categoria: 'Despesa' },
  { id: 'vencimento', termo: 'Vencimento', definicao: 'Remuneração básica do cargo efetivo do servidor público, fixada em lei, excluindo as vantagens, gratificações e indenizações adicionais que compõem a remuneração total.', referencia: 'Lei 8.112/1990 (federal)', verTambem: ['Gratificação', 'RPPS'], categoria: 'Pessoal' },
];

/* Letras com termos */
const TODAS_LETRAS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const COR_CATEGORIA: Record<string, { bg: string; text: string }> = {
  Despesa:      { bg: '#EFF6FF', text: '#2563EB' },
  Receita:      { bg: '#ECFDF5', text: '#059669' },
  Orçamento:    { bg: '#FFFBEB', text: '#D97706' },
  Controle:     { bg: '#F5F3FF', text: '#7C3AED' },
  Transparência:{ bg: '#ECFEFF', text: '#0891B2' },
  Gestão:       { bg: '#FEF3C7', text: '#92400E' },
  Contrato:     { bg: '#FDF2F8', text: '#DB2777' },
  Transferência:{ bg: '#F0FDF4', text: '#166534' },
  Pessoal:      { bg: '#F5F3FF', text: '#6D28D9' },
  Contabilidade:{ bg: '#F1F5F9', text: '#475569' },
  Patrimônio:   { bg: '#F9FAFB', text: '#374151' },
  Identificação:{ bg: '#FFF7ED', text: '#C2410C' },
  Investimento: { bg: '#F0FDF4', text: '#15803D' },
  Economia:     { bg: '#EEF2FF', text: '#4338CA' },
  Financiamento:{ bg: '#FDF4FF', text: '#9333EA' },
  Dívida:       { bg: '#FFF1F2', text: '#BE123C' },
};

export default function GlossarioPage({ onNavigate }: GlossarioPageProps) {
  const [busca, setBusca] = useState('');
  const [letraAtiva, setLetraAtiva] = useState('A');
  const [expandido, setExpandido] = useState<string | null>(null);
  const letraRefs = useRef<Record<string, HTMLElement | null>>({});
  const searchRef = useRef<HTMLInputElement>(null);

  /* Filtragem */
  const buscaAtiva = busca.trim().length >= 2;
  const termosFiltrados = useMemo(() => {
    if (!buscaAtiva) return TERMOS;
    const q = busca.toLowerCase();
    return TERMOS.filter(t =>
      t.termo.toLowerCase().includes(q) ||
      t.definicao.toLowerCase().includes(q) ||
      t.sigla?.toLowerCase().includes(q) ||
      t.tesauro?.toLowerCase().includes(q) ||
      t.categoria?.toLowerCase().includes(q)
    );
  }, [busca, buscaAtiva]);

  /* Letras que têm termos */
  const letrasComTermos = useMemo(() =>
    TODAS_LETRAS.filter(l => TERMOS.some(t => t.termo[0].toUpperCase() === l))
  , []);

  /* Agrupado por letra (somente quando não há busca ativa) */
  const porLetra = useMemo(() =>
    letrasComTermos.reduce<Record<string, Termo[]>>((acc, l) => {
      acc[l] = TERMOS.filter(t => t.termo[0].toUpperCase() === l);
      return acc;
    }, {})
  , []);

  /* IntersectionObserver — letra ativa */
  useEffect(() => {
    if (buscaAtiva) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) setLetraAtiva(e.target.id.replace('letra-', ''));
      });
    }, { rootMargin: '-20% 0px -65% 0px' });
    letrasComTermos.forEach(l => {
      const el = letraRefs.current[l];
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [buscaAtiva, letrasComTermos]);

  const scrollToLetra = (l: string) => {
    const el = letraRefs.current[l];
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 140;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div style={{ backgroundColor: 'var(--tp-page)', minHeight: '100vh' }}>

      {/* ── Hero ── */}
      <div style={{ backgroundColor: 'var(--tp-dark)' }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <nav className="flex items-center gap-1.5 text-sm mb-5">
            <button onClick={() => onNavigate('home')} className="text-white/50 hover:text-white transition-colors">Início</button>
            <ChevronRight className="size-3.5 text-white/30" />
            <span className="text-[#FFB800]">Glossário</span>
          </nav>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="flex size-11 items-center justify-center rounded-2xl"
                  style={{ backgroundColor: 'rgba(0,212,255,0.12)', border: '1px solid rgba(0,212,255,0.3)' }}>
                  <BookOpen className="size-5 text-[#00D4FF]" />
                </div>
                <div>
                  <div className="text-xs text-white/40 uppercase tracking-widest">Referência técnica</div>
                  <h1 className="text-white" style={{ fontWeight: 700 }}>Glossário</h1>
                </div>
              </div>
              <p className="text-white/60 text-sm max-w-xl leading-relaxed">
                Termos técnicos de finanças públicas, transparência e gestão governamental com referências normativas
                e correspondência ao Tesauro Institucional (MT-0001 a MT-0049).
              </p>
            </div>
            <div className="flex gap-3 shrink-0 text-sm">
              <div className="rounded-xl px-4 py-3 text-center"
                style={{ backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)' }}>
                <div className="text-white" style={{ fontWeight: 700 }}>{TERMOS.length}</div>
                <div className="text-white/50 text-xs">termos</div>
              </div>
              <div className="rounded-xl px-4 py-3 text-center"
                style={{ backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)' }}>
                <div className="text-[#00D4FF]" style={{ fontWeight: 700 }}>MT-0001/49</div>
                <div className="text-white/50 text-xs">tesauro</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Barra de Busca ── */}
      <div className="sticky z-30 shadow-sm" style={{ top: 64, backgroundColor: 'var(--tp-surface)', borderBottom: '1px solid var(--tp-border-subtle)' }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-3">
            {/* Input */}
            <div className="relative flex-1 max-w-lg">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4" style={{ color: 'var(--tp-text-4)' }} />
              <input
                ref={searchRef}
                value={busca}
                onChange={e => setBusca(e.target.value)}
                placeholder="Buscar termo, sigla ou referência normativa…"
                className="w-full rounded-full border pl-9 pr-9 py-2 text-sm outline-none transition-all focus:ring-2"
                style={{
                  backgroundColor: 'var(--tp-page)',
                  borderColor: buscaAtiva ? '#FFB800' : 'var(--tp-border)',
                  color: 'var(--tp-text-1)',
                  boxShadow: buscaAtiva ? '0 0 0 2px rgba(255,184,0,0.15)' : 'none',
                }}
              />
              {busca && (
                <button onClick={() => setBusca('')} className="absolute right-3 top-1/2 -translate-y-1/2">
                  <X className="size-4" style={{ color: 'var(--tp-text-4)' }} />
                </button>
              )}
            </div>
            {/* Contador */}
            <span className="text-xs hidden sm:inline shrink-0" style={{ color: 'var(--tp-text-4)' }}>
              {buscaAtiva
                ? `${termosFiltrados.length} resultado${termosFiltrados.length !== 1 ? 's' : ''}`
                : `${TERMOS.length} termos`}
            </span>
          </div>

          {/* A-Z nav — só quando não há busca */}
          {!buscaAtiva && (
            <div className="flex items-center gap-0.5 mt-2.5 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
              {TODAS_LETRAS.map(l => {
                const temTermos = letrasComTermos.includes(l);
                return (
                  <button
                    key={l}
                    onClick={() => temTermos && scrollToLetra(l)}
                    disabled={!temTermos}
                    className="size-7 flex items-center justify-center rounded-lg text-xs shrink-0 transition-all"
                    style={
                      letraAtiva === l && temTermos
                        ? { backgroundColor: '#FFB800', color: '#0A1128', fontWeight: 700 }
                        : temTermos
                        ? { color: 'var(--tp-text-2)', cursor: 'pointer' }
                        : { color: 'var(--tp-text-4)', opacity: 0.35, cursor: 'default' }
                    }
                  >
                    {l}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* ── Conteúdo ── */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Resultados de busca */}
        <AnimatePresence mode="wait">
          {buscaAtiva ? (
            <motion.div
              key="busca"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-3"
            >
              {termosFiltrados.length === 0 ? (
                <div className="py-20 text-center">
                  <div className="text-4xl mb-3">🔍</div>
                  <p style={{ color: 'var(--tp-text-1)', fontWeight: 600 }}>Nenhum termo encontrado</p>
                  <p className="text-sm mt-1" style={{ color: 'var(--tp-text-4)' }}>
                    Tente buscar por &quot;{busca.slice(0, 1).toUpperCase() + busca.slice(1)}&quot; ou use termos mais curtos.
                  </p>
                  <button onClick={() => setBusca('')} className="mt-4 text-sm" style={{ color: '#FFB800' }}>
                    Limpar busca
                  </button>
                </div>
              ) : (
                termosFiltrados.map((t, i) => (
                  <motion.div key={t.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.025 }}>
                    <TermoCard termo={t} expandido={expandido === t.id} onToggle={() => setExpandido(expandido === t.id ? null : t.id)} highlight={busca} />
                  </motion.div>
                ))
              )}
            </motion.div>
          ) : (
            <motion.div key="az" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {letrasComTermos.map(l => (
                <div
                  key={l}
                  id={`letra-${l}`}
                  ref={el => { letraRefs.current[l] = el; }}
                  className="mb-10"
                >
                  {/* Cabeçalho da letra */}
                  <div className="flex items-center gap-3 mb-4 scroll-mt-36">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl text-lg"
                      style={{ backgroundColor: 'var(--tp-dark)', color: '#FFB800', fontWeight: 700 }}>
                      {l}
                    </div>
                    <div className="flex-1 h-px" style={{ backgroundColor: 'var(--tp-border-subtle)' }} />
                    <span className="text-xs" style={{ color: 'var(--tp-text-4)' }}>
                      {porLetra[l]?.length} termo{porLetra[l]?.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                  {/* Termos da letra */}
                  <div className="space-y-2.5">
                    {porLetra[l]?.map(t => (
                      <TermoCard key={t.id} termo={t} expandido={expandido === t.id} onToggle={() => setExpandido(expandido === t.id ? null : t.id)} />
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Botão voltar ao topo */}
        <div className="flex justify-center pt-6 pb-10">
          <button
            onClick={scrollTop}
            className="flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm transition-all hover:-translate-y-0.5"
            style={{ borderColor: 'var(--tp-border)', color: 'var(--tp-text-3)' }}
          >
            <ArrowUp className="size-4" /> Voltar ao topo
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Card de termo (expansível)
───────────────────────────────────────────────────────────── */
function TermoCard({ termo, expandido, onToggle, highlight }: {
  termo: Termo;
  expandido: boolean;
  onToggle: () => void;
  highlight?: string;
}) {
  const cor = termo.categoria ? COR_CATEGORIA[termo.categoria] : { bg: '#F1F5F9', text: '#475569' };

  const marcaTexto = (texto: string) => {
    if (!highlight || highlight.length < 2) return texto;
    const re = new RegExp(`(${highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const partes = texto.split(re);
    return partes.map((p, i) =>
      re.test(p) ? <mark key={i} style={{ backgroundColor: 'rgba(255,184,0,0.3)', borderRadius: 3 }}>{p}</mark> : p
    );
  };

  return (
    <div
      className="rounded-[20px] overflow-hidden transition-all"
      style={{
        backgroundColor: 'var(--tp-surface)',
        border: expandido ? '1px solid rgba(255,184,0,0.35)' : '1px solid var(--tp-border-subtle)',
        boxShadow: expandido ? '0 4px 24px -4px rgba(255,184,0,0.1)' : 'none',
      }}
    >
      {/* Linha clicável */}
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-3 px-5 py-4 text-left group"
      >
        {/* Letra/sigla */}
        <div className="flex size-9 shrink-0 items-center justify-center rounded-xl text-xs"
          style={{ backgroundColor: cor.bg, color: cor.text, fontWeight: 700 }}>
          {termo.sigla?.slice(0, 4) || termo.termo[0]}
        </div>

        {/* Título */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm" style={{ color: 'var(--tp-text-1)', fontWeight: 600 }}>
              {marcaTexto(termo.termo)}
            </span>
            {termo.tesauro && (
              <span className="rounded-full px-2 py-0.5 text-xs"
                style={{ backgroundColor: 'rgba(0,212,255,0.1)', color: '#0891B2', fontWeight: 600 }}>
                {termo.tesauro}
              </span>
            )}
            {termo.categoria && (
              <span className="rounded-full px-2 py-0.5 text-xs hidden sm:inline"
                style={{ backgroundColor: cor.bg, color: cor.text }}>
                {termo.categoria}
              </span>
            )}
          </div>
          {/* Preview da definição — só quando fechado */}
          {!expandido && (
            <p className="text-xs mt-0.5 truncate" style={{ color: 'var(--tp-text-4)' }}>
              {termo.definicao}
            </p>
          )}
        </div>

        {/* Chevron */}
        <div className="shrink-0 transition-transform duration-200" style={{ transform: expandido ? 'rotate(90deg)' : 'none' }}>
          <ChevronRight className="size-4" style={{ color: 'var(--tp-text-4)' }} />
        </div>
      </button>

      {/* Expansão */}
      <AnimatePresence>
        {expandido && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 space-y-4" style={{ borderTop: '1px solid var(--tp-border-subtle)' }}>
              {/* Definição */}
              <div className="pt-4">
                <p className="text-sm leading-relaxed" style={{ color: 'var(--tp-text-2)' }}>
                  {marcaTexto(termo.definicao)}
                </p>
              </div>

              {/* Meta info */}
              <div className="flex flex-wrap gap-3">
                {termo.referencia && (
                  <div className="flex items-center gap-1.5 text-xs rounded-lg px-3 py-1.5"
                    style={{ backgroundColor: 'var(--tp-page)', color: 'var(--tp-text-3)' }}>
                    <Tag className="size-3 shrink-0" style={{ color: '#FFB800' }} />
                    <span>{termo.referencia}</span>
                  </div>
                )}
                {termo.tesauro && (
                  <div className="flex items-center gap-1.5 text-xs rounded-lg px-3 py-1.5"
                    style={{ backgroundColor: 'rgba(0,212,255,0.08)', color: '#0891B2' }}>
                    <Info className="size-3 shrink-0" />
                    <span>Tesauro: {termo.tesauro}</span>
                  </div>
                )}
              </div>

              {/* Ver também */}
              {termo.verTambem && termo.verTambem.length > 0 && (
                <div>
                  <span className="text-xs" style={{ color: 'var(--tp-text-4)' }}>Ver também: </span>
                  {termo.verTambem.map((vt, i) => (
                    <span key={vt}>
                      <span className="text-xs" style={{ color: '#2563EB', cursor: 'default' }}>{vt}</span>
                      {i < (termo.verTambem?.length ?? 0) - 1 && <span className="text-xs" style={{ color: 'var(--tp-text-4)' }}>, </span>}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
