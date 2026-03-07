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
  PYTHON_FRONTIERS: {
    amount: 100,
    type: "per person",
  },
  BGMI: {
    amount: 200,
    type: "per team",
  },
  FREEFIRE: {
    amount: 100,
    type: "per team",
  },
  AI_TALES: {
    amount: 100,
    type: "per person",
  },
  // ENTC department
  ENTC_PROJECT_EXPO: {
    amount: 100,
    type: "per person",
  },
  ENTC_DIGITAL_DANGAL: {
    amount: 100,
    type: "per person",
  },
  ENTC_SNAP_AND_SHINE: {
    amount: 100,
    type: "per person",
  },
  // Civil Engineering department
  CE_MODEL_MAKING: {
    amount: 100,
    type: "per person",
  },
  CE_BATTLE_OF_BRAINS: {
    amount: 100,
    type: "per person",
  },
  CE_CAD_MASTER: {
    amount: 100,
    type: "per person",
  },
  CE_VIDEOGRAPHY: {
    amount: 100,
    type: "per person",
  },
  // CSE department
  CSE_CODEFUSION: {
    amount: 100,
    type: "per person",
  },
  CSE_PROJECT_EXPO: {
    amount: 100,
    type: "per person",
  },
  CSE_COUNTER_STRIKE: {
    amount: 100,
    type: "per person",
  },
  CSE_TREASURE_HUNT: {
    amount: 100,
    type: "per person",
  },
  // General Engineering (Technical)
  GE_POSTER_COMPETITION: {
    amount: 100,
    type: "per person",
  },
  GE_SCITECH_MODEL_EXPO: {
    amount: 100,
    type: "per person",
  },
  //mech
  MECH_PROJECT_EXPO: {
    amount: 100,
    type: "per person",
  },
  MECH_JUNK_YARD: {
    amount: 100,
    type: "per person",
  },
  MECH_IPL_AUCTION: {
    amount: 100,
    type: "per person",
  },
} as const;

export interface Event {
  id: number;
  name: string;
  slug: string;
  department: string;
  date: string;
  time: string;
  venue: string;
  entryFee: string;
  type: string;
  icon?: string;
  description: string;
}

export const CSE_AIML_EVENTS: Event[] = [
  {
    id: 1,
    name: "Python Frontiers",
    slug: "python-frontiers",
    department: "CSE (AIML)",
    date: "25th March 2026",
    time: "9:15 AM - 4:15 PM",
    venue: "Bharati Vidyapeeth College of Engineering, Kolhapur",
    entryFee: `${EVENT_FEES.PYTHON_FRONTIERS.amount} (per person)`,
    type: "Technical Event",
    icon: "/event-card/aiml/python-frontiers.jpeg",
    description:
      "A high-intensity inter-college Python coding competition testing logical thinking and problem-solving ability through aptitude and coding rounds.",
  },
  {
    id: 2,
    name: "Face To Face",
    slug: "face-to-face",
    department: "CSE (AIML)",
    date: "25th March 2026",
    time: "9:15 AM - 4:15 PM",
    venue: "Bharati Vidyapeeth College of Engineering, Kolhapur",
    entryFee: `${EVENT_FEES.FACE_TO_FACE.amount} (per person)`,
    type: "Non-Technical Event",
    icon: "/event-card/aiml/face-to-face.jpeg",
    description:
      "A mock interview competition simulating real-world hiring processes through aptitude tests, group discussions, and technical & personal interviews.",
  },
  {
    id: 3,
    name: "BGMI",
    slug: "bgmi",
    department: "CSE (AIML)",
    date: "25th March 2026",
    time: "9:15 AM - 4:15 PM",
    venue: "Bharati Vidyapeeth College of Engineering, Kolhapur",
    entryFee: `${EVENT_FEES.BGMI.amount} (per team)`,
    type: "Non-Technical Event",
    icon: "/event-card/aiml/bgmi.jpeg",
    description:
      "An intense BGMI Battle Squad Tournament where teams compete in custom rooms to showcase strategy, skills, and teamwork for glory and rewards.",
  },
];

