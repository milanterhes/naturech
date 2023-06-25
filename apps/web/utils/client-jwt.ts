import { z } from "zod";

export const tokenPayloadSchema = z.object({
  email: z.string().email().nonempty("Email is required"),
  iat: z.number(),
  exp: z.number(),
});

export type TokenPayload = z.infer<typeof tokenPayloadSchema>;
