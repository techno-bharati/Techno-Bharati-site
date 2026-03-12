import { z } from "zod";

const indianPhoneRegex = /^(?:\+91|91)?[6-9]\d{9}$/;

const startupSphereSchema = z.object({
  startupCategory: z.string(),
  numberOfTeamMembers: z.number().min(1).max(5),
  teamLeader: z.object({
    studentName: z.string(),
    contactNumber: z
      .string()
      .regex(indianPhoneRegex, "Enter valid contact number"),
    email: z.string().email("Enter valid email address"),
  }),
  teamName: z.string(),
  teamMembers: z
    .array(
      z.object({
        studentName: z.string().optional(),
        contactNumber: z
          .string()
          .regex(indianPhoneRegex, "Enter valid contact number")
          .optional(),
        email: z.string().email("Enter valid email address").optional(),
      })
    )
    .optional(),
});

const playerBase = z.object({
  playerName: z.string().min(1, "Player name is required").optional(),
  bgmiId: z.string().min(1, "FreeFire ID is required").optional(),
  email: z
    .string({ required_error: "Squad Leader email address is required" })
    .email("Invalid email address")
    .optional(),
  contactNumber: z
    .string({ required_error: "Squad Leader contact number is required" })
    .regex(indianPhoneRegex, "Enter valid contact number")
    .optional(),
});

const requiredPlayerSchema = z.object({
  playerName: z
    .string({ required_error: "Name is required" })
    .min(1, "Player name is required"),

  bgmiId: z
    .string({ required_error: "FreeFire ID is required" })
    .min(1, "FreeFire ID is required"),
});

const squadLeaderSchema = requiredPlayerSchema.extend({
  email: z
    .string({ required_error: "Squad Leader email address is required" })
    .email("Invalid email address"),

  contactNumber: z
    .string({
      required_error: "Squad Leader contact number is required",
    })
    .regex(indianPhoneRegex, "Enter valid contact number"),
});

const optionalPlayerSchema = z.object({
  playerName: z.string().optional(),
  bgmiId: z.string().optional(),
});

export const freeFireBattleshipSchema = z.object({
  squadName: z
    .string({ required_error: "Squad name is required" })
    .min(1, "Squad name is required"),

  players: z.tuple([
    squadLeaderSchema,
    requiredPlayerSchema,
    requiredPlayerSchema,
    requiredPlayerSchema,
    optionalPlayerSchema,
  ]),
});

const bgmiRequiredPlayerSchema = z.object({
  playerName: z
    .string({ required_error: "Name is required" })
    .min(1, "Player name is required"),
  bgmiId: z
    .string({ required_error: "BGMI ID is required" })
    .min(1, "BGMI ID is required"),
});

const bgmiSquadLeaderSchema = bgmiRequiredPlayerSchema.extend({
  email: z
    .string({ required_error: "Squad Leader email address is required" })
    .email("Invalid email address"),
  contactNumber: z
    .string({ required_error: "Squad Leader contact number is required" })
    .regex(indianPhoneRegex, "Enter valid contact number"),
});

const bgmiOptionalPlayerSchema = z.object({
  playerName: z.string().optional(),
  bgmiId: z.string().optional(),
});

const bgmiSchema = z.object({
  squadName: z
    .string({ required_error: "Squad name is required" })
    .min(1, "Squad name is required"),
  players: z.tuple([
    bgmiSquadLeaderSchema,
    bgmiRequiredPlayerSchema,
    bgmiRequiredPlayerSchema,
    bgmiRequiredPlayerSchema,
    bgmiOptionalPlayerSchema,
  ]),
});

const standardRegistrationSchema = z.object({
  studentName: z.string({ required_error: "Student name is required" }),
  contactNumber: z
    .string({ required_error: "Contact Number is required" })
    .regex(indianPhoneRegex, "Enter valid contact number"),
  email: z
    .string({ required_error: "Email is required" })
    .email("Enter valid email address"),
  teamName: z.string().optional(),
});

