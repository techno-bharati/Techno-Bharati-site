import { z } from "zod";

export const userRegistrationFormSchema = z.object({
  collegeName: z.string(),
  events: z.enum([
    "Startup Sphere",
    "Face To Face",
    "Python Worriors",
    "FireFire Battleship",
    "AI Tales",
  ]),
  studentName: z.string().optional(),
  contactNumber: z.string().optional(),
  email: z.string().email().optional(),
  numberOfTeamMembers: z
    .number()
    .min(1, "At least 1 team member is required")
    .max(4, "Maximum of 4 team members allowed (including team leader)")
    .optional(),
  teamLeader: z
    .object({
      studentName: z.string(),
      contactNumber: z.string(),
      email: z.string().email(),
    })
    .optional(),
  teamMembers: z
    .array(
      z.object({
        studentName: z.string(),
        contactNumber: z.string(),
        email: z.string().email(),
      })
    )
    .optional(),
  teamName: z.string().optional(),
  squadName: z.string().optional(),
  players: z
    .array(
      z.object({
        playerName: z.string(),
        freeFireId: z.string(),
        contactNumber: z.string(),
      })
    )
    .optional(),
  payss: z
    .instanceof(File)
    .refine((file) => file.size <= 250 * 1024, "Image must be 250kb or smaller")
    .refine((file) => file.type.startsWith("image/"), "File must be an image"),
});
