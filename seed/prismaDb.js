import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

// Initialize a variable to hold the global instance of Prisma
const globalForPrisma = globalThis; // No type declaration needed in JS

// Check if prisma already exists in global scope, otherwise create a new instance
const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

// Export the prisma instance
export default prisma;

// Assign the prisma instance to global only if not in production
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
