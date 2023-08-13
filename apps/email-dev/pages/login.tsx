import { LoginEmail } from "@naturechill/emails";
import logo from "../public/naturechill-logo.png";

export default function Login() {
  return (
    <div>
      <LoginEmail logo={logo.src} locale="de" link="localhost:3000/" />
    </div>
  );
}
