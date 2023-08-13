import { BookingConfirmationEmail } from "@naturechill/emails";
import logo from "../public/naturechill-logo.png";

export default function Home() {
  return (
    <div>
      <BookingConfirmationEmail
        logo={logo.src}
        locale="en"
        intro="Köszönjük a foglalásodat!"
        salutation="Kedves Terhes Milán!"
        timePeriod="Érkezés: 2022.01.01 - Távozás: 2022.01.03"
        paymentType="Fizetés módja: Teljes"
        bookingId={`Rendelés azonosito: #12345 (${new Date().toLocaleDateString(
          "hu"
        )})`}
        description="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
      />
    </div>
  );
}
