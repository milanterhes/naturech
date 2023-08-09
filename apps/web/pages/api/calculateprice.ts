import { BookingService } from "../../server/services/BookingService";
import { Payment } from "@naturechill/db";

async function calculatePrice(req, res) {
  const { start, end } = req.body;

  console.log("Received dates:", start, end); // Log incoming dates

  if (!start || !end) {
    return res.status(400).json({ error: "Start and end dates are required" });
  }

  const price = BookingService.calculateTotalCost(
    new Date(start),
    new Date(end),
    Payment.CASH
  );

  console.log("Calculated price:", price); // Log calculated price

  res.status(200).json({ price });
}
