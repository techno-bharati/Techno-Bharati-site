import {
  PrismaClient,
  AdminRole,
  EventType,
  Department,
} from "@/prisma/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const db = new PrismaClient({ adapter });

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
      department: Department.AIML,
    },
    // Event-specific admin example for Startup Sphere
    {
      email: "startup.admin@technobharati.com",
      password: "startup@admin",
      name: "Startup Sphere Admin",
      role: AdminRole.EVENT_ADMIN,
      eventType: EventType.STARTUP_SPHERE,
      department: Department.AIML,
    },
    // AIML department event admins
    {
      email: "facetoface.admin@technobharati.com",
      password: "facetoface@admin",
      name: "Face To Face Admin",
      role: AdminRole.EVENT_ADMIN,
      eventType: EventType.FACE_TO_FACE,
      department: Department.AIML,
    },
    {
      email: "pythonwarriors.admin@technobharati.com",
      password: "python@admin",
      name: "Python Warriors Admin",
      role: AdminRole.EVENT_ADMIN,
      eventType: EventType.PYTHON_WARRIORS,
      department: Department.AIML,
    },
    {
      email: "freefire.admin@technobharati.com",
      password: "freefire@admin",
      name: "FreeFire Battleship Admin",
      role: AdminRole.EVENT_ADMIN,
      eventType: EventType.FREEFIRE_BATTLESHIP,
      department: Department.AIML,
    },
    {
      email: "aitales.admin@technobharati.com",
      password: "aitales@admin",
      name: "AI Tales Admin",
      role: AdminRole.EVENT_ADMIN,
      eventType: EventType.AI_TALES,
      department: Department.AIML,
    },
    // General Engineering department event admins
    {
      email: "ge.technoquiz@technobharati.com",
      password: "ge@technoquiz",
      name: "GE Techno Science Quiz Admin",
      role: AdminRole.EVENT_ADMIN,
      eventType: EventType.GE_TECHNO_SCIENCE_QUIZ,
      department: Department.GENERAL_ENGINEERING,
    },
    {
      email: "ge.poster@technobharati.com",
      password: "ge@poster",
      name: "GE Poster Competition Admin",
      role: AdminRole.EVENT_ADMIN,
      eventType: EventType.GE_POSTER_COMPETITION,
      department: Department.GENERAL_ENGINEERING,
    },
    {
      email: "ge.scitech@technobharati.com",
      password: "ge@scitech",
      name: "GE SciTech Model Expo Admin",
      role: AdminRole.EVENT_ADMIN,
      eventType: EventType.GE_SCITECH_MODEL_EXPO,
      department: Department.GENERAL_ENGINEERING,
    },
    {
      email: "ge.games@technobharati.com",
      password: "ge@games",
      name: "GE Games Bundle Admin",
      role: AdminRole.EVENT_ADMIN,
      eventType: EventType.GE_GAMES_BUNDLE,
      department: Department.GENERAL_ENGINEERING,
    },
  ];

  for (const admin of admins) {
    await db.admin.upsert({
      where: { email: admin.email },
      update: {},
      create: admin,
    });
  }

  // Seed sample registrations for AIML department events
  await db.registration.createMany({
    data: [
      {
        collegeName: "Bharati Vidyapeeth College of Engineering, Kolhapur",
        eventType: EventType.STARTUP_SPHERE,
        paymentScreenshot: "https://example.com/seed/startup-sphere.png",
        amount: 500,
        paymentMode: "ONLINE",
        department: Department.AIML,
        class: "second year",
        studentName: "AIML Seed Participant 1",
        contactNumber: "9999990001",
        email: "aiml1@example.com",
      },
      {
        collegeName: "Bharati Vidyapeeth College of Engineering, Kolhapur",
        eventType: EventType.FACE_TO_FACE,
        paymentScreenshot: "https://example.com/seed/face-to-face.png",
        amount: 100,
        paymentMode: "ONLINE",
        department: Department.AIML,
        class: "first year",
        studentName: "AIML Seed Participant 2",
        contactNumber: "9999990002",
        email: "aiml2@example.com",
      },
      {
        collegeName: "Bharati Vidyapeeth College of Engineering, Kolhapur",
        eventType: EventType.PYTHON_WARRIORS,
        paymentScreenshot: "https://example.com/seed/python-warriors.png",
        amount: 100,
        paymentMode: "OFFLINE",
        department: Department.AIML,
        class: "third year",
        studentName: "AIML Seed Participant 3",
        contactNumber: "9999990003",
        email: "aiml3@example.com",
      },
      {
        collegeName: "Bharati Vidyapeeth College of Engineering, Kolhapur",
        eventType: EventType.FREEFIRE_BATTLESHIP,
        paymentScreenshot: "https://example.com/seed/freefire.png",
        amount: 200,
        paymentMode: "ONLINE",
        department: Department.AIML,
        class: "second year",
        studentName: "AIML Squad Leader",
        contactNumber: "9999990004",
        email: "aiml4@example.com",
      },
      {
        collegeName: "Bharati Vidyapeeth College of Engineering, Kolhapur",
        eventType: EventType.AI_TALES,
        paymentScreenshot: "https://example.com/seed/ai-tales.png",
        amount: 100,
        paymentMode: "OFFLINE",
        department: Department.AIML,
        class: "final year",
        studentName: "AIML Seed Participant 5",
        contactNumber: "9999990005",
        email: "aiml5@example.com",
      },
    ],
  });

  // Seed sample registrations for General Engineering department events
  await db.registration.createMany({
    data: [
      {
        collegeName: "Bharati Vidyapeeth College of Engineering, Kolhapur",
        eventType: EventType.GE_TECHNO_SCIENCE_QUIZ,
        paymentScreenshot: "https://example.com/seed/ge-techno-quiz.png",
        amount: 100,
        paymentMode: "ONLINE",
        department: Department.GENERAL_ENGINEERING,
        class: "first year",
        studentName: "GE Seed Participant 1",
        contactNumber: "8888880001",
        email: "ge1@example.com",
      },
      {
        collegeName: "Bharati Vidyapeeth College of Engineering, Kolhapur",
        eventType: EventType.GE_POSTER_COMPETITION,
        paymentScreenshot: "https://example.com/seed/ge-poster.png",
        amount: 100,
        paymentMode: "ONLINE",
        department: Department.GENERAL_ENGINEERING,
        class: "second year",
        studentName: "GE Seed Participant 2",
        contactNumber: "8888880002",
        email: "ge2@example.com",
      },
      {
        collegeName: "Bharati Vidyapeeth College of Engineering, Kolhapur",
        eventType: EventType.GE_SCITECH_MODEL_EXPO,
        paymentScreenshot: "https://example.com/seed/ge-scitech.png",
        amount: 100,
        paymentMode: "OFFLINE",
        department: Department.GENERAL_ENGINEERING,
        class: "second year",
        studentName: "GE Seed Participant 3",
        contactNumber: "8888880003",
        email: "ge3@example.com",
      },
      {
        collegeName: "Bharati Vidyapeeth College of Engineering, Kolhapur",
        eventType: EventType.GE_GAMES_BUNDLE,
        paymentScreenshot: "https://example.com/seed/ge-games.png",
        amount: 150,
        paymentMode: "ONLINE",
        department: Department.GENERAL_ENGINEERING,
        class: "first year",
        studentName: "GE Games Group Leader",
        contactNumber: "8888880004",
        email: "ge4@example.com",
        notes: "Seed: GE Games bundle registration",
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