export const CSE_EVENTS: Event[] = [
  {
    id: 1,
    name: "Code Fusion",
    slug: "codefusion",
    department: "CSE",
    date: "25th March 2026",
    time: "9:15 AM - 4:15 PM",
    venue: "Bharati Vidyapeeth College of Engineering, Kolhapur",
    entryFee: `${EVENT_FEES.CSE_CODEFUSION.amount} (per person)`,
    type: "Technical Event",
    icon: "/event-card/cse/codefusion.png",
    description:
      "CODEFUSION is a multi-language coding competition where participants can choose their preferred programming language (C, C++, Java, Python) to solve algorithmic challenges. The event focuses on problem-solving versatility and coding efficiency across different programming paradigms.",
  },
  {
    id: 2,
    name: "Project Expo",
    slug: "project-expo",
    department: "CSE",
    date: "25th March 2026",
    time: "9:15 AM - 4:15 PM",
    venue: "Bharati Vidyapeeth College of Engineering, Kolhapur",
    entryFee: "100",
    type: "Technical Event",
    icon: "/event-card/cse/project-expo.png",
    description:
      "Project Expo showcases innovative software and hardware projects developed by students. This event provides a platform for students to demonstrate their technical skills, creativity, and practical implementation of computer science concepts in real-world applications.",
  },
  {
    id: 3,
    name: "Treasure Hunt",
    slug: "treasure-hunt",
    department: "CSE",
    date: "25th March 2026",
    time: "9:15 AM - 4:15 PM",
    venue: "Bharati Vidyapeeth College of Engineering, Kolhapur",
    entryFee: "100",
    type: "Non-Technical Event",
    icon: "/event-card/cse/treasure-hunt.png",
    description:
      "Treasure Hunt is a team-based game where two teams of 5 players each compete to win the game.",
  },
];

export const MECH_EVENTS: Event[] = [
  {
    id: 1,
    name: "IPL Auction",
    slug: "mech-ipl-auction",
    department: "Mechanical Engineering",
    date: "25th March 2026",
    time: "9:15 AM - 4:15 PM",
    venue: "Bharati Vidyapeeth College of Engineering, Kolhapur",
    entryFee: "100",
    type: "Technical Event",
    icon: "/event-card/mech/ipl-auction.png",
    description:
      "Mech IPL Auction is a strategic team-based competition inspired by the IPL bidding format. Participants will build their ultimate squad using a virtual budget, analyze player strengths, and make smart bidding decisions under time pressure. The event tests strategic thinking, decision-making skills, and teamwork in a dynamic auction environment.",
  },
  {
    id: 2,
    name: "Junk Yard",
    slug: "mech-junk-yard",
    department: "Mechanical Engineering",
    date: "25th March 2026",
    time: "9:15 AM - 4:15 PM",
    venue: "Bharati Vidyapeeth College of Engineering, Kolhapur",
    entryFee: "100",
    type: "Non-Technical Event",
    icon: "/event-card/mech/junk-yard.png",
    description:
      "Mech Junk Yard challenges teams to transform raw materials and scrap into innovative functional models within a limited time. Participants must think creatively, apply engineering concepts, and work collaboratively to design and present their unique creation. The event evaluates creativity, practicality, and presentation skills.",
  },
  {
    id: 3,
    name: "Project Competition",
    slug: "mech-project-expo",
    department: "Mechanical Engineering",
    date: "25th March 2026",
    time: "9:15 AM - 4:15 PM",
    venue: "Bharati Vidyapeeth College of Engineering, Kolhapur",
    entryFee: "100",
    type: "Technical Event",
    icon: "/event-card/mech/project-expo.png",
    description:
      "Mech Project Expo is a platform for students to showcase their innovative projects, research ideas, and working prototypes. Teams will present their concepts to a panel of judges, demonstrating technical knowledge, problem-solving ability, and real-world application. The event encourages innovation, practical implementation, and confident presentation.",
  },
];

