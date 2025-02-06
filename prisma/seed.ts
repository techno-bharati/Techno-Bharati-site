const { PrismaClient, AdminRole } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const db = new PrismaClient();

async function main() {
  const defaultPassword = await bcrypt.hash(process.env.JWT_SECRET!, 10);

  const admins = [
    {
      email: "admin@technobharati.com",
      password: "admin@super",
      name: "Super Admin",
      role: AdminRole.SUPER_ADMIN,
      eventType: null,
    },
    {
      email: "startup@technobharati.com",
      password: "admin@startup",
      name: "Startup Admin",
      role: AdminRole.EVENT_ADMIN,
      eventType: "STARTUP_SPHERE",
    },
    {
      email: "face@technobharati.com",
      password: "admin@f2f",
      name: "Face to Face Admin",
      role: AdminRole.EVENT_ADMIN,
      eventType: "FACE_TO_FACE",
    },
    {
      email: "python@technobharati.com",
      password: "admin@python",
      name: "Python Admin",
      role: AdminRole.EVENT_ADMIN,
      eventType: "PYTHON_WARRIORS",
    },
    {
      email: "fire@technobharati.com",
      password: "admin@freefire",
      name: "FireFire Admin",
      role: AdminRole.EVENT_ADMIN,
      eventType: "FREEFIRE_BATTLESHIP",
    },
    {
      email: "ai@technobharati.com",
      password: "admin@ai",
      name: "AI Admin",
      role: AdminRole.EVENT_ADMIN,
      eventType: "AI_TALES",
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
