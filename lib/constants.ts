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
  AI_TALES: {
    amount: 100,
    type: "per person",
  },
  // Civil Engineering department
  CE_MODEL_MAKING: {
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
  modalData: {
    eventName: string;
    description: string;
    rules: string[];
    registration: string[];
    queries: Record<string, string>;
  };
}

// CSE (AIML) department events
export const CSE_AIML_EVENTS: Event[] = [
  // {
  //   id: 1,
  //   name: "Startup Sphere",
  //   slug: "startup-sphere",
  //   department: "CSE (AIML)",
  //   date: "28th Feb 2025",
  //   time: "10:00 AM - 12:00 PM",
  //   venue: "Bharati Vidyapeeth College of Engineering, Kolahpur",
  //   entryFee: `${EVENT_FEES.STARTUP_SPHERE.amount} (per person)`,
  //   type: "Technical Event",
  //   modalData: {
  //     eventName: "Startup Sphere",
  //     description:
  //       "Startup Sphere: Where Ideas Take Flight! Step into the spotlight and pitch your groundbreaking startup idea or showcase your innovative project. Choose between two exciting categories: Project Expo (one round) or Startup-sphere (two rounds). Present your ideas to industry professionals and compete for recognition!",
  //     rules: [
  //       "Category 1: Project Expo",
  //       "1. The Project Expo will have only one round.",
  //       "2. The registration fees for this event will be 100 per participant.",
  //       "3. For team's min-3 & max-5 members are allowed.",
  //       "4. Round Structure:",
  //       "   • Conducted by: Teachers and student coordinators.",
  //       "   • Duration: 5 minutes per team.",
  //       "   • Selection Process:",
  //       "     ○ In Project Expo, judging will be done by invited guests and teachers.",
  //       "5. All participants must adhere to the given time limits.",
  //       "6. The presentation should be clear, concise, and well-structured.",
  //       "7. Strictly no plagiarism – all content must be original.",
  //       "8. Participants are encouraged to use visuals and data points for better clarity.",
  //       "",
  //       "Category 2: Startup-sphere",
  //       "1. The Startup-sphere will have two rounds.",
  //       "2. The registration fees for this event will be 100 per participant.",
  //       "3. Participants must prepare one presentation that will be used for both rounds. However, they will present only 5 slides in the first round and the full presentation in the second round.",
  //       "4. First Round Structure:",
  //       "   • Conducted by: Teachers and student co-ordinates.",
  //       "   • Duration: 5 min per team.",
  //       "   • Judging Criteria:",
  //       "     ○ Problem Statement",
  //       "     ○ Business Model",
  //       "     ○ Market Potential & Target Audience",
  //       "     ○ Competitive Advantage",
  //       "     ○ Scalability & Future Plans",
  //       "   • Selection Process:",
  //       "     ○ Teachers and students co-ordinators will decide which teams qualify for the second round.",
  //       "5. Second Round Structure:",
  //       "   • Conducted by: Judges (professionals from IT industries)",
  //       "   • Duration: 10 minutes per team.",
  //       "   • Slides Allowed: Full presentation as per the template.",
  //       "   • Winner Selection:",
  //       "     ○ Judges will decide the winners based on overall presentation quality, clarity and feasibility of the idea.",
  //       "6. Presentation Template:",
  //       "   a) Title Slide – Project Name, Team Members, Institution",
  //       "   b) Problem Statement – Clearly define the issue being addressed.",
  //       "   c) Business Model – Revenue streams and monetization strategy.",
  //       "   d) Market Potential & Target Audience – Identify the market size and key audience.",
  //       "   e) Competitive Advantage – How is the idea unique from existing solutions?",
  //       "   f) Scalability & Future Plans – Plans for growth and expansion.",
  //       "   g) Technology Stack (if applicable) – Tools, frameworks, and technology used.",
  //       "   h) Implementation Plan – Roadmap for execution.",
  //       "   i) Conclusion & Call to Action – Summary and next steps.",
  //       "7. All participants must adhere to the given time limits.",
  //       "8. The presentation should be clear, concise, and well-structured.",
  //       "9. Strictly no plagiarism – all content must be original.",
  //       "10. Participants are encouraged to use visuals and data points for better clarity.",
  //     ],
  //     registration: [
  //       "Participants must register before the deadline: 27th February 2025, 5:00 PM.",
  //       "Spot registrations are allowed until 28th February 2025, 11:00 AM on the event day.",
  //       "Entry fee: ₹100 (per person)",
  //       "Participants must provide a valid email ID and contact number during registration.",
  //       "Late registrations will not be entertained after the cutoff time.",
  //     ],
  //     queries: {
  //       "jayesh jadhav": "9370964521",
  //       "ajinkya monde": "7487984288",
  //       "rakesh telang": "9075805070",
  //     },
  //   },
  // },
  {
    id: 1,
    name: "Face To Face",
    slug: "face-to-face",
    department: "CSE (AIML)",
    date: "28th Feb 2025",
    time: "9:00 AM - 6:00 PM",
    venue: "Bharati Vidyapeeth College of Engineering, Kolahpur",
    entryFee: `${EVENT_FEES.FACE_TO_FACE.amount} (per person)`,
    type: "Technical Event",
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
    id: 2,
    name: "Python Frontiers",
    slug: "python-frontiers",
    department: "CSE (AIML)",
    date: "28th Feb 2025",
    time: "2:00 PM - 5:00 PM",
    venue: "Bharati Vidyapeeth College of Engineering, Kolahpur",
    entryFee: `${EVENT_FEES.PYTHON_FRONTIERS.amount} (per person)`,
    type: "Technical Event",
    modalData: {
      eventName: "Python Frontiers",
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
    id: 3,
    name: "BGMI",
    slug: "bgmi",
    department: "CSE (AIML)",
    date: "13th Feb 2026",
    time: "11:00 AM - 3:00 PM",
    venue: "Bharati Vidyapeeth College of Engineering, Kolahpur",
    entryFee: `${EVENT_FEES.BGMI.amount} (per team)`,
    type: "Non-Technical Event",
    modalData: {
      eventName: "BGMI",
      description:
        "Welcome to the ultimate BGMI Battle Squad Tournament! Get ready to showcase your skills, strategy, and teamwork in an intense battle royale competition. Compete against top squads and fight for glory and exciting rewards!",
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
        "🔹 BGMI ID",
        "🔹 Squad Name (if applicable)",
        "🔹 Contact Number",
      ],
      queries: {
        "om kurlekar": "9503656220",
        "aniket patil": "9860501427",
      },
    },
  },
  // {
  //   id: 5,
  //   name: "AI Tales: Animate Your Imagination!",
  //   slug: "ai-tales",
  //   department: "CSE (AIML)",
  //   date: "28th Feb 2025",
  //   time: "7:00 PM - 10:00 PM",
  //   venue: "Bharati Vidyapeeth College of Engineering, Kolahpur",
  //   entryFee: `${EVENT_FEES.AI_TALES.amount} (per person)`,
  //   type: "Technical Event",
  //   modalData: {
  //     eventName: "AI Tales: Animate Your Imagination!",
  //     description:
  //       "AI TALES is an innovative storytelling competition where creativity meets technology! Participants will harness the power of AI to craft engaging animated videos based on given topics within a set time limit. The event challenges storytellers, designers, and tech enthusiasts to push their creative boundaries and bring their ideas to life through AI-driven animation. Whether you're a beginner or an experienced creator, AI TALES offers a platform to showcase your storytelling skills in a dynamic and futuristic way. Get ready to transform imagination into reality—one AI-generated tale at a time!",
  //     rules: [
  //       "Challenge Details: Participants will receive an on-the-spot topic and will have 1 hour to create a video.",
  //       "Tools Allowed: InVideo, Pictory, or any other similar tools.",
  //       "Format: The final video must be submitted in MP4 format only.",
  //       "Submission Deadline: Submissions must be made within the allocated time. Late entries will not be considered.",
  //       "Original Content: All content must be original and free from plagiarism or copyright violations.",
  //       "AI Tool Usage: Manipulation of AI tools beyond permissible limits will result in disqualification.",
  //       "Participant Equipment: Participants must use their own laptops for the challenge.",
  //     ],
  //     registration: [
  //       "Participants must register before the deadline: 27th February 2025, 5:00 PM.",
  //       "Individual entries only. Team participation is not allowed.",
  //       "Spot registrations are allowed until 28th February 2025, 11:00 AM on the event day.",
  //       "Entry fee: ₹100 (per person)",
  //       "Participants must provide a valid email ID and contact number during registration.",
  //       "Late registrations will not be entertained after the cutoff time.",
  //     ],
  //     queries: {
  //       "anurag patole": "7058503010",
  //       "prajwal gujare": "7276298205",
  //     },
  //   },
  // },
];

