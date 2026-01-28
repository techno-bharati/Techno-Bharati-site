import { PrismaClient, AdminRole, EventType } from "@/prisma/generated/prisma/client";
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL
})

const db = new PrismaClient({adapter})

// const db = new PrismaClient();

async function main() {
  const admins = [
    // Global super admin with access to all registrations
    {
      email: "super.admin@technobharati.com",
      password: "super@admin",
      name: "Super Admin",
      role: AdminRole.SUPER_ADMIN,
    },
    // Department-level super admin for CSE (AIML)
    {
      email: "aiml.admin@technobharati.com",
      password: "aiml@admin",
      name: "AIML Department Admin",
      role: AdminRole.DEPARTMENT_ADMIN,
      department: "CSE (AIML)",
    },
    // Event-specific admin example for Startup Sphere
    {
      email: "startup.admin@technobharati.com",
      password: "startup@admin",
      name: "Startup Sphere Admin",
      role: AdminRole.EVENT_ADMIN,
      eventType: EventType.STARTUP_SPHERE,
      department: "CSE (AIML)",
    },
  ];

  for (const admin of admins) {
    await db.admin.upsert({
      where: { email: admin.email },
      update: {},
      create: admin
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
