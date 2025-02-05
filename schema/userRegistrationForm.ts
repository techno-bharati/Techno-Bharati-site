import { z } from "zod";

// Define event-specific schemas
const startupSphereSchema = z.object({
  startupCategory: z.string(),
  numberOfTeamMembers: z.number().min(1).max(4),
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
  squadName: z.string(),
  players: z.array(
    z.object({
      playerName: z.string(),
      freeFireId: z.string(),
      contactNumber: z.string(),
    })
  ),
});

const pythonWorriorsSchema = faceToFaceSchema; // Same as Python Worriors
const aiTalesSchema = faceToFaceSchema; // Same as Face to Face

// Main schema with event selection
export const userRegistrationFormSchema = z
  .object({
    collegeName: z.string(),
    events: z.enum([
      "Startup Sphere",
      "Face To Face",
      "Python Worriors",
      "FireFire Battleship",
      "AI Tales",
    ]),
    payss: z
      .instanceof(File)
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
        .object({ events: z.literal("FireFire Battleship") })
        .merge(fireFireBattleshipSchema),
      z.object({ events: z.literal("AI Tales") }).merge(aiTalesSchema),
    ])
  );
