import { Test, TestingModule } from '@nestjs/testing';
import { ContratosController } from './contratos.controller';
import { ContratosService } from './contratos.service';

describe('ContratosController', () => {
  let controller: ContratosController;
  let service: {
    list: jest.Mock;
    summary: jest.Mock;
    guidedSearch: jest.Mock;
  };

  beforeEach(async () => {
    service = {
      list: jest.fn(),
      summary: jest.fn(),
      guidedSearch: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContratosController],
      providers: [
        {
          provide: ContratosService,
          useValue: service,
        },
      ],
    }).compile();

    controller = module.get<ContratosController>(ContratosController);
  });

  it('lista contratos com filtros principais', async () => {
    const query = {
      q: 'saude',
      tipo: 'Licitacao',
      ano: 2026,
      valorMax: 1000000,
      page: 1,
      pageSize: 20,
    };
    const response = {
      items: [{ id: 1, objeto: 'Contrato de saude' }],
      meta: { page: 1, pageSize: 20, total: 1, totalPages: 1 },
      totals: { contratosAtivos: 1 },
    };
    service.list.mockResolvedValue(response);

    await expect(controller.list(query)).resolves.toEqual(response);
    expect(service.list).toHaveBeenCalledWith(query);
  });

  it('retorna summary de contratos para KPI', async () => {
    const summary = {
      valorTotalContratado: 1000000,
      contratosAtivos: 10,
      percentualComLicitacao: 80,
      fornecedoresUnicos: 8,
      distribuicaoPorTipo: [{ tipo: 'Licitacao', quantidade: 7 }],
    };
    service.summary.mockResolvedValue(summary);

    await expect(controller.summary()).resolves.toEqual(summary);
    expect(service.summary).toHaveBeenCalledTimes(1);
  });

  it('executa guided search com os filtros recebidos', async () => {
    const query = { area: 'Saude', valorMin: 1000, valorMax: 50000 };
    const response = {
      items: [],
      meta: { page: 1, pageSize: 20, total: 0, totalPages: 1 },
    };
    service.guidedSearch.mockResolvedValue(response);

    await expect(controller.guidedSearch(query)).resolves.toEqual(response);
    expect(service.guidedSearch).toHaveBeenCalledWith(query);
  });
});
