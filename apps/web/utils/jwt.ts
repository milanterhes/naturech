import { getSanitizedConfig } from "@naturechill/utils";
import { sign, verify } from "jsonwebtoken";
import { z } from "zod";

interface Env {
  JWT_SECRET: string;
}

const config = getSanitizedConfig<Env>({
  JWT_SECRET: process.env.JWT_SECRET ?? "",
});

const tokenPayloadSchema = z.object({
  email: z.string().email().nonempty("Email is required"),
});

export function makeToken(email: string) {
  const payload = tokenPayloadSchema.parse({
    email,
  });
  const token = sign(payload, config.JWT_SECRET, {
    expiresIn: "24h",
  });

  return token;
}

export function verifyToken(token: string) {
  const verified = verify(token, config.JWT_SECRET);

  const payload = tokenPayloadSchema.parse(verified);

  return payload;
}
