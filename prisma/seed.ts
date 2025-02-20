const { PrismaClient, AdminRole } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const db = new PrismaClient();

async function main() {
  const defaultPassword = await bcrypt.hash(process.env.JWT_SECRET!, 10);

  const admins = [
    {
      email: "jjadhav799@gmail.com",
      password: "j@jadhav",
      name: "Jayesh Jadhav",
      role: AdminRole.EVENT_ADMIN,
      eventType: "STARTUP_SPHERE",
    },
  ];

  for (const admin of admins) {
    await db.admin.upsert({
      where: { email: admin.email },
      update: {},
      create: admin,
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