const participantSchema = z.object({
  studentName: z
    .string({ required_error: "Student name is required" })
    .min(1, "Name is required"),
  contactNumber: z
    .string()
    .regex(indianPhoneRegex, "Enter valid contact number")
    .or(z.literal(""))
    .optional(),
  email: z.string().email("Invalid email").or(z.literal("")).optional(),
});

const faceToFaceSchema = standardRegistrationSchema;
const aiTalesSchema = standardRegistrationSchema;
const generalEngineeringTechnicalSchema = standardRegistrationSchema;
const civilTechnicalSchema = standardRegistrationSchema;

const treasureHuntSchema = standardRegistrationSchema.extend({
  teamName: z.string().min(1, "Team name is required"),
  participant2: participantSchema.optional(),
  participant3: participantSchema.optional(),
  participant4: participantSchema.optional(),
  participant5: participantSchema.optional(),
});

const projectExpoSchema = standardRegistrationSchema.extend({
  teamName: z
    .string({ required_error: "Team name is required" })
    .min(1, "Team name is required"),
  numberOfTeamMembers: z
    .number()
    .min(2, "Minimum 2 team members are required")
    .max(5, "Maximum 5 team members are allowed"),
  participant2: participantSchema,
  participant3: participantSchema.optional(),
  participant4: participantSchema.optional(),
  participant5: participantSchema.optional(),
});

const mechJunkYardSchema = standardRegistrationSchema.extend({
  teamName: z
    .string({ required_error: "Team name is required" })
    .min(3, "Team name should be atleast 3 characters long"),
  numberOfTeamMembers: z
    .number()
    .min(2, "Minimum 2 team members are required")
    .max(3, "Maximum 3 team members are allowed"),
  participant2: participantSchema,
  participant3: participantSchema.optional(),
});

const mechIplAuctionSchema = standardRegistrationSchema.extend({
  teamName: z
    .string({ required_error: "Team name is required" })
    .min(1, "Team name is required"),
  numberOfTeamMembers: z
    .number()
    .min(3, "Minimum 3 team members are required")
    .max(4, "Maximum 4 team members are allowed"),
  participant2: participantSchema,
  participant3: participantSchema,
  participant4: participantSchema.optional(),
});

const mechProjectExpoSchema = projectExpoSchema;
const cseProjectExpoSchema = projectExpoSchema;

const codefusionSchema = standardRegistrationSchema.extend({
  teamName: z
    .string({ required_error: "Team name is required" })
    .min(1, "Team name is required"),
  participant2: z
    .object({
      studentName: z.string().min(1, "Name is required"),
      contactNumber: z.union([
        z.literal(""),
        z.string().regex(indianPhoneRegex, "Enter valid contact number"),
      ]),
      email: z
        .string()
        .email("Invalid email address")
        .or(z.literal(""))
        .optional(),
    })
    .optional(),
});

const generalEngineeringGamesBundleSchema = z.object({
  selectedGames: z
    .array(z.string().min(1))
    .refine((arr) => arr.length === 3 || arr.length === 5, {
      message: "Please select exactly 3 games (₹100) or 5 games (₹150)",
    }),
  groupName: z.string().optional(),
  studentName: z.string().min(1, "Name is required"),
  contactNumber: z
    .string()
    .min(10, "Contact number must be at least 10 digits"),
  email: z.string().email("Invalid email address"),
});

const entcProjectExpoSchema = projectExpoSchema;
const entcDigitalDangalSchema = codefusionSchema;

const battleOfBrainsSchema = standardRegistrationSchema.extend({
  teamName: z
    .string({ required_error: "Team name is required" })
    .min(1, "Team name is required"),
  participant2: z.object({
    studentName: z
      .string({ required_error: "Particiapnt 2 name is required" })
      .min(1, "Name is required"),
    contactNumber: z
      .string()
      .regex(indianPhoneRegex, "Enter valid contact number")
      .or(z.literal(""))
      .optional(),
    email: z
      .string({ required_error: "Participant 2 email is required" })
      .email("Invalid email address")
      .or(z.literal(""))
      .optional(),
  }),
});

