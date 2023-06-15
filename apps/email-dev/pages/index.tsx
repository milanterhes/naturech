import { LoginEmail } from "@naturechill/emails";

export default function Home() {
  return (
    <div>
      <LoginEmail
        button="Login"
        content="Click the button to login"
        intro="Welcome to Nature Chill"
        lang="en"
        link="https://naturechill.com"
      />
    </div>
  );
}
