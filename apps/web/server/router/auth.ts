import { getSanitizedConfig } from "@naturechill/utils";
import { Resend } from "resend";
import { z } from "zod";
import { prisma } from "../prisma";
import { LoginEmail } from "@naturechill/emails";
import { makeToken } from "../jwt";
import { Locale } from "../../i18n-config";
import { getBaseUrl } from "../../utils/trpc";
import { TRPCError } from "@trpc/server";
import { t } from "../trpc";
import resend from "../../utils/resend";

interface LoginEmailInput {
  to: string;
  token: string;
  lang: Locale;
}

function sendLoginEmail({ to, token, lang }: LoginEmailInput) {
  return resend.sendEmail({
    from: "Nature & Chill Treehouses <info@naturechill.hu>",
    to,
    subject: "Login to NatureChill",
    react: LoginEmail({
      button: "Login",
      link: `${getBaseUrl()}/api/auth/callback?token=` + token,
      content: "Click the button below to login to NatureChill",
      intro:
        "You have requested a login link to NatureChill. If you did not request this, please ignore this email.",
      lang,
    }),
  });
}

async function handleLogin(email: string, lang: Locale) {
  const token = makeToken(email);

  try {
    return sendLoginEmail({ to: email, token, lang });
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to login",
    });
  }
}

const login = t.procedure
  .input(
    z.object({
      email: z.string().email().nonempty(),
    })
  )
  .mutation(async ({ input: { email } }) => {
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

      try {
        await handleLogin(newUser.email, "en");
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to login",
        });
      }

      return { message: "done new" };
    }

    await prisma.user.update({
      where: { id: existingUser.id },
      data: {
        lastLoginRequest: new Date(),
      },
    });

    await handleLogin(existingUser.email, "en");
    return { message: "done existing" };
  });

export const authRouter = t.router({ login });
