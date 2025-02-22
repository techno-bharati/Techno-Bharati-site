type EventFee = {
  amount: number;
  type: "per person" | "per team";
} & (
  | {
      baseAmount: number;
      additionalMemberFee: number;
    }
  | {}
);

export const EVENT_FEES: Record<string, EventFee> = {
  STARTUP_SPHERE: {
    amount: 100,
    type: "per person",
    baseAmount: 100,
    additionalMemberFee: 100,
  },
  FACE_TO_FACE: {
    amount: 100,
    type: "per person",
  },
  PYTHON_WARRIORS: {
    amount: 100,
    type: "per person",
  },
  FREEFIRE_BATTLESHIP: {
    amount: 200,
    type: "per team",
  },
  AI_TALES: {
    amount: 100,
    type: "per person",
  },
} as const;

export const events = [
  {
    id: 1,
    name: "Startup Sphere",
    date: "28th Feb 2025",
    time: "10:00 AM - 12:00 PM",
    venue: "Bharati Vidyapeeth College of Engineering, Kolahpur",
    entryFee: `${EVENT_FEES.STARTUP_SPHERE.amount} (per person)`,
    type: EVENT_FEES.STARTUP_SPHERE.type,
    modalData: {
      eventName: "Startup Sphere",
      description:
        "Startup Sphere: Where Ideas Take Flight! Step into the spotlight and pitch your groundbreaking startup idea or showcase your innovative project. Choose between two exciting categories: Project Expo (one round) or Startup-sphere (two rounds). Present your ideas to industry professionals and compete for recognition!",
      rules: [
        "Category 1: Project Expo",
        "1. The Project Expo will have only one round.",
        "2. The registration fees for this event will be 100 per participant.",
        "3. For team's min-3 & max-5 members are allowed.",
        "4. Round Structure:",
        "   • Conducted by: Teachers and student coordinators.",
        "   • Duration: 5 minutes per team.",
        "   • Selection Process:",
        "     ○ In Project Expo, judging will be done by invited guests and teachers.",
        "5. All participants must adhere to the given time limits.",
        "6. The presentation should be clear, concise, and well-structured.",
        "7. Strictly no plagiarism – all content must be original.",
        "8. Participants are encouraged to use visuals and data points for better clarity.",
        "",
        "Category 2: Startup-sphere",
        "1. The Startup-sphere will have two rounds.",
        "2. The registration fees for this event will be 100 per participant.",
        "3. Participants must prepare one presentation that will be used for both rounds. However, they will present only 5 slides in the first round and the full presentation in the second round.",
        "4. First Round Structure:",
        "   • Conducted by: Teachers and student co-ordinates.",
        "   • Duration: 5 min per team.",
        "   • Judging Criteria:",
        "     ○ Problem Statement",
        "     ○ Business Model",
        "     ○ Market Potential & Target Audience",
        "     ○ Competitive Advantage",
        "     ○ Scalability & Future Plans",
        "   • Selection Process:",
        "     ○ Teachers and students co-ordinators will decide which teams qualify for the second round.",
        "5. Second Round Structure:",
        "   • Conducted by: Judges (professionals from IT industries)",
        "   • Duration: 10 minutes per team.",
        "   • Slides Allowed: Full presentation as per the template.",
        "   • Winner Selection:",
        "     ○ Judges will decide the winners based on overall presentation quality, clarity and feasibility of the idea.",
        "6. Presentation Template:",
        "   a) Title Slide – Project Name, Team Members, Institution",
        "   b) Problem Statement – Clearly define the issue being addressed.",
        "   c) Business Model – Revenue streams and monetization strategy.",
        "   d) Market Potential & Target Audience – Identify the market size and key audience.",
        "   e) Competitive Advantage – How is the idea unique from existing solutions?",
        "   f) Scalability & Future Plans – Plans for growth and expansion.",
        "   g) Technology Stack (if applicable) – Tools, frameworks, and technology used.",
        "   h) Implementation Plan – Roadmap for execution.",
        "   i) Conclusion & Call to Action – Summary and next steps.",
        "7. All participants must adhere to the given time limits.",
        "8. The presentation should be clear, concise, and well-structured.",
        "9. Strictly no plagiarism – all content must be original.",
        "10. Participants are encouraged to use visuals and data points for better clarity.",
      ],
      registration: [
        "Participants must register before the deadline: 27th February 2025, 5:00 PM.",
        "Spot registrations are allowed until 28th February 2025, 11:00 AM on the event day.",
        "Entry fee: ₹100 (per person)",
        "Participants must provide a valid email ID and contact number during registration.",
        "Late registrations will not be entertained after the cutoff time.",
      ],
      queries: {
        "jayesh jadhav": "9370964521",
        "ajinkya monde": "7487984288",
        "rakesh telang": "9075805070",
      },
    },
  },
  {
    id: 2,
    name: "Face To Face",
    date: "28th Feb 2025",
    time: "9:00 AM - 6:00 PM",
    venue: "Bharati Vidyapeeth College of Engineering, Kolahpur",
    entryFee: `${EVENT_FEES.FACE_TO_FACE.amount} (per person)`,
    type: EVENT_FEES.FACE_TO_FACE.type,
    modalData: {
      eventName: "Face To Face",
      description:
        "The AIML Department of Bharati Vidyapeeth's College of Engineering, Kolhapur presents Face to Face, an engaging competition as part of Techno Bharti 2025- Infusion AI! ",
      rules: [
        "Time Limit - Each participant gets 2 minutes to speak.",
        "Topic Announcement - The GD topic will be given at the time of discussion.",
        "No Interruptions - Participants must wait for their turn to speak.",
        "Judging Criteria - Evaluation will be based on clarity, confidence, and logical reasoning.",
        "Respect & Fair Play - No personal attacks; maintain professionalism.",
        "Judges' Decision - The decision will be final and binding.",
      ],
      registration: [
        "Participants must register before the deadline: 27th February 2025, 5:00 PM.",
        "Individual entries only. Team participation is not allowed.",
        "Spot registrations are allowed until 28th February 2025, 11:00 AM on the event day.",
        "Entry fee: ₹100 (per person)",
        "Participants must provide a valid email ID and contact number during registration.",
        "Late registrations will not be entertained after the cutoff time. ",
      ],
      queries: {
        "shahid shaikh": "8484877820",
        "kaif nadaf": "7774073477",
      },
    },
  },
  {
    id: 3,
    name: "Python Warriors: Code. Battle. Conquer!",
    date: "28th Feb 2025",
    time: "2:00 PM - 5:00 PM",
    venue: "Bharati Vidyapeeth College of Engineering, Kolahpur",
    entryFee: `${EVENT_FEES.PYTHON_WARRIORS.amount} (per person)`,
    type: EVENT_FEES.PYTHON_WARRIORS.type,
    modalData: {
      eventName: "Python Warriors",
      description:
        "A high-intensity inter-college coding battle designed to push your Python skills to the limit. Solve real-world challenges, optimize your code, and prove your supremacy in the coding arena!",
      rules: [
        "Solve 60 MCQs in 60 minutes, requiring at least 75% correct to qualify.",
        "Coding: Solve 2 problem in 1 hour 10 minutes.",
      ],
      registration: [
        "Participants must register before the deadline: 27th February 2025, 5:00 PM.",
        "Individual entries only. Team participation is not allowed.",
        "Spot registrations are allowed until 28th February 2025, 11:00 AM on the event day.",
        "Entry fee: ₹100 (per person)",
        "Participants must provide a valid email ID and contact number during registration.",
        "Late registrations will not be entertained after the cutoff time.",
      ],
      queries: {
        "affan tamboli": "9970951468",
        "abhay patil ": "8625955188",
      },
    },
  },
  {
    id: 4,
    name: "FreeFire",
    date: "28th Feb 2025",
    time: "11:00 AM - 3:00 PM",
    venue: "Bharati Vidyapeeth College of Engineering, Kolahpur",
    entryFee: `${EVENT_FEES.FREEFIRE_BATTLESHIP.amount} (per team)`,
    type: EVENT_FEES.FREEFIRE_BATTLESHIP.type,
    modalData: {
      eventName: "FreeFire",
      description:
        "Welcome to the ultimate Free Fire Battle Ship Squad Tournament! Get ready to showcase your skills, strategy, and teamwork in an intense no gun attributes battle. Compete against top squads and fight for glory and exciting rewards!",
      rules: [
        "Only registered players are allowed to participate.",
        "Players must join the custom room within the given time; late entries will not be allowed.",
        "Internet issues are the player's responsibility. Matches will not be restarted due to disconnections.",
        "Use of emulators, hacks, or third-party software is strictly prohibited and will lead to an instant ban.",
      ],
      registration: [
        "Participants must register before the deadline: 27th February 2025, 5:00 PM.",
        "Spot registrations are allowed until 28th February 2025, 11:00 AM on the event day.",
        "Entry fee: ₹200 (per team)",
        "Participants must provide a valid email ID and contact number during registration.",
        "Late registrations will not be entertained after the cutoff time.",
        "Registration Format:",
        "🔹 Player Name",
        "🔹 Free Fire ID",
        "🔹 Squad Name (if applicable)",
        "🔹 Contact Number",
      ],
      queries: {
        "om kurlekar": "9503656220",
        "aniket patil": "9860501427",
      },
    },
  },
  {
    id: 5,
    name: "AI Tales: Animate Your Imagination!",
    date: "28th Feb 2025",
    time: "7:00 PM - 10:00 PM",
    venue: "Bharati Vidyapeeth College of Engineering, Kolahpur",
    entryFee: `${EVENT_FEES.AI_TALES.amount} (per person)`,
    type: EVENT_FEES.AI_TALES.type,
    modalData: {
      eventName: "AI Tales: Animate Your Imagination!",
      description:
        "AI TALES is an innovative storytelling competition where creativity meets technology! Participants will harness the power of AI to craft engaging animated videos based on given topics within a set time limit. The event challenges storytellers, designers, and tech enthusiasts to push their creative boundaries and bring their ideas to life through AI-driven animation. Whether you're a beginner or an experienced creator, AI TALES offers a platform to showcase your storytelling skills in a dynamic and futuristic way. Get ready to transform imagination into reality—one AI-generated tale at a time!",
      rules: [
        "Challenge Details: Participants will receive an on-the-spot topic and will have 1 hour to create a video.",
        "Tools Allowed: InVideo, Pictory, or any other similar tools.",
        "Format: The final video must be submitted in MP4 format only.",
        "Submission Deadline: Submissions must be made within the allocated time. Late entries will not be considered.",
        "Original Content: All content must be original and free from plagiarism or copyright violations.",
        "AI Tool Usage: Manipulation of AI tools beyond permissible limits will result in disqualification.",
        "Participant Equipment: Participants must use their own laptops for the challenge.",
      ],
      registration: [
        "Participants must register before the deadline: 27th February 2025, 5:00 PM.",
        "Individual entries only. Team participation is not allowed.",
        "Spot registrations are allowed until 28th February 2025, 11:00 AM on the event day.",
        "Entry fee: ₹100 (per person)",
        "Participants must provide a valid email ID and contact number during registration.",
        "Late registrations will not be entertained after the cutoff time.",
      ],
      queries: {
        "anurag patole": "7058503010",
        "prajwal gujare": "7276298205",
      },
    },
  },
];

