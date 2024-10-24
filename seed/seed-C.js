
import fs from 'fs';
import prisma from './prismaDb.js';

async function main() {
  // Read the exported data
  const contestData = JSON.parse(fs.readFileSync('contestDataExported.json', 'utf-8'));

  try {
    // Remove all existing contest data
    await prisma.contest.deleteMany({});
    console.log("Previous contest data removed.");
  } catch (error) {
    console.error("Error removing previous contest data ->", error);
  }

  let lastStartTime = new Date(); // Initialize the start time for the first contest (current time)

  for (const contest of contestData.contests) {
    try {
      // Check if a contest with the same name already exists
      const existingContest = await prisma.contest.findUnique({
        where: { name: contest.name },
      });

      if (existingContest) {
        console.log(`Contest ${contest.name} already exists. Skipping insertion.`);
        continue; // Skip this contest
      }

      console.log("Inserting contest:", contest);

      // Convert start time to Indian Standard Time by adding 5 hours and 30 minutes
      const istStartTime = new Date(lastStartTime.getTime() + (5 * 60 + 30) * 60 * 1000);

      await prisma.contest.create({
        data: {
          name: contest.name,
          problemsId: contest.problemsId,
          score: contest.score,
          startTime: istStartTime, // Set IST startTime
        },
      });

      console.log(`Contest ${contest.name} seeded successfully.`);

      // Add 2 hours to the last start time for the next contest
      lastStartTime = new Date(lastStartTime.getTime() + 2 * 60 * 60 * 1000); // Add 2 hours (in milliseconds)

    } catch (error) {
      console.error("Error seeding contest data for", contest.name, "->", error);
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
