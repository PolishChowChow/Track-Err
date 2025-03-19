import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.structures.createMany({
    data: [
      { type: 'workstation', name: 'LP1' },
      { type: 'workstation', name: 'LP2' },
      { type: 'table', name: 't101' },
      { type: 'table', name: 't102' },
      { type: 'table', name: 't301' },
      { type: 'table', name: 't302' },
      { type: 'table', name: 't303' },
      { type: 'table', name: 't304' },
      { type: 'table', name: 't50' },
      { type: 'table', name: 't60' },
      { type: 'robot', name: 'r01' },
      { type: 'robot', name: 'r02' },
      { type: 'robot', name: 'r03' },
      { type: 'robot', name: 'r04' },
      { type: 'robot', name: 'r05' },
      { type: 'robot', name: 'r06' },
      { type: 'robot', name: 'r07' },
      { type: 'robot', name: 'r08' },
      { type: 'robot', name: 'r09' },
      { type: 'robot', name: 'r10' },
      { type: 'robot', name: 'r11' },
      { type: 'reference', name: 'MPDB' },
      { type: 'reference', name: 'ICE' },
      { type: 'reference', name: 'PROTOTYPE' },
      { type: 'mountingStation', name: 'm1' },
      { type: 'mountingStation', name: 'm2' },
    ],
  });

  console.log('Seed data inserted');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
