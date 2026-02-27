import { z } from "zod";

const indianPhoneRegex = /^(?:\+91|91)?[6-9]\d{9}$/;

// Define event-specific schemas
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

const faceToFaceSchema = z.object({
  studentName: z.string({ required_error: "Student name is required" }),
  contactNumber: z
    .string({ required_error: "Contact Number is required" })
    .regex(indianPhoneRegex, "Enter valid contact number"),
  email: z
    .string({ required_error: "Email is required" })
    .email("Enter valid email address"),
});

const fireFireBattleshipSchema = z.object({
  squadName: z
    .string({ required_error: "Squad name is required" })
    .min(1, "Squad name is required"),
  players: z
    .array(
      z.object({
        playerName: z
          .string({ required_error: "Name is required" })
          .min(1, "Player name is required"),
        bgmiId: z
          .string({ required_error: "BGMI ID is required" })
          .min(1, "BGMI ID is required"),
        email: z
          .string({ required_error: "Squad Leader email address is required" })
          .email("Invalid email address")
          .optional(),
        contactNumber: z
          .string({
            required_error: "Squad Leader contact number is required",
          })
          .regex(indianPhoneRegex, "Enter valid contact number")
          .optional(),
      })
    )
    .length(4, "Exactly 4 players are required")
    .refine((players) => !!players[0]?.email, {
      message: "Squad leader's email is required",
      path: [0, "email"],
    })
    .refine((players) => !!players[0]?.contactNumber, {
      message: "Squad leader's contact number is required",
      path: [0, "contactNumber"],
    }),
});

const pythonWorriorsSchema = z.object({
  studentName: z.string().min(1, "Name is required"),
  contactNumber: z
    .string()
    .min(10, "Contact number must be at least 10 digits"),
  email: z.string().email("Invalid email address"),
});

const aiTalesSchema = pythonWorriorsSchema;
const generalEngineeringTechnicalSchema = pythonWorriorsSchema;
const civilTechnicalSchema = pythonWorriorsSchema;
const cseTechnicalSchema = pythonWorriorsSchema;
const mechTechnicalSchema = pythonWorriorsSchema;

const codefusionSchema = pythonWorriorsSchema.extend({
  participant2: z
    .object({
      studentName: z.string().min(1, "Name is required"),
      contactNumber: z
        .string()
        .min(10, "Contact number must be at least 10 digits"),
      email: z.string().email("Invalid email address"),
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

// Add this before the main schema
const paymentModeSchema = z.object({
  paymentMode: z.enum(["ONLINE", "OFFLINE"], {
    required_error: "Please select a payment mode",
  }),
});

// Main schema with event selection
export const userRegistrationFormSchema = z
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
    paymentMode: z.enum(["ONLINE", "OFFLINE"], {
      required_error: "Please select a payment mode",
    }),
    department: z.enum(
      ["AIML", "CSE", "MECHANICAL", "CIVIL", "ENTC", "OTHER"],
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
        .merge(pythonWorriorsSchema),
      z.object({ events: z.literal("BGMI") }).merge(fireFireBattleshipSchema),
      z
        .object({ events: z.literal("FreeFire") })
        .merge(fireFireBattleshipSchema),
      z.object({ events: z.literal("AI Tales") }).merge(aiTalesSchema),
      z
        .object({ events: z.literal("ENTC Project Expo") })
        .merge(pythonWorriorsSchema),
      z
        .object({ events: z.literal("Digital Dangal") })
        .merge(pythonWorriorsSchema),
      z
        .object({ events: z.literal("Snap & Shine") })
        .merge(pythonWorriorsSchema),
      z
        .object({ events: z.literal("Techno Science Quiz") })
        .merge(generalEngineeringTechnicalSchema),
      z
        .object({ events: z.literal("Poster Competition") })
        .merge(generalEngineeringTechnicalSchema),
      z
        .object({ events: z.literal("SciTech Model Expo 2K26") })
        .merge(generalEngineeringTechnicalSchema),
      z
        .object({ events: z.literal("General Engineering Games") })
        .merge(generalEngineeringGamesBundleSchema),
      z
        .object({ events: z.literal("Model Making") })
        .merge(civilTechnicalSchema),
      z.object({ events: z.literal("CAD Master") }).merge(civilTechnicalSchema),
      z
        .object({ events: z.literal("Videography") })
        .merge(civilTechnicalSchema),
      z.object({ events: z.literal("CODEFUSION") }).merge(codefusionSchema),
      z.object({ events: z.literal("Project Expo") }).merge(cseTechnicalSchema),
      z
        .object({ events: z.literal("Treasure Hunt") })
        .merge(cseTechnicalSchema),
      z
        .object({ events: z.literal("Mech Project Expo") })
        .merge(mechTechnicalSchema),
      z
        .object({ events: z.literal("Mech Junk Yard") })
        .merge(mechTechnicalSchema),
      z
        .object({ events: z.literal("Mech IPL Auction") })
        .merge(mechTechnicalSchema),
    ])
  );