export const ENTC_EVENTS: Event[] = [
  {
    id: 1,
    name: "Project Expo",
    slug: "entc-project-expo",
    department: "Electronic and Telecommunication Engineering",
    date: "25th March 2026",
    time: "9:15 AM - 4:15 PM",
    venue: "Bharati Vidyapeeth's College of Engineering Kolhapur",
    entryFee: `${EVENT_FEES.ENTC_PROJECT_EXPO.amount} (per person)`,
    type: "Technical Event",
    icon: "/event-card/entc/project-expo.png",
    description:
      "Project Expo is a platform for aspiring engineers to present their innovative hardware and software-based projects. Participants will demonstrate their technical expertise, problem-solving approach, and real-world applications of electronics and communication concepts before a panel of judges. The event encourages creativity, research-oriented thinking, and practical implementation.",
  },
  {
    id: 2,
    name: "Digital Dangal",
    slug: "digital-dangal",
    department: "Electronic and Telecommunication Engineering",
    date: "25th March 2026",
    time: "9:15 AM - 4:15 PM",
    venue: "Bharati Vidyapeeth's College of Engineering Kolhapur",
    entryFee: `${EVENT_FEES.ENTC_DIGITAL_DANGAL.amount} (per person)`,
    type: "Technical Event",
    icon: "/event-card/entc/digital-dangal.png",
    description:
      "Digital Dangal is an electrifying technical competition designed to test your coding speed, logical thinking, and core programming fundamentals. Through a quiz round followed by an intense coding battle, participants will compete to showcase their technical accuracy and problem-solving efficiency under time constraints.",
  },
  {
    id: 3,
    name: "Snap & Shine - Reel Making Competition",
    slug: "snap-and-shine",
    department: "Electronic and Telecommunication Engineering",
    date: "25th March 2026",
    time: "9:15 AM - 4:15 PM",
    venue: "Bharati Vidyapeeth's College of Engineering Kolhapur",
    entryFee: `${EVENT_FEES.ENTC_SNAP_AND_SHINE.amount} (per person)`,
    type: "Non-Technical Event",
    icon: "/event-card/entc/snap-shine.png",
    description:
      "Snap & Shine is an exciting reel-making competition where participants create short cinematic videos based on given themes. Showcase your creativity, storytelling skills, and editing talent!",
  },
];

export const GENERAL_ENGINEERING_EVENTS: Event[] = [
  {
    id: 1,
    name: "Techno Science Quiz",
    slug: "techno-science-quiz",
    department: "General Engineering",
    date: "25th March 2026",
    time: "9:15 AM - 4:15 PM",
    venue: "Bharati Vidyapeeth College of Engineering, Kolhapur",
    entryFee: "100",
    type: "Technical Event",
    icon: "/event-card/gs/techno-quiz.jpg",
    description:
      "Techno Science Quiz is an MCQ-based competitive quiz designed to evaluate participants' scientific knowledge and technical awareness. The event challenges first-year students to apply conceptual understanding, logical reasoning, and quick thinking in a structured digital quiz format.",
  },
  {
    id: 2,
    name: "Poster Competition",
    slug: "poster-competition",
    department: "General Engineering",
    date: "25th March 2026",
    time: "9:15 AM - 4:15 PM",
    venue: "Bharati Vidyapeeth College of Engineering, Kolhapur",
    entryFee: "100",
    type: "Technical Event",
    icon: "/event-card/gs/poster.jpg",
    description:
      "Poster Competition invites students to creatively present scientific and technological concepts through visually engaging and informative posters. Participants will explore contemporary themes and communicate innovative ideas effectively through design, research, and presentation skills.",
  },
  {
    id: 3,
    name: "SciTech Model Expo 2K26",
    slug: "scitech-model-expo",
    department: "General Engineering",
    date: "25th March 2026",
    time: "9:15 AM - 4:15 PM",
    venue: "Bharati Vidyapeeth College of Engineering, Kolhapur",
    entryFee: "100",
    type: "Technical Event",
    icon: "/event-card/gs/scitech-expo.jpg",
    description:
      "SciTech Model Expo 2K26 provides a platform for students to showcase innovative science and technology-based models. Participants will demonstrate practical understanding, creativity, and real-world application of engineering concepts through working or static models before a panel of judges.",
  },
  {
    id: 4,
    name: "Booyah Master",
    slug: "freefire",
    department: "General Engineering",
    date: "25th March 2026",
    time: "9:15 AM - 4:15 PM",
    venue: "Bharati Vidyapeeth College of Engineering, Kolhapur",
    entryFee: `${EVENT_FEES.FREEFIRE.amount} (per team)`,
    type: "Non-Technical Event",
    icon: "/event-card/gs/freefire.jpg",
    description:
      "Welcome to the ultimate FreeFire Champion's Battle Squad Tournament! Get ready to showcase your skills, strategy, and teamwork in an intense battle royale competition. Compete against top squads and fight for glory and exciting rewards!",
  },
];

