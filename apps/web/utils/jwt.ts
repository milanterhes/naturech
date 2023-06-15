import { getSanitizedConfig } from "@naturechill/utils";
import { sign, verify } from "jsonwebtoken";

interface Env {
  JWT_SECRET: string;
}

const config = getSanitizedConfig<Env>({
  JWT_SECRET: process.env.JWT_SECRET,
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

  return verified;
}