const posterCompetitonSchema = codefusionSchema;
const sciTechExpoSchema = codefusionSchema;
const snapAndShineSchema = codefusionSchema;
const modelmakingSchema = codefusionSchema;
const videographySchema = codefusionSchema;
const cadmasterSchema = codefusionSchema;

// Add this before the main schema
const paymentModeSchema = z.object({
  paymentMode: z.enum(["ONLINE", "OFFLINE"], {
    required_error: "Please select a payment mode",
  }),
});

// Main schema with event selection
const baseUserRegistrationFormSchema = z
  .object({
    collegeName: z.string().min(1, "College name is required"),
    events: z.enum(
      [
        "Startup Sphere",
        "Face To Face",
        "Python Frontiers",
        "BGMI",
        "FreeFire",
        "AI Tales",
        // ENTC department
        "ENTC Project Expo",
        "Digital Dangal",
        "Snap & Shine",
        // General Engineering (Technical)
        "Techno Science Quiz",
        "Poster Competition",
        "SciTech Model Expo 2K26",
        // General Engineering (Games bundle)
        "General Engineering Games",
        // Civil Engineering
        "Model Making",
        "Battle of Brains",
        "CAD Master",
        "Videography",
        // CSE department
        "CODEFUSION",
        "Project Expo",
        "Treasure Hunt",
        "Mech Project Expo",
        "Mech Junk Yard",
        "Mech IPL Auction",
      ],
      {
        required_error: "Please select an event",
      }
    ),
    participant2: participantSchema.optional(),
    participant3: participantSchema.optional(),
    participant4: participantSchema.optional(),
    participant5: participantSchema.optional(),
    paymentMode: z.enum(["ONLINE", "OFFLINE"], {
      required_error: "Please select a payment mode",
    }),
    department: z.enum(
      [
        "AIML",
        "CSE",
        "MECHANICAL",
        "CIVIL",
        "ENTC",
        "GENERAL ENGINEERING",
        "OTHER",
      ],
      {
        required_error: "Please select a department",
      }
    ),
    class: z.enum(["first year", "second year", "third year", "final year"], {
      required_error: "Please select a class",
    }),
    payss: z
      .instanceof(File, { message: "Payment screenshot/receipt is required" })
      .refine(
        (file) => file.size <= 250 * 1024,
        "Image must be 250kb or smaller"
      )
      .refine(
        (file) => file.type.startsWith("image/"),
        "File must be an image"
      ),
    transactionId: z
      .number()
      .refine(
        (n) =>
          n === undefined ||
          (Number.isInteger(n) && n >= 100_000_000_000 && n <= 999_999_999_999),
        { message: "Transaction ID must be exactly 12 digits" }
      )
      .optional(),
    receiptNumber: z.string().optional(),
  })
  .and(
    // Merge with event-specific schemas based on selection
    z.discriminatedUnion("events", [
      z
        .object({ events: z.literal("Startup Sphere") })
        .merge(startupSphereSchema),
      z.object({ events: z.literal("Face To Face") }).merge(faceToFaceSchema),
      z
        .object({ events: z.literal("Python Frontiers") })
        .merge(standardRegistrationSchema),
      z.object({ events: z.literal("BGMI") }).merge(bgmiSchema),
      z
        .object({ events: z.literal("FreeFire") })
        .merge(freeFireBattleshipSchema),
      z.object({ events: z.literal("AI Tales") }).merge(aiTalesSchema),
      z
        .object({ events: z.literal("ENTC Project Expo") })
        .merge(entcProjectExpoSchema),
      z
        .object({ events: z.literal("Digital Dangal") })
        .merge(entcDigitalDangalSchema),
      z.object({ events: z.literal("Snap & Shine") }).merge(snapAndShineSchema),
      z
        .object({ events: z.literal("Techno Science Quiz") })
        .merge(generalEngineeringTechnicalSchema),
      z
        .object({ events: z.literal("Poster Competition") })
        .merge(posterCompetitonSchema),
      z
        .object({ events: z.literal("SciTech Model Expo 2K26") })
        .merge(sciTechExpoSchema),
      z
        .object({ events: z.literal("General Engineering Games") })
        .merge(generalEngineeringGamesBundleSchema),
      z.object({ events: z.literal("Model Making") }).merge(modelmakingSchema),
      z
        .object({ events: z.literal("Battle of Brains") })
        .merge(battleOfBrainsSchema),
      z.object({ events: z.literal("CAD Master") }).merge(cadmasterSchema),
      z.object({ events: z.literal("Videography") }).merge(videographySchema),
      z.object({ events: z.literal("CODEFUSION") }).merge(codefusionSchema),
      z
        .object({ events: z.literal("Project Expo") })
        .merge(cseProjectExpoSchema),
      z
        .object({ events: z.literal("Treasure Hunt") })
        .merge(treasureHuntSchema),
      z
        .object({ events: z.literal("Mech Project Expo") })
        .merge(mechProjectExpoSchema),
      z
        .object({ events: z.literal("Mech Junk Yard") })
        .merge(mechJunkYardSchema),
      z
        .object({ events: z.literal("Mech IPL Auction") })
        .merge(mechIplAuctionSchema),
    ])
  );

