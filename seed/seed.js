

import fs from 'fs';
import prisma from './prismaDb.js';


async function main() {
  // Read the exported data
  const data = JSON.parse(fs.readFileSync('exportedData.json', 'utf-8'));
  

  for (const problem of data.problems) {
    try {
        await prisma.problems.create({
            data: problem,
          });
    } catch (error) {
       console.log("Error seeding data -> ",error)
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });