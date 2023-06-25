import { NextApiHandler } from "next";
import { verifyToken } from "../../../server/jwt";

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
    `token=${token}; Path=/; SameSite=Strict; Expires=${new Date(
      payload.exp * 1000
    ).toUTCString()};`
  );

  res.redirect("/");
};

export default handler;
