import { getSanitizedConfig } from "@naturechill/utils";
import { sign, verify, decode } from "jsonwebtoken";
import { tokenPayloadSchema } from "../utils/client-jwt";

interface Env {
  JWT_SECRET: string;
}

const config = getSanitizedConfig<Env>({
  JWT_SECRET: process.env.JWT_SECRET ?? "",
});

export function makeToken(email: string) {
  const token = sign(
    {
      email,
    },
    config.JWT_SECRET,
    {
      expiresIn: "24h",
    }
  );

  return token;
}

export function verifyToken(token: string) {
  const verified = verify(token, config.JWT_SECRET);

  const payload = tokenPayloadSchema.parse(verified);

  return payload;
}
