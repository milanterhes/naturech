import { z } from "zod";
import { t } from "../trpc";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const sendMessage = t.procedure
  .input(
    z.object({
      fullName: z.string(),
      email: z.string(),
      subject: z.string(),
      message: z.string(),
    })
  )
  .mutation(async ({ input }) => {
    const { fullName, email, subject, message } = input;

    try {
      const data = await resend.emails.send({
        from: `${fullName} <onboarding@resend.dev>`,
        to: ["delivered@resend.dev"],
        subject: subject,
        text: message,
      });

      return { success: true, data };
    } catch (error) {
      console.error(error);
      throw new Error("Failed to send email");
    }
  });

export const contactRouter = t.router({
  sendMessage,
});
