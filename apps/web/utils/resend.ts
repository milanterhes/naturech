import { getSanitizedConfig } from "@naturechill/utils";
import { Resend } from "resend";

interface Env {
  RESEND_API_KEY: string;
}

const config = getSanitizedConfig<Env>({
  RESEND_API_KEY: process.env.RESEND_API_KEY ?? "",
});

const resend = new Resend(config.RESEND_API_KEY);

export default resend;