export const CSE_EVENTS: Event[] = [
  {
    id: 1,
    name: "Code Fusion",
    slug: "codefusion",
    department: "CSE",
    date: "2026-02-28",
    time: "10:00 AM",
    venue: "Bharati Vidyapeeth College of Engineering, Kolhapur",
    entryFee: "100",
    type: "Technical Event",
    modalData: {
      eventName: "CODEFUSION",
      description:
        "CODEFUSION is a multi-language coding competition where participants can choose their preferred programming language (C, C++, Java, Python) to solve algorithmic challenges. The event focuses on problem-solving versatility and coding efficiency across different programming paradigms.",
      rules: [
        "Maximum 2 participants per team",
        "Round 1: Aptitude",
        "Round 2: Coding",
        "Entry Fee Rs. 100 per participant",
      ],
      registration: [
        "Register through department website",
        "Team registration must include both members' details",
        "Entery Fee Rs. 100 per participant",
      ],
      queries: {
        "avishkar kamble": "9359984873",
      },
    },
  },
  {
    id: 2,
    name: "Project Expo",
    slug: "project-expo",
    department: "CSE",
    date: "2026-02-28",
    time: "10:00 AM",
    venue: "Bharati Vidyapeeth College of Engineering, Kolhapur",
    entryFee: "100",
    type: "Technical Event",
    modalData: {
      eventName: "Project Expo",
      description:
        "Project Expo showcases innovative software and hardware projects developed by students. This event provides a platform for students to demonstrate their technical skills, creativity, and practical implementation of computer science concepts in real-world applications.",
      rules: ["Minmum presenstation time: 10 minutes"],
      registration: ["Entry Fee Rs. 100 per participant"],
      queries: {
        "subhan modak": "7507088006",
      },
    },
  },
  {
    id: 3,
    name: "Treasure Hunt",
    slug: "treasure-hunt",
    department: "CSE",
    date: "2026-02-28",
    time: "10:00 AM",
    venue: "Bharati Vidyapeeth College of Engineering, Kolhapur",
    entryFee: "100",
    type: "Non-Technical Event",
    modalData: {
      eventName: "Treasure Hunt",
      description:
        "Treasure Hunt is a team based game where two teams of 5 players each compete to win the game.",
      rules: [],
      registration: ["Entry Fee Rs. 100 per participant"],
      queries: {
        "heshvardhan gadagade": "788178133",
      },
    },
  },
];
export const MECH_EVENTS: Event[] = [
  {
    id: 1,
    name: "Robo War",
    slug: "robo-war",
    department: "Mechanical Engineering",
    date: "2026-02-28",
    time: "10:00 AM",
    venue: "Bharati Vidyapeeth's College of Engineering Kolhapur",
    entryFee: "200",
    type: "Technical Event",
    modalData: {
      eventName: "Robo War",
      description:
        "Design and build remote-controlled or autonomous robots to battle against opponents in an arena. The last robot standing wins!",
      rules: [
        "Team size: 2-4 members",
        "Robot weight must be under 15 kg",
        "Dimensions: Maximum 50cm x 50cm x 50cm",
        "Weapons allowed: Spinners, lifters, hammers (no explosives, liquids, or fire)",
        "Battery voltage: Maximum 24V",
        "Each match duration: 3-5 minutes",
        "Judges decision is final",
      ],
      registration: [""],
      queries: {
        "Dr. S. B. Patil": "9876543210",
        "Rohan Deshmukh": "8765432109",
      },
    },
  },
  {
    id: 2,
    name: "CAD Championship",
    slug: "cad-championship",
    department: "Mechanical Engineering",
    date: "2026-02-28",
    time: "11:00 AM",
    venue: "CAD/CAM Lab, Mechanical Dept",
    entryFee: "150",
    type: "Technical Event",
    modalData: {
      eventName: "CAD Championship",
      description:
        "Test your 3D modeling skills in this fast-paced CAD competition. Create complex parts and assemblies under time constraints.",
      rules: [
        "Individual participation only",
        "Software: Any CAD software (SolidWorks, AutoCAD, CATIA, Creo)",
        "Two rounds: Preliminary (quiz) and Final (modeling)",
        "Models will be judged on accuracy, technique, and time",
        "Bring your own laptops with licensed software",
        "Basic knowledge of GD&T is recommended",
      ],
      registration: [""],
      queries: {
        "Prof. A. R. Jadhav": "9988776655",
        "Sneha Patil": "8877665544",
      },
    },
  },
  {
    id: 3,
    name: "RC Car Racing",
    slug: "rc-car-racing",
    department: "Mechanical Engineering",
    date: "2026-02-28",
    time: "2:00 PM",
    venue: "Main Ground, College Campus",
    entryFee: "250",
    type: "Technical Event",
    modalData: {
      eventName: "RC Car Racing",
      description:
        "Build and race your own remote-controlled car through challenging tracks and obstacles. Speed, control, and durability will be tested.",
      rules: [
        "Team size: 2-3 members",
        "Car must be self-built (no readymade toys)",
        "Motor: Max 540 class brushless/brushed",
        "Battery: Max 7.4V LiPo or 6-cell NiMH",
        "Track includes jumps, curves, and rough terrain",
        "Timed laps with penalties for going off-track",
        "Qualifying rounds followed by finals",
      ],
      registration: [""],
      queries: {
        "Mr. K. R. Kulkarni": "9555666777",
        "Amit Gaikwad": "8444555666",
      },
    },
  },
  {
    id: 4,
    name: "Bridge Building",
    slug: "bridge-building",
    department: "Mechanical Engineering",
    date: "2026-02-27",
    time: "10:00 AM",
    venue: "Civil-Mechanical Workshop",
    entryFee: "150",
    type: "Technical Event",
    modalData: {
      eventName: "Bridge Building",
      description:
        "Construct a load-bearing bridge using popsicle sticks and glue. The bridge with highest strength-to-weight ratio wins.",
      rules: [
        "Team size: 2-3 members",
        "Materials provided: Popsicle sticks (100), glue (1 bottle)",
        "Bridge span: 50cm (minimum)",
        "Width: 10cm (minimum)",
        "Height: 15cm (minimum clearance)",
        "Load testing: Weight will be added until failure",
        "Time limit: 3 hours for construction",
      ],
      registration: [""],
      queries: {
        "Dr. V. S. Kumbhar": "9123456780",
        "Prathamesh Joshi": "9012345678",
      },
    },
  },
  {
    id: 5,
    name: "3D Printing Challenge",
    slug: "3d-printing-challenge",
    department: "Mechanical Engineering",
    date: "2026-02-27",
    time: "11:30 AM",
    venue: "Additive Manufacturing Lab",
    entryFee: "200",
    type: "Technical Event",
    modalData: {
      eventName: "3D Printing Challenge",
      description:
        "Design and 3D print functional parts based on given problem statements. Showcase your design for manufacturing skills.",
      rules: [
        "Individual or team of 2",
        "Design software: Any 3D modeling software",
        "Printing will be done on college FDM printers",
        "Maximum print time: 2 hours",
        "File format: STL",
        "Judging based on design innovation, print quality, and functionality",
        "Participants must know basic slicing software",
      ],
      registration: [""],
      queries: {
        "Prof. M. R. Shinde": "9234567890",
        "Komal Pawar": "9345678901",
      },
    },
  },
  {
    id: 6,
    name: "Water Rocket Launch",
    slug: "water-rocket-launch",
    department: "Mechanical Engineering",
    date: "2026-02-28",
    time: "3:00 PM",
    venue: "College Ground",
    entryFee: "100",
    type: "Technical Event",
    modalData: {
      eventName: "Water Rocket Launch",
      description:
        "Design and launch water-powered rockets. Compete for maximum altitude and flight duration.",
      rules: [
        "Team size: 2-3 members",
        "Materials: 2-liter plastic bottles only",
        "Propellant: Water and compressed air only",
        "Maximum pressure: 100 psi",
        "Rocket must have recovery system (parachute/streamer)",
        "Judging based on altitude, flight time, and recovery",
        "Safety goggles mandatory during launch",
      ],
      registration: [""],
      queries: {
        "Mr. S. R. Gaikwad": "9456789012",
        "Rutuja Shinde": "9567890123",
      },
    },
  },
  {
    id: 7,
    name: "Trebuchet Challenge",
    slug: "trebuchet-challenge",
    department: "Mechanical Engineering",
    date: "2026-02-27",
    time: "2:30 PM",
    venue: "Mechanical Workshop Area",
    entryFee: "150",
    type: "Technical Event",
    modalData: {
      eventName: "Trebuchet Challenge",
      description:
        "Build a medieval-style trebuchet to launch projectiles at targets. Accuracy and distance will be tested.",
      rules: [
        "Team size: 2-4 members",
        "Trebuchet must be made of wood only",
        "Maximum height: 1.5 meters",
        "Counterweight: Max 5 kg",
        "Projectile: Tennis ball (provided)",
        "Two rounds: Distance and Accuracy",
        "Safety first - no metal parts in throwing arm",
      ],
      registration: [""],
      queries: {
        "Dr. P. R. Desai": "9678901234",
        "Sahil Mulla": "9789012345",
      },
    },
  },
  {
    id: 8,
    name: "Thermal Engineering Quiz",
    slug: "thermal-engineering-quiz",
    department: "Mechanical Engineering",
    date: "2026-02-27",
    time: "11:00 AM",
    venue: "Seminar Hall, Mechanical Dept",
    entryFee: "50",
    type: "Technical Event",
    modalData: {
      eventName: "Thermal Engineering Quiz",
      description:
        "Test your knowledge in thermodynamics, heat transfer, refrigeration, and air conditioning in this competitive quiz.",
      rules: [
        "Team size: 2 members",
        "Multiple rounds: Preliminary written test, rapid fire, buzzer round",
        "Topics: Thermodynamics, IC Engines, Refrigeration, Heat Transfer",
        "Use of calculators allowed",
        "Negative marking in preliminary round",
        "Judges decision is final and binding",
      ],
      registration: [""],
      queries: {
        "Prof. A. B. Shinde": "9890123456",
        "Nikita Patil": "9901234567",
      },
    },
  },
  {
    id: 9,
    name: "Junk Yard Wars",
    slug: "junk-yard-wars",
    department: "Mechanical Engineering",
    date: "2026-02-28",
    time: "10:00 AM",
    venue: "Innovation Lab",
    entryFee: "100",
    type: "Non-Technical Event",
    modalData: {
      eventName: "Junk Yard Wars",
      description:
        "Build innovative contraptions using scrap materials. Creativity and engineering thinking will be tested with limited resources.",
      rules: [
        "Team size: 3-4 members",
        "Materials provided: Random scrap (gears, motors, wires, cardboard)",
        "Time limit: 2 hours",
        "Theme revealed on the spot",
        "Must create a working mechanism",
        "Judging based on creativity, functionality, and teamwork",
        "No external materials allowed",
      ],
      registration: [""],
      queries: {
        "Mr. D. R. Thorat": "9012345679",
        "Omkar Salunkhe": "9123456781",
      },
    },
  },
  {
    id: 10,
    name: "Mechanical Design Challenge",
    slug: "mechanical-design-challenge",
    department: "Mechanical Engineering",
    date: "2026-02-27",
    time: "1:00 PM",
    venue: "Design Studio",
    entryFee: "100",
    type: "Technical Event",
    modalData: {
      eventName: "Mechanical Design Challenge",
      description:
        "Solve real-world mechanical design problems on the spot. Demonstrate your engineering design process and problem-solving abilities.",
      rules: [
        "Individual participation",
        "Problem statement given at the start",
        "Submit hand-drawn sketches with calculations",
        "Time: 2 hours",
        "Materials provided: Drawing sheets, pencils",
        "Judging based on feasibility, innovation, and presentation",
        "Basic knowledge of machine design required",
      ],
      registration: [""],
      queries: {
        "Dr. N. R. Kokare": "9234567891",
        "Shubham Ghorpade": "9345678902",
      },
    },
  },
];
export const ECE_EVENTS: Event[] = [
  {
    id: 1,
    name: "Project Expo",
    slug: "project-expo",
    department: "Electronic and Telecommunication Engineering",
    date: "2026-02-28",
    time: "10:00 AM",
    venue: "Bharati Vidyapeeth's College of Engineering Kolhapur",
    entryFee: "100",
    type: "Technical Event",
    modalData: {
      eventName: "Project Expo",
      description: "Showcase your innovative engineering projects...",
      rules: ["Rule 1", "Rule 2"],
      registration: [""],
      queries: {
        "Mr. R. R. Suryawanshi": "9960235165",
        "Aditya Chougale": "9309582291",
      },
    },
  },
  {
    id: 2,
    name: "Digital Dangal",
    slug: "digital-dangal",
    department: "Electronic and Telecommunication Engineering",
    date: "2026-02-28",
    time: "10:00 AM",
    venue: "Bharati Vidyapeeth's College of Engineering Kolhapur",
    entryFee: "100",
    type: "Technical Event",
    modalData: {
      eventName: "Digital Dangal",
      description: "A competitive digital challenge...",
      rules: ["Rule 1", "Rule 2"],
      registration: [""],
      queries: {
        "Ms. P. S. Mali": "9822253638",
        "Tirtha Patil": "9529581163",
      },
    },
  },
  {
    id: 3,
    name: "Snap & Shine",
    slug: "snap-and-shine",
    department: "Electronic and Telecommunication Engineering",
    date: "2026-02-28",
    time: "10:00 AM",
    venue: "Bharati Vidyapeeth's College of Engineering Kolhapur",
    entryFee: "100",
    type: "Non-Technical Event",
    modalData: {
      eventName: "Snap & Shine",
      description: "Capture the best moments...",
      rules: ["Rule 1", "Rule 2"],
      registration: [""],
      queries: {
        "Mr. A. R. Kittur": "9923855764",
        "Varun Patil": "7066201121",
      },
    },
  },
];
export const GENERAL_ENGINEERING_EVENTS: Event[] = [
  {
    id: 1,
    name: "Techno Science Quiz",
    slug: "techno-science-quiz",
    department: "General Engineering",
    date: "2026-02-28",
    time: "10:00 AM",
    venue: "Bharati Vidyapeeth College of Engineering, Kolahpur",
    entryFee: "100",
    type: "Technical Event",
    modalData: {
      eventName: "Techno Science Quiz",
      description:
        "A MCQ-based quiz testing scientific and technical knowledge. Quiz will be accessed via link shared in classroom.",
      rules: [
        "The quiz is MCQ-based and will be accessed using the link shared in the classroom",
        "Only for first year students",
        "Participants must use their own mobile phones and remain seated in their assigned places",
        "Any malpractice or unfair activity will lead to immediate disqualification",
        "The Judge's decision final and scores will not be disclosed",
      ],
      registration: [""],
      queries: {
        "mr. ali shaikh": "8788559792",
        "miss. sidhi kadam": "9226804220",
      },
    },
  },
  {
    id: 2,
    name: "Poster Competition",
    slug: "poster-competition",
    department: "General Engineering",
    date: "2026-02-28",
    time: "10:00 AM",
    venue: "Bharati Vidyapeeth College of Engineering, Kolahpur",
    entryFee: "100",
    type: "Technical Event",
    modalData: {
      eventName: "Poster Competition",
      description:
        "Create innovative posters on scientific and technological themes. Topics include: Indian Knowledge Systems (IKS) in Agriculture, Future of Education, Artificial Intelligence in Daily Life, Digital India, Science in Everyday Life, Water for a Sustainable Future, Utilization of Solar Energy, The Role of AI in Climate Change Predictions, Scientific Innovations That Changed the World, AI in Disaster Management & Rescue.",
      rules: [
        "Participation can be individual or team (max 2 students",
        "Posters must be original and based on science, technology, or innovation",
        "Standard size: 18X24 (1.5 X 2 Ft.); include title, concept, and illustrations",
        "Use safe and eco-friendly materials & colours",
        "Presentation time: 3-5 minutes per participant/team",
        "1st and 2nd year degree/diploma students participate only",
        "Judge's decision is final",
      ],
      registration: [""],
      queries: {
        "mr. gaurav andhale": "9356517617",
        "mr. shaunak kulkarni": "9529820151",
      },
    },
  },
  {
    id: 3,
    name: "SciTech Model Expo 2K26",
    slug: "scitech-model-expo",
    department: "General Engineering",
    date: "2026-02-28",
    time: "10:00 AM",
    venue: "Bharati Vidyapeeth College of Engineering, Kolahpur",
    entryFee: "100",
    type: "Technical Event",
    modalData: {
      eventName: "SciTech Model Expo 2K26",
      description: "ask for the event description",
      rules: [
        "Models must be student-made and based on science or technology concepts",
        "Both working and static models are allowed; readymade models are not permitted.",
        "Participants must clearly explain the model’s principle and application.",
        "Use of safe, low-cost, and eco-friendly materials is encouraged.",
        "Only 1st and 2nd year Degree and Diploma students are eligible to participate",
      ],
      registration: [""],
      queries: {
        "miss. gaouri jangale": "9730875796",
        "mr. suyash more": "9765152033",
      },
    },
  },
  {
    id: 4,
    name: "Free Fire Challenge",
    slug: "free-fire-challenge",
    department: "General Engineering",
    date: "2026-02-28",
    time: "10:00 AM",
    venue: "Bharati Vidyapeeth College of Engineering, Kolhapur",
    entryFee: "100",
    type: "Non-Technical Event",
    modalData: {
      eventName: "Free Fire Challenge",
      description:
        "Virtual challenge game where players complete predetermined targets in a controlled gaming environment.",
      rules: [
        "Participation: Individual or team.",
        "Each player completes a predetermined challenge/target (like point collection, movement task, or virtual quiz simulation).",
        "Follow safety rules: no running or rough play indoors.",
        "Judges will assign points based on performance and speed.",
        "All decisions by the judges will be final.",
      ],
      registration: [""],
      queries: {
        "Mr. Tejas Kadam": "8625961194",
        "Mr. Soham Humbre": "8007267372",
      },
    },
  },
  {
    id: 5,
    name: "Coin Drop Challenge",
    slug: "coin-drop-challenge",
    department: "General Engineering",
    date: "2026-02-28",
    time: "10:00 AM",
    venue: "Bharati Vidyapeeth College of Engineering, Kolhapur",
    entryFee: "100",
    type: "Non-Technical Event",
    modalData: {
      eventName: "Coin Drop Challenge",
      description:
        "Precision-based game where participants drop a coin into a target from a height.",
      rules: [
        "Participants drop a ₹1 coin from a height into a water bowl / target circle.",
        "Each player gets 3 attempts.",
        "Scoring: Coin lands in target → 10 points; touches target → 5 points; miss → 0 points.",
        "Players must stand at the marked line; no leaning or moving forward.",
        "Judges' decision will be final in case of any disputes.",
      ],
      registration: [""],
      queries: {
        "Mr. Tejas Kadam": "8625961194",
        "Mr. Soham Humbre": "8007267372",
      },
    },
  },
  {
    id: 6,
    name: "Funny Walk Race",
    slug: "funny-walk-race",
    department: "General Engineering",
    date: "2026-02-28",
    time: "10:00 AM",
    venue: "Bharati Vidyapeeth College of Engineering, Kolhapur",
    entryFee: "100",
    type: "Non-Technical Event",
    modalData: {
      eventName: "Funny Walk Race",
      description:
        "A hilarious race where participants walk in funny styles from start to finish line.",
      rules: [
        "Participants walk from start to finish line in a funny style (animal walk, robot walk, or silly pose).",
        "Only one participant at a time.",
        "Disqualification: Running or touching the floor with hands unless part of the style.",
        "Winner is the participant who reaches the finish line first while maintaining the funny walk.",
        "Judges' decision regarding style maintenance is final.",
      ],
      registration: [""],
      queries: {
        "Mr. Tejas Kadam": "8625961194",
        "Mr. Soham Humbre": "8007267372",
      },
    },
  },
  {
    id: 7,
    name: "Pass the Balloon",
    slug: "pass-the-balloon",
    department: "General Engineering",
    date: "2026-02-28",
    time: "10:00 AM",
    venue: "Bharati Vidyapeeth College of Engineering, Kolhapur",
    entryFee: "100",
    type: "Non-Technical Event",
    modalData: {
      eventName: "Pass the Balloon",
      description:
        "Team coordination game where members pass a balloon without using hands.",
      rules: [
        "Teams of 2 members sit or stand in a line.",
        "Pass a balloon to the end without using hands (e.g., head, elbows, knees).",
        "Balloon must not touch the floor.",
        "Team completing the task fastest without dropping wins.",
        "If balloon touches the floor, team must start over.",
        "Judges' timing and decisions are final.",
      ],
      registration: [""],
      queries: {
        "Mr. Tejas Kadam": "8625961194",
        "Mr. Soham Humbre": "8007267372",
      },
    },
  },
  {
    id: 8,
    name: "Emoji Expression Game",
    slug: "emoji-expression-game",
    department: "General Engineering",
    date: "2026-02-28",
    time: "10:00 AM",
    venue: "Bharati Vidyapeeth College of Engineering, Kolhapur",
    entryFee: "100",
    type: "Non-Technical Event",
    modalData: {
      eventName: "Emoji Expression Game",
      description:
        "A fun guessing game where participants express words or phrases using only facial expressions and gestures.",
      rules: [
        "Participants are given a word, emoji, or phrase.",
        "They must express it using facial expressions and gestures only; no speaking.",
        "Other participants or teams guess the emoji/word within 30 seconds.",
        "Correct guesses earn points; most points at the end wins.",
        "No verbal hints or sounds allowed.",
        "Judges' decisions on acceptable expressions are final.",
      ],
      registration: [""],
      queries: {
        "Mr. Tejas Kadam": "8625961194",
        "Mr. Soham Humbre": "8007267372",
      },
    },
  },
];
export const CIVIL_EVENTS: Event[] = [
  {
    id: 1,
    name: "Model Making",
    slug: "model-making",
    department: "Civil",
    date: "2026-02-28",
    time: "10:00 AM",
    venue: "Bharati Vidyapeeth College of Engineering, Kolahpur",
    entryFee: "100",
    type: "Technical Event",
    modalData: {
      eventName: "Model Making",
      description: "ask for the event description",
      rules: ["ask for rules"],
      registration: [""],
      queries: {
        "atharv vishnu patil": "9146205055",
        "vedant rajesh chavan": "9607082006",
      },
    },
  },
  {
    id: 2,
    name: "CAD Master",
    slug: "cad-master",
    department: "Civil",
    date: "2026-02-28",
    time: "10:00 AM",
    venue: "Bharati Vidyapeeth College of Engineering, Kolahpur",
    entryFee: "100",
    type: "Technical Event",
    modalData: {
      eventName: "CAD Master",
      description: "ask for the event description",
      rules: ["ask for rules"],
      registration: [""],
      queries: {
        "atharv somnath thakare": "9021200969",
        "pratik dattatray patil": "7058785354",
      },
    },
  },
  {
    id: 3,
    name: "Videography",
    slug: "videography",
    department: "Civil",
    date: "2026-02-28",
    time: "10:00 AM",
    venue: "Bharati Vidyapeeth College of Engineering, Kolahpur",
    entryFee: "100",
    type: "Non-Technical Event",
    modalData: {
      eventName: "Videography",
      description: "ask for the event description",
      rules: ["ask for rules"],
      registration: [""],
      queries: {
        "akansha vitthal shinde": "9850876630",
        "vedant rajesh chavan": "9175201261",
      },
    },
  },
];

