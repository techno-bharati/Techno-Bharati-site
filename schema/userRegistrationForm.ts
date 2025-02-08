import { z } from "zod";

// Define event-specific schemas
const startupSphereSchema = z.object({
  startupCategory: z.string(),
  numberOfTeamMembers: z.number().min(1).max(5),
  teamLeader: z.object({
    studentName: z.string(),
    contactNumber: z.string(),
    email: z.string().email(),
  }),
  teamName: z.string(),
  teamMembers: z
    .array(
      z.object({
        studentName: z.string().optional(),
        contactNumber: z.string().optional(),
        email: z.string().email().optional(),
      })
    )
    .optional(),
});

const faceToFaceSchema = z.object({
  studentName: z.string(),
  contactNumber: z.string(),
  email: z.string().email(),
});

const fireFireBattleshipSchema = z.object({
  squadName: z.string().min(1, "Squad name is required"),
  players: z
    .array(
      z.object({
        playerName: z.string().min(1, "Player name is required"),
        freeFireId: z.string().min(1, "Free Fire ID is required"),
        contactNumber: z
          .string()
          .min(10, "Contact number must be at least 10 digits"),
        email: z.string().email("Invalid email address").optional(),
      })
    )
    .length(4, "Exactly 4 players are required")
    .refine((players) => players[0].email !== undefined, {
      message: "Squad leader's email is required",
      path: ["players", 0, "email"],
    }),
});

const pythonWorriorsSchema = z.object({
  studentName: z.string().min(1, "Name is required"),
  contactNumber: z
    .string()
    .min(10, "Contact number must be at least 10 digits"),
  email: z.string().email("Invalid email address"),
});

const aiTalesSchema = pythonWorriorsSchema; // Same as Python Warriors

// Main schema with event selection
export const userRegistrationFormSchema = z
  .object({
    collegeName: z.string().min(1, "College name is required"),
    events: z.enum(
      [
        "Startup Sphere",
        "Face To Face",
        "Python Worriors",
        "FreeFire Battleship",
        "AI Tales",
      ],
      {
        required_error: "Please select an event",
      }
    ),
    payss: z
      .instanceof(File, { message: "Payment screenshot is required" })
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
        .object({ events: z.literal("Python Worriors") })
        .merge(pythonWorriorsSchema),
      z
        .object({ events: z.literal("FreeFire Battleship") })
        .merge(fireFireBattleshipSchema),
      z.object({ events: z.literal("AI Tales") }).merge(aiTalesSchema),
    ])
  );
