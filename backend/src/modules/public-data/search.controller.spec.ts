import { Test, TestingModule } from '@nestjs/testing';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';

describe('SearchController', () => {
  let controller: SearchController;
  let service: {
    search: jest.Mock;
    summary: jest.Mock;
  };

  beforeEach(async () => {
    service = {
      search: jest.fn(),
      summary: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [SearchController],
      providers: [
        {
          provide: SearchService,
          useValue: service,
        },
      ],
    }).compile();

    controller = module.get<SearchController>(SearchController);
  });

  it('retorna busca unificada com filtros', async () => {
    const query = {
      q: 'hospital',
      types: 'obras,contratos',
      ano: 2026,
      municipio: 'Sao Luis',
      page: 1,
      pageSize: 10,
    };

    const response = {
      items: [{ id: 'obra-1', type: 'obras', title: 'Hospital Regional' }],
      meta: { page: 1, pageSize: 10, total: 1, totalPages: 1 },
      aggregations: { byType: [{ type: 'obras', count: 1 }] },
    };
    service.search.mockResolvedValue(response);

    await expect(controller.search(query)).resolves.toEqual(response);
    expect(service.search).toHaveBeenCalledWith(query);
  });

  it('retorna summary da busca para visualizacoes', async () => {
    const query = { q: 'educacao', types: 'despesas,receitas' };
    const response = {
      distribution: [{ category: 'despesas', value: 4, percent: 57 }],
      monthlySeries: [],
      highlights: [{ title: 'Despesa Educacao', type: 'despesas', score: 60 }],
    };
    service.summary.mockResolvedValue(response);

    await expect(controller.summary(query)).resolves.toEqual(response);
    expect(service.summary).toHaveBeenCalledWith(query);
  });
});