export const EVENTS_BY_DEPARTMENT: Record<string, Event[]> = {
  "CSE (AIML)": CSE_AIML_EVENTS,
  CSE: CSE_EVENTS,
  MECH: MECH_EVENTS,
  ECE: ECE_EVENTS,
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
  ...ECE_EVENTS,
  ...MECH_EVENTS,
  ...GENERAL_ENGINEERING_EVENTS,
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
    "Python Frontiers": "PYTHON_FRONTIERS",
    BGMI: "BGMI",
    "AI Tales": "AI_TALES",
    "Model Making": "CE_MODEL_MAKING",
    "CAD Master": "CE_CAD_MASTER",
    Videography: "CE_VIDEOGRAPHY",
    CODEFUSION: "CSE_CODEFUSION",
    "Project Expo": "CSE_PROJECT_EXPO",
    "Treasure Hunt": "CSE_TREASURE_HUNT",
  } as const;

  const eventType = eventMap[eventName as keyof typeof eventMap];
  if (!eventType) return null;

  return calculateEventFee(eventType, teamSize);
};

export const GENERAL_ENGINEERING_TECHNICAL_FEE = 100;
export const CIVIL_TECHNICAL_FEE = 100;

export const calculateGeneralEngineeringGamesFee = (gamesCount: number) => {
  if (gamesCount === 3) return 100;
  if (gamesCount === 5) return 150;
  return 0;
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
