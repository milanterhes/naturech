import { z } from "zod";
import { prisma } from "../prisma";
import { LoginEmail } from "@naturechill/emails";
import { makeToken } from "../jwt";
import { Locale, i18n } from "../../i18n-config";
import { getBaseUrl } from "../../utils/trpc";
import { TRPCError } from "@trpc/server";
import { t } from "../trpc";
import resend from "../../utils/resend";
import logo from "../../public/naturechill-logo.png";

interface LoginEmailInput {
  to: string;
  token: string;
  locale: Locale;
}

function sendLoginEmail({ to, token, locale }: LoginEmailInput) {
  return resend.sendEmail({
    from: "Nature & Chill Treehouses <info@naturechill.hu>",
    to,
    subject: "Login to NatureChill",
    react: LoginEmail({
      logo: `${getBaseUrl()}/${logo.src}`,
      link: `${getBaseUrl()}/api/auth/callback?token=` + token,
      locale,
    }),
  });
}

async function handleLogin(email: string, locale: Locale) {
  const token = makeToken(email);

  try {
    return sendLoginEmail({ to: email, token, locale });
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
      locale: z.enum(i18n.locales),
    })
  )
  .mutation(async ({ input: { email, locale } }) => {
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
        await handleLogin(newUser.email, locale);
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

    await handleLogin(existingUser.email, locale);
    return { message: "done existing" };
  });

export const authRouter = t.router({ login });
