import { LoginEmail } from "@naturechill/emails";
import logo from "../public/naturechill-logo.png";

export default function Login() {
  return (
    <div>
      <LoginEmail
        logo={logo.src}
        intro="You have requested a login link to NatureChill. If you did not request this, please ignore this email."
        content="Click the button below to login to NatureChill"
        button="Login"
        lang="de"
        link="localhost:3000/"
      />
    </div>
  );
}
