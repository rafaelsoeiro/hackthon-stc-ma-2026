import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client';
import { seedBase } from './seeds/01-unidades';
import { seedDespesas } from './seeds/02-despesas';
import { seedReceitas } from './seeds/03-receitas';
import { seedContratos } from './seeds/04-contratos';
import { seedTransferencias } from './seeds/05-transferencias';
import { seedServidoresRemuneracoes } from './seeds/06-servidores-remuneracoes';
import { seedLicitacoes } from './seeds/07-licitacoes';
import { seedObras } from './seeds/08-obras';
import { seedEmendas } from './seeds/09-emendas';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL nao definido no ambiente.');
}

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function resetSeedTables(): Promise<void> {
  await prisma.obra.deleteMany();
  await prisma.remuneracao.deleteMany();
  await prisma.emendaParlamentar.deleteMany();
  await prisma.licitacao.deleteMany();
  await prisma.contrato.deleteMany();
  await prisma.transferencia.deleteMany();
  await prisma.receita.deleteMany();
  await prisma.despesa.deleteMany();
  await prisma.servidor.deleteMany();
  await prisma.tipoContratacao.deleteMany();
  await prisma.credor.deleteMany();
  await prisma.unidadeGestora.deleteMany();
}

async function main(): Promise<void> {
  console.log('Iniciando seed...');

  await resetSeedTables();
  await seedBase(prisma);
  await seedDespesas(prisma);
  await seedReceitas(prisma);
  await seedTransferencias(prisma);
  await seedServidoresRemuneracoes(prisma);
  await seedLicitacoes(prisma);
  await seedContratos(prisma);
  await seedObras(prisma);
  await seedEmendas(prisma);

  const [
    unidades,
    credores,
    tipos,
    despesas,
    receitas,
    transferencias,
    servidores,
    remuneracoes,
    licitacoes,
    contratos,
    obras,
    emendas,
  ] = await Promise.all([
    prisma.unidadeGestora.count(),
    prisma.credor.count(),
    prisma.tipoContratacao.count(),
    prisma.despesa.count(),
    prisma.receita.count(),
    prisma.transferencia.count(),
    prisma.servidor.count(),
    prisma.remuneracao.count(),
    prisma.licitacao.count(),
    prisma.contrato.count(),
    prisma.obra.count(),
    prisma.emendaParlamentar.count(),
  ]);

  console.log('Seed concluido com sucesso.');
  console.log({
    unidades,
    credores,
    tipos,
    despesas,
    receitas,
    transferencias,
    servidores,
    remuneracoes,
    licitacoes,
    contratos,
    obras,
    emendas,
  });
}

main()
  .catch((error) => {
    console.error('Falha no seed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
