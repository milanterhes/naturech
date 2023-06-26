import { NextApiHandler } from "next";
import { verifyToken } from "../../../server/jwt";

const handler: NextApiHandler = async (req, res) => {
  const token = req.query.token;

  if (typeof token !== "string") {
    res.status(400).json({ message: "invalid token" });
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
