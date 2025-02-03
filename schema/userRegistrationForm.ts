import { z } from "zod";

export const userRegistrationFormSchema = z.object({
  collegeName: z.string(),
  studentName: z.string(),
  events: z
    .enum([
      "Startup Sphere",
      "Face To Face",
      "Python Worriors",
      "FireFire Battleship",
      "AI Tales",
    ])
    .refine((value) => value !== undefined, {
      message: "Please select an event",
    }),
  payss: z
    .instanceof(File)
    .refine((file) => file.size <= 250 * 1024, "Image must be 250kb or smaller")
    .refine((file) => file.type.startsWith("image/"), "File must be an image"),
});
