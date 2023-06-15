import { getSanitizedConfig } from "@naturechill/utils";
import { router } from "../trpc";
import { Resend } from "resend";
import { z } from "zod";
import { prisma } from "../prisma";
import { publicProcedure } from "../trpc";

interface Env {
  RESEND_API_KEY: string;
}

const config = getSanitizedConfig<Env>({
  RESEND_API_KEY: process.env.RESEND_API_KEY,
});

const resend = new Resend(config.RESEND_API_KEY);

async function sendLoginEmail({ to }: { to: string }) {
  await resend.sendEmail({
    from: "onboarding@resend.dev",
    to,
    subject: "na mivan",
    html: "<strong>It works!</strong>",
  });
}

const login = publicProcedure
  .input(
    z.object({
      email: z.string().email().nonempty(),
    })
  )
  .mutation(async ({ input: { email } }) => {
    console.log("email", email);
    const existingUser = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!existingUser) {
      const newUser = await prisma.user.create({
        data: {
          email,
        },
      });

      console.log("sending email to", newUser.email);

      return { message: "done new" };
    }

    await prisma.user.update({
      where: { id: existingUser.id },
      data: {
        lastLoginRequest: new Date(),
      },
    });

    console.log("sending email to", existingUser.email);
    return { message: "done existing" };
  });

export const authRouter = router({ login });
