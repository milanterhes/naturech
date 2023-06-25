import { NextApiHandler } from "next";
import { verifyToken } from "../../../utils/jwt";

const handler: NextApiHandler = async (req, res) => {
  const { token } = req.query;

  if (typeof token !== "string") {
    res.status(400).json({ message: "invalid token" });
    return;
  }

  const cookies = req.cookies;

  if (!cookies) {
    res.status(400).json({ message: "invalid cookies" });
    return;
  }

  const payload = verifyToken(token);

  res.setHeader(
    "Set-Cookie",
    `auth=${JSON.stringify(
      payload
    )}; Path=/; SameSite=Strict; Max-Age=31536000;`
  );

  res.redirect("/");
};

export default handler;