export const CIVIL_EVENTS: Event[] = [
  {
    id: 1,
    name: "Model Making",
    slug: "model-making",
    department: "Civil",
    date: "25th March 2026",
    time: "9:15 AM - 4:15 PM",
    venue: "Bharati Vidyapeeth College of Engineering, Kolhapur",
    entryFee: "100",
    type: "Technical Event",
    icon: "/event-card/civil/model-making.png",
    description:
      "Model Making is a structural design competition where participants must construct a stable and efficient tower model using Popsicle sticks within specified constraints. The event tests creativity, precision, structural understanding, and practical application of basic civil engineering principles under defined design parameters.",
  },
  {
    id: 2,
    name: "Battle of Brains",
    slug: "battle-of-brains",
    department: "Civil",
    date: "25th March 2026",
    time: "9:15 AM - 4:15 PM",
    venue: "Bharati Vidyapeeth College of Engineering, Kolhapur",
    entryFee: `${EVENT_FEES.CE_BATTLE_OF_BRAINS.amount} (per person)`,
    type: "Non-Technical Event",
    icon: "/event-card/civil/battle-of-brains.png",
    description:
      "Battle of Brains is an engaging quiz competition designed to test participants' knowledge, presence of mind, and teamwork. Through multiple competitive rounds including rapid fire and buzzer challenges, teams will compete to prove their intellectual dominance and strategic thinking abilities.",
  },
  {
    id: 3,
    name: "CAD Master",
    slug: "cad-master",
    department: "Civil",
    date: "25th March 2026",
    time: "9:15 AM - 4:15 PM",
    venue: "Bharati Vidyapeeth College of Engineering, Kolhapur",
    entryFee: "100",
    type: "Technical Event",
    icon: "/event-card/civil/cad-master.png",
    description:
      "CAD Master is a technical drafting competition that evaluates participants' proficiency in computer-aided design. From aptitude screening to hands-on architectural drawing, contestants will demonstrate their precision, planning skills, and command over Autodesk AutoCAD in designing a complete residential layout.",
  },
  {
    id: 4,
    name: "Videography",
    slug: "videography",
    department: "Civil",
    date: "25th March 2026",
    time: "9:15 AM - 4:15 PM",
    venue: "Bharati Vidyapeeth College of Engineering, Kolhapur",
    entryFee: `${EVENT_FEES.CE_VIDEOGRAPHY.amount} (per person)`,
    type: "Non-Technical Event",
    icon: "/event-card/civil/videography.png",
    description:
      "Videography is a creative competition that challenges participants to produce an original short video within a limited time. The event focuses on storytelling, visual presentation, editing skills, and creativity, allowing contestants to showcase their perspective through engaging and impactful content.",
  },
];

export const EVENTS_BY_DEPARTMENT: Record<string, Event[]> = {
  "CSE (AIML)": CSE_AIML_EVENTS,
  CSE: CSE_EVENTS,
  MECH: MECH_EVENTS,
  ENTC: ENTC_EVENTS,
  CIVIL: CIVIL_EVENTS,
  "General Engineering": GENERAL_ENGINEERING_EVENTS,
};

// Other departments can define their own arrays similarly:
// export const CSE_EVENTS = [ ... ];
// export const MECH_EVENTS = [ ... ];
// export const ECE_EVENTS = [ ... ];
// export const CIVIL_EVENTS = [ ... ];

// Combined list of all events (kept for backwards compatibility)
export const events = [
  ...CSE_AIML_EVENTS,
  ...CSE_EVENTS,
  ...CIVIL_EVENTS,
  ...ENTC_EVENTS,
  ...MECH_EVENTS,
  ...GENERAL_ENGINEERING_EVENTS,
];

export const calculateEventFee = (
  eventType: keyof typeof EVENT_FEES,
  numberOfMembers?: number
) => {
  const eventFee = EVENT_FEES[eventType];

  if (
    eventType === "CSE_TREASURE_HUNT" &&
    numberOfMembers &&
    "baseAmount" in eventFee
  ) {
    return (
      eventFee.baseAmount + (numberOfMembers - 1) * eventFee.additionalMemberFee
    );
  }

  if (
    eventFee.type === "per person" &&
    typeof numberOfMembers === "number" &&
    numberOfMembers > 1
  ) {
    return eventFee.amount * numberOfMembers;
  }

  return eventFee.amount;
};