export const calculateEventFee = (
  eventType: keyof typeof EVENT_FEES,
  numberOfMembers?: number
) => {
  const eventFee = EVENT_FEES[eventType];

  if (
    eventType === "STARTUP_SPHERE" &&
    numberOfMembers &&
    "baseAmount" in eventFee
  ) {
    return (
      eventFee.baseAmount + (numberOfMembers - 1) * eventFee.additionalMemberFee
    );
  }

  return eventFee.amount;
};

export const getEventFeeByName = (eventName: string, teamSize?: number) => {
  const eventMap = {
    "Startup Sphere": "STARTUP_SPHERE",
    "Face To Face": "FACE_TO_FACE",
    "Python Worriors": "PYTHON_WARRIORS",
    "FreeFire Battleship": "FREEFIRE_BATTLESHIP",
    "AI Tales": "AI_TALES",
  } as const;

  const eventType = eventMap[eventName as keyof typeof eventMap];
  if (!eventType) return null;

  return calculateEventFee(eventType, teamSize);
};

export const eventImages = [
  "/event/event-1.jpeg",
  "/event/event-2.jpeg",
  "/event/event-3.jpeg",
  "/event/event-4.jpeg",
  "/event/event-5.jpeg",
  "/event/event-6.jpeg",
  "/event/event-7.jpeg",
  "/event/event-8.jpeg",
  "/event/event-9.jpeg",
  "/event/event-10.jpeg",
  "/event/event-11.jpeg",
];
