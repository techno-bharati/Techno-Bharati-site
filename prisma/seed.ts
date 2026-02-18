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
      name: "Python Frontiers Admin",
      role: AdminRole.EVENT_ADMIN,
      eventType: EventType.PYTHON_FRONTIERS,
      department: Department.AIML,
    },
    {
      email: "bgmi.admin@technobharati.com",
      password: "bgmi@admin",
      name: "BGMI Admin",
      role: AdminRole.EVENT_ADMIN,
      eventType: EventType.BGMI,
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
    {
      email: "civil.admin@technobharati.com",
      password: "civil@admin",
      name: "Civil Department Admin",
      role: AdminRole.DEPARTMENT_ADMIN,
      department: Department.CIVIL,
    },
    {
      email: "civil.modelmaking@technobharati.com",
      password: "civil@modelmaking",
      name: "Civil Model Making Admin",
      role: AdminRole.EVENT_ADMIN,
      eventType: EventType.CE_MODEL_MAKING,
      department: Department.CIVIL,
    },
    {
      email: "civil.cadmaster@technobharati.com",
      password: "civil@cadmaster",
      name: "Civil CAD Master Admin",
      role: AdminRole.EVENT_ADMIN,
      eventType: EventType.CE_CAD_MASTER,
      department: Department.CIVIL,
    },
    {
      email: "civil.videography@technobharati.com",
      password: "civil@videography",
      name: "Civil Videography Admin",
      role: AdminRole.EVENT_ADMIN,
      eventType: EventType.CE_VIDEOGRAPHY,
      department: Department.CIVIL,
    },
    // CSE department admin and event admins
    {
      email: "cse.admin@technobharati.com",
      password: "cse@admin",
      name: "CSE Department Admin",
      role: AdminRole.DEPARTMENT_ADMIN,
      department: Department.CSE,
    },
    {
      email: "cse.codefusion@technobharati.com",
      password: "cse@codefusion",
      name: "CSE CODEFUSION Admin",
      role: AdminRole.EVENT_ADMIN,
      eventType: EventType.CSE_CODEFUSION,
      department: Department.CSE,
    },
    {
      email: "cse.projectexpo@technobharati.com",
      password: "cse@projectexpo",
      name: "CSE Project Expo Admin",
      role: AdminRole.EVENT_ADMIN,
      eventType: EventType.CSE_PROJECT_EXPO,
      department: Department.CSE,
    },
    {
      email: "cse.treasurehunt@technobharati.com",
      password: "cse@treasurehunt",
      name: "CSE Treasure Hunt Admin",
      role: AdminRole.EVENT_ADMIN,
      eventType: EventType.CSE_TREASURE_HUNT,
      department: Department.CSE,
    },
  ];

  for (const admin of admins) {
    await db.admin.upsert({
      where: { email: admin.email },
      update: {},
      create: admin,
    });
  }

  // Seed Event table: links each event type to its organizing department.
  // Used for filtering registrations by "event department" (e.g. AIML events),
  // not by the student's department field on Registration.
  const events: { eventType: EventType; department: Department }[] = [
    { eventType: EventType.STARTUP_SPHERE, department: Department.AIML },
    { eventType: EventType.FACE_TO_FACE, department: Department.AIML },
    { eventType: EventType.PYTHON_FRONTIERS, department: Department.AIML },
    { eventType: EventType.BGMI, department: Department.AIML },
    { eventType: EventType.AI_TALES, department: Department.AIML },
    {
      eventType: EventType.GE_TECHNO_SCIENCE_QUIZ,
      department: Department.GENERAL_ENGINEERING,
    },
    {
      eventType: EventType.GE_POSTER_COMPETITION,
      department: Department.GENERAL_ENGINEERING,
    },
    {
      eventType: EventType.GE_SCITECH_MODEL_EXPO,
      department: Department.GENERAL_ENGINEERING,
    },
    {
      eventType: EventType.GE_GAMES_BUNDLE,
      department: Department.GENERAL_ENGINEERING,
    },
    { eventType: EventType.CE_MODEL_MAKING, department: Department.CIVIL },
    { eventType: EventType.CE_CAD_MASTER, department: Department.CIVIL },
    { eventType: EventType.CE_VIDEOGRAPHY, department: Department.CIVIL },
    { eventType: EventType.CSE_CODEFUSION, department: Department.CSE },
    { eventType: EventType.CSE_PROJECT_EXPO, department: Department.CSE },
    { eventType: EventType.CSE_TREASURE_HUNT, department: Department.CSE },
    {
      eventType: "ENTC_PROJECT_EXPO" as unknown as EventType,
      department: Department.ENTC,
    },
    {
      eventType: "ENTC_DIGITAL_DANGAL" as unknown as EventType,
      department: Department.ENTC,
    },
    {
      eventType: "ENTC_SNAP_AND_SHINE" as unknown as EventType,
      department: Department.ENTC,
    },
    // Mechanical department events
    {
      eventType: EventType.MECH_PROJECT_EXPO,
      department: Department.MECHANICAL,
    },
    { eventType: EventType.MECH_JUNK_YARD, department: Department.MECHANICAL },
    {
      eventType: EventType.MECH_IPL_AUCTION,
      department: Department.MECHANICAL,
    },
  ];
  for (const ev of events) {
    await db.event.upsert({
      where: { eventType: ev.eventType },
      update: { department: ev.department },
      create: ev,
    });
  }

  await db.registration.createMany({
    data: [
      {
        collegeName: "Bharati Vidyapeeth College of Engineering, Kolhapur",
        eventType: EventType.STARTUP_SPHERE,
        paymentScreenshot:
          "https://res.cloudinary.com/dtxqfmc0h/image/upload/v1771329696/wgjs52apcz6xliwknobx.png",
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
        eventType: EventType.PYTHON_FRONTIERS,
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
        eventType: EventType.BGMI,
        paymentScreenshot: "https://example.com/seed/bgmi.png",
        amount: 200,
        paymentMode: "ONLINE",
        department: Department.AIML,
        class: "second year",
        studentName: "AIML BGMI Squad Leader",
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

  await db.registration.createMany({
    data: [
      {
        collegeName: "Bharati Vidyapeeth College of Engineering, Kolhapur",
        eventType: EventType.CE_MODEL_MAKING,
        paymentScreenshot: "https://example.com/seed/civil-model-making.png",
        amount: 100,
        paymentMode: "ONLINE",
        department: Department.CIVIL,
        class: "second year",
        studentName: "Civil Model Making Participant 1",
        contactNumber: "7777770001",
        email: "civil1@example.com",
      },
      {
        collegeName: "Bharati Vidyapeeth College of Engineering, Kolhapur",
        eventType: EventType.CE_CAD_MASTER,
        paymentScreenshot: "https://example.com/seed/civil-cad-master.png",
        amount: 100,
        paymentMode: "ONLINE",
        department: Department.CIVIL,
        class: "third year",
        studentName: "Civil CAD Master Participant 1",
        contactNumber: "7777770002",
        email: "civil2@example.com",
      },
      {
        collegeName: "Bharati Vidyapeeth College of Engineering, Kolhapur",
        eventType: EventType.CE_VIDEOGRAPHY,
        paymentScreenshot: "https://example.com/seed/civil-videography.png",
        amount: 100,
        paymentMode: "OFFLINE",
        department: Department.CIVIL,
        class: "first year",
        studentName: "Civil Videography Participant 1",
        contactNumber: "7777770003",
        email: "civil3@example.com",
      },
    ],
  });

  // Seed sample registrations for CSE department events
  await db.registration.createMany({
    data: [
      {
        collegeName: "Bharati Vidyapeeth College of Engineering, Kolhapur",
        eventType: EventType.CSE_CODEFUSION,
        paymentScreenshot: "https://example.com/seed/cse-codefusion.png",
        amount: 100,
        paymentMode: "ONLINE",
        department: Department.CSE,
        class: "second year",
        studentName: "CSE CODEFUSION Participant 1",
        contactNumber: "6666660001",
        email: "cse1@example.com",
      },
      {
        collegeName: "Bharati Vidyapeeth College of Engineering, Kolhapur",
        eventType: EventType.CSE_PROJECT_EXPO,
        paymentScreenshot: "https://example.com/seed/cse-project-expo.png",
        amount: 100,
        paymentMode: "ONLINE",
        department: Department.CSE,
        class: "third year",
        studentName: "CSE Project Expo Participant 1",
        contactNumber: "6666660002",
        email: "cse2@example.com",
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
