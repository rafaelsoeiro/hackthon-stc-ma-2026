import { Injectable } from '@nestjs/common';

@Injectable()
export class TransparencyService {
  /**
   * Busca dados técnicos do portal da transparência para dar contexto à IA.
   * Em um sistema real, isso chamaria as APIs do Estado (SEFAZ, STC, etc).
   */
  async getContextoParaIA(pergunta: string, assunto?: string): Promise<any> {
    // Retorna dados mockados com base em palavras-chave da pergunta ou assunto
    const query = (pergunta + ' ' + (assunto || '')).toLowerCase();

    if (query.includes('saúde') || query.includes('saude')) {
      return {
        fonte: 'Portal da Transparência MA - Despesas Saúde 2024',
        dadosTecnicos: [
          {
            orgao: 'Secretaria de Estado da Saúde - SES',
            valor_empenhado: 'R$ 4.250.000,00',
            valor_liquidado: 'R$ 3.800.000,00',
            valor_pago: 'R$ 3.500.000,00',
            descricao_despesa: 'Manutenção de leitos de UTI e compra de insumos hospitalares.',
          },
        ],
      };
    }

    if (query.includes('obra') || query.includes('infraestrutura')) {
      return {
        fonte: 'Painel de Obras SINFRA-MA',
        dadosTecnicos: [
          {
            projeto: 'Revitalização da MA-201',
            status: 'Em andamento',
            orcamento_total: 'R$ 15.000.000,00',
            valor_medido_pago: 'R$ 8.500.000,00',
            previsao_conclusao: 'Dezembro de 2024',
          },
        ],
      };
    }

    if (query.includes('pessoal') || query.includes('salário') || query.includes('salario')) {
      return {
        fonte: 'Portal da Transparência MA - Folha de Pagamento',
        dadosTecnicos: [
          {
            mes_referencia: 'Março/2024',
            total_servidores_ativos: 85400,
            total_folha_bruta: 'R$ 850.000.000,00',
            impacto_rcl: '42,5% (Abaixo do limite prudencial da LRF)',
          },
        ],
      };
    }

    // Default genérico
    return {
      fonte: 'Diário Oficial e Portal da Transparência MA',
      dadosTecnicos: [
        {
          mensagem: 'Dados gerais do estado',
          receita_corrente_liquida_anual: 'R$ 22.000.000.000,00',
          nota_capag: 'A (Boa situação fiscal)',
        },
      ],
    };
  }
}