export const userRegistrationFormSchema =
  baseUserRegistrationFormSchema.superRefine((data, ctx) => {
    if (data.events === "Project Expo") {
      const total = data.numberOfTeamMembers;

      if (total >= 3) {
        if (!data.participant3 || !data.participant3.studentName?.trim()) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["participant3", "studentName"],
            message:
              "Member 3 name is required when team has 3 or more members",
          });
        }
      }

      if (total >= 4) {
        if (!data.participant4 || !data.participant4.studentName?.trim()) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["participant4", "studentName"],
            message: "Member 4 name is required when team has 4 members",
          });
        }
      }
    }

    if (data.events === "Mech Project Expo") {
      const total = data.numberOfTeamMembers;

      if (total >= 3) {
        if (!data.participant3 || !data.participant3.studentName?.trim()) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["participant3", "studentName"],
            message:
              "Member 3 name is required when team has 3 or more members",
          });
        }
      }

      if (total >= 4) {
        if (!data.participant4 || !data.participant4.studentName?.trim()) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["participant4", "studentName"],
            message: "Member 4 name is required when team has 4 members",
          });
        }
      }

      if (total >= 5) {
        if (!data.participant5 || !data.participant5.studentName?.trim()) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["participant5", "studentName"],
            message: "Member 5 name is required when team has 4 members",
          });
        }
      }
    }

    if (data.events === "Mech Junk Yard") {
      const total = data.numberOfTeamMembers;
      if (total >= 3) {
        if (!data.participant3 || !data.participant3.studentName?.trim()) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["participant3", "studentName"],
            message: "Member 3 name is required when team has 3 members",
          });
        }
      }
    }

    if (
      data.events === "Mech IPL Auction" ||
      data.events === "ENTC Project Expo"
    ) {
      const total = data.numberOfTeamMembers;
      if (total >= 4) {
        if (!data.participant4 || !data.participant4.studentName?.trim()) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["participant4", "studentName"],
            message: "Member 4 name is required when team has 4 members",
          });
        }
      }
    }

    if (data.paymentMode === "ONLINE") {
      if (data.transactionId === undefined || data.transactionId === null) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["transactionId"],
          message: "Transaction ID is required for online payment",
        });
      } else {
        const n = data.transactionId;
        if (
          !Number.isInteger(n) ||
          n < 100_000_000_000 ||
          n > 999_999_999_999
        ) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["transactionId"],
            message: "Transaction ID must be exactly 12 digits",
          });
        }
      }
    }

    if (data.paymentMode === "OFFLINE") {
      if (!data.receiptNumber || !data.receiptNumber.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["receiptNumber"],
          message: "Receipt number is required for offline payment",
        });
      }
    }
  });
