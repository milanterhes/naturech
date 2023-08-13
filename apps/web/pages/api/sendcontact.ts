import type { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (req: NextApiRequest, res: NextApiResponse) => {
  const { fullName, email, subject, message } = req.body;

  try {
    const data = await resend.emails.send({
      from: `${fullName} ${email}`,
      to: fullName + email,
      subject: subject,
      text: message,
    });

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
};

export default sendEmail;
