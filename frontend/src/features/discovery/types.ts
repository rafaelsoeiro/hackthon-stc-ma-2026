export type SearchEntry = {
  id: string;
  title: string;
  description: string;
  route: string;
  domain: 'dados' | 'pessoas' | 'governo' | 'obras' | 'contratos' | 'programas';
  tags: string[];
};

export type GlossaryEntry = {
  term: string;
  definition: string;
  category: string;
};

export type DatasetEntry = {
  name: string;
  domain: string;
  cadence: string;
  format: 'CSV' | 'JSON' | 'API';
  status: 'Ativo' | 'Em revisao';
};
