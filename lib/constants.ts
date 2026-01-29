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
  {
    id: 1,
    name: "Startup Sphere",
    slug: "startup-sphere",
    department: "CSE (AIML)",
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
    slug: "face-to-face",
    department: "CSE (AIML)",
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
    slug: "python-warriors",
    department: "CSE (AIML)",
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
    slug: "freefire",
    department: "CSE (AIML)",
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
    slug: "ai-tales",
    department: "CSE (AIML)",
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

export const CSE_EVENTS: Event[] = [
  {
    id: 1,
    name: "C-PRO Master",
    slug: "c-pro-master",
    department: "CSE",
    date: "2026-02-28",
    time: "10:00 AM",
    venue: "Bharati Vidyapeeth College of Engineering, Kolhapur",
    entryFee: "100",
    type: "Technical Event",
    modalData: {
      eventName: "C-PRO Master",
      description:
        "C-PRO Master is a competitive programming challenge designed to test participants' expertise in C programming. Participants will solve complex algorithmic problems within a time limit, demonstrating their coding efficiency, logical thinking, and problem-solving skills.",
      rules: [
        "Participants must solve given programming problems using C language only.",
        "No external libraries or pre-built code snippets are allowed.",
        "Each participant/team will have access to a computer with a C compiler.",
        "The competition duration is 2 hours (10:00 AM - 12:00 PM).",
        "Solutions will be judged on correctness, efficiency, and code quality.",
        "Any form of plagiarism will lead to immediate disqualification.",
        "The judges' decision will be final and binding."
      ],
      registration: ["Online registration through college portal", "On-spot registration available until 9:30 AM"],
      queries: {
        "Anjali": "7420949831",
        "Event Coordinator": "CSE Department Office"
      },
    },
  },
  {
    id: 2,
    name: "CODEFUSION",
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
        "Participants can use any of the allowed languages: C, C++, Java, or Python.",
        "Each problem has specific language constraints that must be followed.",
        "Teams of maximum 2 members are allowed.",
        "Duration: 3 hours (10:00 AM - 1:00 PM).",
        "Internet access is prohibited during the competition.",
        "Participants must bring their own laptops with required compilers/IDEs installed.",
        "Scoring is based on number of problems solved and time taken.",
        "The decision of the judges will be final."
      ],
      registration: ["Register through department website", "Team registration must include both members' details"],
      queries: {
        "Avinash": "8080263597",
        "Technical Support": "CSE Lab In-charge"
      },
    },
  },
  {
    id: 3,
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
      rules: [
        "Projects can be software-based, hardware-based, or IoT applications.",
        "Teams of 2-4 members are allowed.",
        "Each team gets 10 minutes for presentation and 5 minutes for Q&A.",
        "Projects must be original work of the participating students.",
        "All necessary equipment must be arranged by participants.",
        "Project documentation must be submitted during registration.",
        "Judging criteria: Innovation (40%), Implementation (30%), Presentation (20%), Documentation (10%).",
        "Final year projects are not eligible for participation."
      ],
      registration: ["Submit project abstract by 25th February", "Final registration at CSE department"],
      queries: {
        "Nikhil": "8484894757",
        "Project Coordinator": "CSE HOD Office"
      },
    },
  },
  {
    id: 4,
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
        "Treasure Hunt is an exciting puzzle-solving game where participants follow clues, solve riddles, and complete challenges to find hidden treasures. The event combines logical thinking, teamwork, and creativity in a fun and engaging format.",
      rules: [
        "Teams of 3-5 members must register together.",
        "The hunt begins at 10:00 AM sharp from the CSE department.",
        "Clues will lead to various locations across the campus.",
        "No mobile phones or external help is allowed during the hunt.",
        "All team members must stay together throughout the event.",
        "The first team to find all treasures and return to starting point wins.",
        "Any form of cheating will result in disqualification.",
        "Participants must respect college property and rules."
      ],
      registration: ["Team registration at CSE department counter", "Registration closes at 9:30 AM"],
      queries: {
        "Dipali": "8446343302",
        "Event Head": "Sports & Cultural Committee"
      },
    },
  },
];
export const MECH_EVENTS: Event[] = [];
export const ECE_EVENTS: Event[] = [];
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
    type: "Event",
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
    type: "Event",
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
    type: "Event",
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
  // "MECH": MECH_EVENTS,
  // "ECE": ECE_EVENTS,
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
