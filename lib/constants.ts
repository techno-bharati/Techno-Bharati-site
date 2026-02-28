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
    name: "Python Frontiers",
    slug: "python-frontiers",
    department: "CSE (AIML)",
    date: "25th March 2026",
    time: "9:15 AM - 4:15 PM",
    venue: "Bharati Vidyapeeth College of Engineering, Kolahpur",
    entryFee: `${EVENT_FEES.PYTHON_FRONTIERS.amount} (per person)`,
    type: "Technical Event",
    icon: "/event-card/aiml/python-frontiers.jpeg",
    modalData: {
      eventName: "Python Frontiers",
      description:
        "A high-intensity inter-college coding battle designed to push your Python skills to the limit. Solve real-world challenges, optimize your code, and prove your supremacy in the coding arena!",
      rules: [
        "Group entries are not allowed for event",
        "Round 1: Aptitude, 60 MCQ- 60 minutes",
        "Round 2: Coding, 2 questions – 1 hr 10 mins",
        "Entry fee Rs. 100 per head",
      ],
      registration: [
        "Participants must register before the deadline: 24th March 2026, 5:00 PM.",
        "Individual entries only. Team participation is not allowed.",
        "Spot registrations are allowed until 25th March 2026, 11:00 AM on the event day.",
        "Entry fee: ₹100 (per person)",
        "Participants must provide a valid email ID and contact number during registration.",
        "Late registrations will not be entertained after the cutoff time.",
      ],
      queries: {
        "mrs. k. p. kulkarni": "9284319582",
        "abhishek dwivedi": "9721802017",
      },
    },
  },
  {
    id: 2,
    name: "Face To Face",
    slug: "face-to-face",
    department: "CSE (AIML)",
    date: "25th March 2026",
    time: "9:15 AM - 4:15 PM",
    venue: "Bharati Vidyapeeth College of Engineering, Kolahpur",
    entryFee: `${EVENT_FEES.FACE_TO_FACE.amount} (per person)`,
    type: "Non-Technical Event",
    icon: "/event-card/aiml/face-to-face.jpeg",
    modalData: {
      eventName: "Face To Face",
      description:
        "The AIML Department of Bharati Vidyapeeth's College of Engineering, Kolhapur presents Face to Face, an engaging competition as part of Techno Bharti 2026- Infusion AI! ",
      rules: [
        "Group entries are not allowed for this event",
        "Participants must bring hard copy of their updated resume",
        "Three Rounds:",
        "I.	1st  round:  Aptitude Test",
        "II. 2nd  round  Group Discussion",
        "III.	3rd round is Technical and Personal Interview",
      ],
      registration: [
        "Participants must register before the deadline: 25th March 2026, 5:00 PM.",
        "Individual entries only. Team participation is not allowed.",
        "Spot registrations are allowed until 25th March 2026, 11:00 AM on the event day.",
        "Entry fee: ₹100 (per person)",
        "Participants must provide a valid email ID and contact number during registration.",
        "Late registrations will not be entertained after the cutoff time. ",
      ],
      queries: {
        "Mr. N. S. Kadam": "8888596218",
        "Ms. Samiksha Sawant": "7387700731",
      },
    },
  },
  {
    id: 3,
    name: "BGMI",
    slug: "bgmi",
    department: "CSE (AIML)",
    date: "25th March 2026",
    time: "9:15 AM - 4:15 PM",
    venue: "Bharati Vidyapeeth College of Engineering, Kolahpur",
    entryFee: `${EVENT_FEES.BGMI.amount} (per team)`,
    type: "Non-Technical Event",
    icon: "/event-card/aiml/bgmi.jpeg",
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
        "Participants must register before the d'eadline: 27th February 2025, 5:00 PM.",
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
        "Mr. S. A. Patil": "9604825500",
        "Mr. Omkar Sawant": "9322265296",
      },
    },
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
        "Mrs. R. M. Mane": "8329363983",
        "avishkar kamble": "9359984873",
      },
    },
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
    modalData: {
      eventName: "Project Expo",
      description:
        "Project Expo showcases innovative software and hardware projects developed by students. This event provides a platform for students to demonstrate their technical skills, creativity, and practical implementation of computer science concepts in real-world applications.",
      rules: ["Minmum presenstation time: 10 minutes"],
      registration: ["Entry Fee Rs. 100 per participant"],
      queries: {
        "Mrs. R. V. Jadhav": "8446486709",
        "subhan modak": "7507088006",
      },
    },
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
    modalData: {
      eventName: "Treasure Hunt",
      description:
        "Treasure Hunt is a team based game where two teams of 5 players each compete to win the game.",
      rules: ["Maximum 5 participants"],
      registration: ["Entry Fee Rs. 100 per participant"],
      queries: {
        "Mr. V. D. Chougule": "9762881167",
        "Akshta Patil": "8530892178",
      },
    },
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
    venue: "Bharati Vidyapeeth College of Engineering, Kolahpur",
    entryFee: "100",
    type: "Technical Event",
    icon: "/event-card/mech/ipl-auction.png",
    modalData: {
      eventName: "Mech IPL Auction",
      description: "Showcase your innovative engineering projects...",
      rules: [
        "Team Composition: Each team must consist of a minimum of 3 members and       a maximum of 4 members, with one Team Leader. ",
        " Bidding Process: Teams will bid on players using a virtual budget, with each bid having a countdown timer. The highest bidder wins the player.",
        "Evaluation: Teams will be evaluated based on their strategic choices and squad composition during the auction.",
      ],
      registration: [],
      queries: {
        "Mr.R.B.Lokapure": "9860259513",
        "Pratik Toraskar": "7057855701",
      },
    },
  },
  {
    id: 2,
    name: "Junk Yard",
    slug: "mech-junk-yard",
    department: "Mechanical Engineering",
    date: "25th March 2026",
    time: "9:15 AM - 4:15 PM",
    venue: "Bharati Vidyapeeth College of Engineering, Kolahpur",
    entryFee: "100",
    type: "Non-Technical Event",
    icon: "/event-card/mech/junk-yard.png",
    modalData: {
      eventName: "Mech Junk Yard",
      description: "Showcase your innovative engineering projects...",
      rules: [
        "Team Size: Each team can consist of maximum 3 member’s charges will be 100rs for each participant",
        "Phase I: Idea exploration: Teams will be given [15-30] minutes to think and select their raw materials from the designated 'theme'",
        "Phase II: The Build: Teams have [1-2] hours to assemble your model",
        "Phase III: The Showdown: Teams will demonstrate their creations and the result will be decided by the respected judges on the basis of performance creative ideas and your presentation",
      ],
      registration: [],
      queries: {
        "Mr. A. R. Jadhav": "9503960959",
        "Shubh Yadav": "7666014807",
      },
    },
  },
  {
    id: 3,
    name: "Project Competition",
    slug: "mech-project-expo",
    department: "Mechanical Engineering",
    date: "25th March 2026",
    time: "9:15 AM - 4:15 PM",
    venue: "Bharati Vidyapeeth College of Engineering, Kolahpur",
    entryFee: "100",
    type: "Technical Event",
    icon: "/event-card/mech/project-expo.png",
    modalData: {
      eventName: "Mech Project Expo",
      description: "Showcase your innovative engineering projects...",
      rules: [
        "The project expo is open to B.Tech students (all years )",
        "Each team should consist of max. 5 and min. 2 members",
        "All participants must carry their college ID",
        "Working model/prototype (if applicable)",
        "5–10 minutes for presentation and 3–5 minutes for Q&A",
        "Organizers reserve the right to modify rules if necessary",
      ],
      registration: [],
      queries: {
        "Dr. P. B. Patole": "7755900251",
        "Avishkar Shelke": "9960994830",
      },
    },
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
    modalData: {
      eventName: "ENTC Project Expo",
      description: "Showcase your innovative engineering projects...",
      rules: [
        "Students must carry a valid ID card of their College/University",
        "Registration is not accepted until the fee receipt is shown",
        "Team size: Minimum 3 participants, Maximum 4 participants",
        "The organizers will provide only electric power supply of 230V AC mains",
        "Every team should report to the venue on time",
        "Each team will have: 8–10 minutes for Project Presentation & 5 minutes for Q&A session",
        "Judge's decision is final and binding",
        "Project can be in the form of: Innovative working model Hardware + Software based project",
        "All registered participants will receive certificates",
      ],
      registration: [],
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
    date: "25th March 2026",
    time: "9:15 AM - 4:15 PM",
    venue: "Bharati Vidyapeeth's College of Engineering Kolhapur",
    entryFee: `${EVENT_FEES.ENTC_DIGITAL_DANGAL.amount} (per person)`,
    type: "Technical Event",
    icon: "/event-card/entc/digital-dangal.png",
    modalData: {
      eventName: "Digital Dangal",
      description: "A competitive digital challenge...",
      rules: [
        "Students must carry a valid ID card of their College/University",
        "Report before half an hour of event time for first round",
        "Registration is not accepted until the fee receipt is shown",
        "Each team can have maximum 2 participants",
        "Contest will be conducted in two rounds",
        "Round 1: Tech Dangal Quiz (MCQ Round) – Basics of C, C++, Python",
        "Time limit for Round 1: 30 minutes",
        "Top 5 groups are shortlisted for Round 2",
        "Round 2: Code Dangal – Speed + logic coding competition",
        "Allowed languages: C / C++ / Python",
        "Internet not allowed in Round 2",
        "Time limit for Round 2: 30 minutes",
        "Output correctness + execution time decides winner",
      ],
      registration: [],
      queries: {
        "Ms. P. S. Mali": "9822253638",
        "Tirtha Patil": "9529581163",
      },
    },
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
    modalData: {
      eventName: "Snap & Shine",
      description: "Capture the best moments...",
      rules: [
        "The reel must be created within the given 45-minute time limit",
        "Participants must strictly adhere to the topic provided",
        "Topic: Will be given on the spot",
        "Reel duration should not be less than 1 minute and not exceed 2 minutes",
        "Any inappropriate or copyrighted content may lead to disqualification",
        "Judges' decision will be final",
        "Judging Criteria: Creativity & Originality, Relevance to the Topic, Presentation & Editing, Impact & Engagement",
        "Awards: Winner & Runner-Up (Based on Judges' Decision)",
        "Quick Summary: Preparation Time: 45 Minutes, Reel Duration: 1 to 2 Minutes",
      ],
      registration: [],
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
    date: "25th March 2026",
    time: "9:15 AM - 4:15 PM",
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
      registration: [],
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
    date: "25th March 2026",
    time: "9:15 AM - 4:15 PM",
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
      registration: [],
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
    date: "25th March 2026",
    time: "9:15 AM - 4:15 PM",
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
      registration: [],
      queries: {
        "miss. gaouri jangale": "9730875796",
        "mr. suyash more": "9765152033",
      },
    },
  },
  {
    id: 4,
    name: "FreeFire",
    slug: "freefire",
    department: "General Engineering",
    date: "25th March 2026",
    time: "9:15 AM - 4:15 PM",
    venue: "Bharati Vidyapeeth College of Engineering, Kolahpur",
    entryFee: `${EVENT_FEES.FREEFIRE.amount} (per team)`,
    type: "Non-Technical Event",
    modalData: {
      eventName: "FreeFire",
      description:
        "Welcome to the ultimate FreeFire Battle Squad Tournament! Get ready to showcase your skills, strategy, and teamwork in an intense battle royale competition. Compete against top squads and fight for glory and exciting rewards!",
      rules: [
        "Only registered players are allowed to participate.",
        "Players must join the custom room within the given time; late entries will not be allowed.",
        "Internet issues are the player's responsibility. Matches will not be restarted due to disconnections.",
        "Use of emulators, hacks, or third-party software is strictly prohibited and will lead to an instant ban.",
      ],
      registration: [
        "Participants must register before the deadline: 25th March 2026, 5:00 PM.",
        "Spot registrations are allowed until 25th March 2026, 11:00 AM on the event day.",
        "Entry fee: ₹100 (per team)",
        "Participants must provide a valid email ID and contact number during registration.",
        "Late registrations will not be entertained after the cutoff time.",
        "Registration Format:",
        "🔹 Player Name",
        "🔹 FreeFire ID",
        "🔹 Squad Name (if applicable)",
        "🔹 Contact Number",
      ],
      queries: {
        "Mr. Tejas Kadam": "8625961194",
        "Mr. Soham Humbre": "8007267372  ",
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
    date: "25th March 2026",
    time: "9:15 AM - 4:15 PM",
    venue: "Bharati Vidyapeeth College of Engineering, Kolahpur",
    entryFee: "100",
    type: "Technical Event",
    icon: "/event-card/civil/model-making.png",
    modalData: {
      eventName: "Model Making",
      description: "ask for the event description",
      rules: [
        "Problem Statement: Design and construct a tower model using Popsicle (ice-cream) sticks as per the given rules",
        "Materials Allowed: Popsicle sticks only",
        "Materials Allowed: Fevicol (synthetic resin adhesive) only",
        "Materials Allowed: Thick cardboard for base and top",
        "Materials Allowed: Sticks may be cut or trimmed",
        "Use of any other material will lead to disqualification",
        "Construction: Square plan throughout height",
        "Plan Size: 100 mm × 100 mm (±5 mm)",
        "Height: 300 mm (±5 mm)",
        "Maximum Weight: 100 g (including cardboard)",
        "Bracing: Single or double cross bracing allowed",
      ],
      registration: [],
      queries: {
        "Mr. Rajwardhan Ghorpadey": "9371936119",
        "atharv vishnu patil": "9146205055",
        "vedant rajesh chavan": "9607082006",
      },
    },
  },
  {
    id: 2,
    name: "Battle of Brains",
    slug: "battle-of-brains",
    department: "Civil",
    date: "25th March 2026",
    time: "9:15 AM - 4:15 PM",
    venue: "Bharati Vidyapeeth College of Engineering, Kolahpur",
    entryFee: `${EVENT_FEES.CE_BATTLE_OF_BRAINS.amount} (per person)`,
    type: "Non-Technical Event",
    icon: "/event-card/civil/battle-of-brains.png",
    modalData: {
      eventName: "Battle of Brains",
      description: "ask for",
      rules: [
        "2 Members per Team (No Changes Allowed)",
        "Registered Teams Only",
        "Report 15 Minutes Early",
        "No Mobiles / Smart Gadgets",
        "Quiz Master's Decision is Final",
        "Misconduct = Disqualification",
        "ROUND 1: Screening (MCQ Round)",
        "ROUND 2: Rapid Fire",
        "ROUND 3: Visual / Audio Round",
        "Final Buzzer Round",
        "Winner: Highest Total Score",
        "Tie-Breaker: 3 Buzzer Questions",
      ],
      registration: [],
      queries: {
        "Ms. Ashwini Pujari": "7972101686",
        "Ms. Yogita Katkar": "9699770988",
        "Mr.Atharv Misal": "94211 84675",
      },
    },
  },
  {
    id: 3,
    name: "CAD Master",
    slug: "cad-master",
    department: "Civil",
    date: "25th March 2026",
    time: "9:15 AM - 4:15 PM",
    venue: "Bharati Vidyapeeth College of Engineering, Kolahpur",
    entryFee: "100",
    type: "Technical Event",
    icon: "/event-card/civil/cad-master.png",
    modalData: {
      eventName: "CAD Master",
      description: "ask for the event description",
      rules: [
        "ROUND 1: Aptitude Test (Elimination)",
        "Basic CAD Knowledge",
        "30 MCQs | 30 Marks",
        "Time: 30 Minutes",
        "Offline Test",
        "Venue: Digital Classroom (Civil Dept.)",
        "Top Scorers Qualify",
        "ROUND 2: Drawing Test",
        "Design a Residential Building",
        "Criteria (Plot Area, FSI, etc.) Given 15 Minutes Before",
        "Draw: Floor Plan, Elevation & Section",
        "Software: Autodesk AutoCAD",
        "Time: 60 Minutes",
      ],
      registration: [],
      queries: {
        "Ms. Prajakta Patil": "8080158082",
        "Mr. Pratik Khade": "8625834216",
      },
    },
  },
  {
    id: 4,
    name: "Videography",
    slug: "videography",
    department: "Civil",
    date: "25th March 2026",
    time: "9:15 AM - 4:15 PM",
    venue: "Bharati Vidyapeeth College of Engineering, Kolahpur",
    entryFee: `${EVENT_FEES.CE_VIDEOGRAPHY.amount} (per person)`,
    type: "Non-Technical Event",
    icon: "/event-card/civil/videography.png",
    modalData: {
      eventName: "Videography",
      description: "ask for the event description",
      rules: [
        "Each team can have maximum two participants",
        "Competition will be conducted in single round",
        "The reel must be an original creation",
        "The video should not exceed 60 seconds",
        "Please use one medium of language for the reels/video",
        "The submissions can be in English/Hindi/Marathi",
        "Decision made by the judges will be final and abide on them",
        "No interference will be tolerated",
      ],
      registration: [],
      queries: {
        "Abhishek Gadgil": "7058001775",
        "Vikas Chavan": "7619338379",
      },
    },
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
  "/event/event-3.jpg",
  "/event/event-7.jpg",
  "/event/event-12.jpeg",
  "/event/event-15.jpeg",
  "/event/event-18.jpeg",
  "/event/event-21.jpeg",
  "/event/event-24.jpeg",
  "/event/event-28.jpeg",
  "/event/event-33.jpeg",
  "/event/event-35.jpg",
];

export const Sponsors = [
  { src: "/sponsers/sponser.jpeg", alt: "Sponsor 1", bg: false },
  { src: "/sponsers/sponser2.jpeg", alt: "Sponsor 2", bg: false },
  { src: "/sponsers/gfg.png", alt: "GeeksForGeeks", bg: true },
];
