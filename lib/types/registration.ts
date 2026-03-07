export type Department =
  | "AIML"
  | "CSE"
  | "MECHANICAL"
  | "CIVIL"
  | "ENTC"
  | "GENERAL_ENGINEERING"
  | "OTHER";

export type PaymentMode = "ONLINE" | "OFFLINE";

export type RegistrationStatus =
  | "PENDING"
  | "CONFIRMED"
  | "REJECTED"
  | "CANCELLED";

export type PaymentStatus = "PENDING" | "PAID" | "FAILED" | "REFUNDED";

export type EventName =
  | "Startup Sphere"
  | "Face To Face"
  | "Python Frontiers"
  | "BGMI"
  | "FreeFire"
  | "AI Tales"
  | "ENTC Project Expo"
  | "Digital Dangal"
  | "Snap & Shine"
  | "Techno Science Quiz"
  | "Poster Competition"
  | "SciTech Model Expo 2K26"
  | "General Engineering Games"
  | "Model Making"
  | "Battle of Brains"
  | "CAD Master"
  | "Videography"
  | "CODEFUSION"
  | "Project Expo"
  | "Treasure Hunt"
  | "Mech Project Expo"
  | "Mech Junk Yard"
  | "Mech IPL Auction";

export interface ParticipantFields {
  studentName: string;
  contactNumber: string;
  email?: string;
}

export interface PlayerFields {
  playerName: string;
  bgmiId: string;
  contactNumber?: string;
  email?: string;
}

export type AcademicYear =
  | "first year"
  | "second year"
  | "third year"
  | "final year";

export interface RegistrationFormValues {
  collegeName: string;
  events: EventName | undefined;
  department: Department | undefined;
  otherDepartment?: string;
  class: AcademicYear | undefined;
  paymentMode: PaymentMode | undefined;
  payss: File | undefined;
  transactionId?: number;
  receiptNumber?: string;

  studentName?: string;
  contactNumber?: string;
  email?: string;

  teamName?: string;
  groupName?: string;
  numberOfTeamMembers?: number;

  participant2?: ParticipantFields;
  participant3?: ParticipantFields;
  participant4?: ParticipantFields;
  participant5?: ParticipantFields;

  squadName?: string;
  players?: PlayerFields[];

  startupCategory?: string;

  selectedGames?: string[];
}

export type CreateRegistrationPayload = Omit<
  RegistrationFormValues,
  "payss" | "otherDepartment"
> & {
  paymentScreenshotUrl: string;
};

export interface RegistrationFormProps {
  initialEvent?: EventName;
  initialSelectedGames?: string[];
}

export type EventNameOption =
  | "Startup Sphere"
  | "Face To Face"
  | "Python Frontiers"
  | "BGMI"
  | "FreeFire"
  | "AI Tales"
  | "ENTC Project Expo"
  | "Digital Dangal"
  | "Snap & Shine"
  | "Techno Science Quiz"
  | "Poster Competition"
  | "SciTech Model Expo 2K26"
  | "General Engineering Games"
  | "Model Making"
  | "Battle of Brains"
  | "CAD Master"
  | "Videography"
  | "CODEFUSION"
  | "Project Expo"
  | "Treasure Hunt"
  | "Mech Project Expo"
  | "Mech Junk Yard"
  | "Mech IPL Auction";