export const getEventFeeByName = (eventName: string, teamSize?: number) => {
  const eventMap = {
    "Startup Sphere": "STARTUP_SPHERE",
    "Face To Face": "FACE_TO_FACE",
    "Python Frontiers": "PYTHON_FRONTIERS",
    BGMI: "BGMI",
    FreeFire: "FREEFIRE",
    "AI Tales": "AI_TALES",
    // ENTC events
    "ENTC Project Expo": "ENTC_PROJECT_EXPO",
    "Digital Dangal": "ENTC_DIGITAL_DANGAL",
    "Snap & Shine": "ENTC_SNAP_AND_SHINE",
    "Model Making": "CE_MODEL_MAKING",
    "Battle of Brains": "CE_BATTLE_OF_BRAINS",
    "CAD Master": "CE_CAD_MASTER",
    Videography: "CE_VIDEOGRAPHY",
    "Poster Competition": "GE_POSTER_COMPETITION",
    "SciTech Model Expo 2K26": "GE_SCITECH_MODEL_EXPO",
    CODEFUSION: "CSE_CODEFUSION",
    "Project Expo": "CSE_PROJECT_EXPO",
    "Treasure Hunt": "CSE_TREASURE_HUNT",
    // Mechanical events
    "Mech Project Expo": "MECH_PROJECT_EXPO",
    "Mech Junk Yard": "MECH_JUNK_YARD",
    "Mech IPL Auction": "MECH_IPL_AUCTION",
  } as const;

  const eventType = eventMap[eventName as keyof typeof eventMap];
  if (!eventType) return null;

  return calculateEventFee(eventType, teamSize);
};

/** Organizing department key for each event (used for department-specific payment QR). */
export const EVENT_TO_ORGANIZING_DEPARTMENT: Record<
  string,
  keyof typeof EVENTS_BY_DEPARTMENT
> = {
  "Startup Sphere": "CSE (AIML)",
  "Face To Face": "CSE (AIML)",
  "Python Frontiers": "CSE (AIML)",
  BGMI: "CSE (AIML)",
  "AI Tales": "CSE (AIML)",
  "ENTC Project Expo": "ENTC",
  "Digital Dangal": "ENTC",
  "Snap & Shine": "ENTC",
  "Techno Science Quiz": "General Engineering",
  "Poster Competition": "General Engineering",
  "SciTech Model Expo 2K26": "General Engineering",
  "General Engineering Games": "General Engineering",
  FreeFire: "General Engineering",
  "Model Making": "CIVIL",
  "Battle of Brains": "CIVIL",
  "CAD Master": "CIVIL",
  Videography: "CIVIL",
  CODEFUSION: "CSE",
  "Project Expo": "CSE",
  "Treasure Hunt": "CSE",
  "Mech Project Expo": "MECH",
  "Mech Junk Yard": "MECH",
  "Mech IPL Auction": "MECH",
};

/** Payment QR code image path per organizing department. Add images under public/qr/ for each key. */
export const PAYMENT_QR_BY_DEPARTMENT: Record<
  keyof typeof EVENTS_BY_DEPARTMENT,
  string
> = {
  "CSE (AIML)": "/qr/aiml.jpeg",
  CSE: "/qr/cse.jpeg",
  MECH: "/qr/mech.jpeg",
  ENTC: "/qr/entc.jpeg",
  CIVIL: "/qr/civil.jpeg",
  "General Engineering": "/qr/general-engineering.jpeg",
};

export const GENERAL_ENGINEERING_TECHNICAL_FEE = 100;
export const CIVIL_TECHNICAL_FEE = 100;

export const calculateGeneralEngineeringGamesFee = (gamesCount: number) => {
  if (gamesCount === 3) return 100;
  if (gamesCount === 5) return 150;
  return 0;
};

export const eventImages = [
  "/event/event-12.jpeg",
  "/event/event-14.jpeg",
  "/event/event-18.jpeg",
  "/event/event-19.jpeg",
  "/event/event-24.jpeg",
  "/event/event-28.jpeg",
  "/event/event-33.jpg",
  "/event/event-35.jpg",
];

export const Sponsors = [
  { src: "/sponsers/gfg.png", alt: "GeeksForGeeks", bg: true },
];
