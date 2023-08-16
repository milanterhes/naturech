import { Payment, BookingStatus } from "@naturechill/db";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { prisma } from "../prisma";
import moment from "moment-timezone";
import { enumerateDaysBetweenDates, tileDisabled } from "../../utils/booking";

// 3 months and 1 day
const maxDateRange = 1000 * 60 * 60 * 24 * 92;

// 2 days
const minimumStay = 1000 * 60 * 60 * 24 * 2;

// rates in HUF
export const weekdaysNightlyRate = 60000;
export const weekendsNightlyRate = 75000;

export function validateDateRange(
  range: { to: Date; from: Date },
  bookings:
    | {
        endDate: Date;
        startDate: Date;
        status: BookingStatus;
        id: string;
      }[]
    | undefined
) {
  const start = moment(range.from).tz("Europe/Budapest").hour(14).minute(0);

  if (start.isBefore(new Date(), "day")) {
    return;
  }

  if (range.to) {
    const differenceInDays = Math.abs(
      moment.duration(start.hour(0).diff(moment(range.to))).asDays()
    );
    if (differenceInDays < 2) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "The range between check-in and check-out is too short",
      });
    }
    const end = moment(range.to).hour(12).minute(0).tz("Europe/Budapest");
    const days = enumerateDaysBetweenDates(start, end);

    if (days.some((day) => tileDisabled(day, bookings))) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "There's already a bookings in this date range",
      });
    }
  }
}

export const GetBookingsSchema = z.object({
  startDate: z.number(),
  endDate: z.number(),
});

export const BookSchema = z.object({
  startDate: z.date(),
  endDate: z.date(),
  paymentKind: z.nativeEnum(Payment),
  email: z.string().email(),
  sessionId: z.string(),
  breakfast: z.boolean(),
});

export type BookInput = z.infer<typeof BookSchema>;

export const GetQuoteSchema = z.object({
  startDate: z.number(),
  endDate: z.number(),
  paymentKind: z.nativeEnum(Payment),
  breakfast: z.boolean(),
});

export type GetQuoteInput = z.infer<typeof GetQuoteSchema>;

const overlappingCheck = (startDate: Date, endDate: Date) => {
  return {
    OR: [
      { startDate: { lte: startDate }, endDate: { gte: startDate } }, // start date is within existing booking
      { startDate: { lte: endDate }, endDate: { gte: endDate } }, // end date is within existing booking
      { startDate: { gte: startDate }, endDate: { lte: endDate } }, // existing booking is within start and end date
      { startDate: { equals: endDate } }, // booking starts on the same day as the end date
      { endDate: { equals: startDate } }, // booking ends on the same day as the start date
    ],
  };
};

export class BookingService {
  static async getBookings() {
    const bookings = await prisma.booking.findMany({
      where: {
        status: { not: BookingStatus.CANCELLED },
      },
      select: {
        endDate: true,
        startDate: true,
        status: true,
        id: true,
      },
    });

    return bookings;
  }

  static async book({
    startDate,
    endDate,
    paymentKind,
    email,
    sessionId,
    breakfast,
  }: BookInput) {
    const existingBooking = await prisma.booking.findFirst({
      where: {
        AND: [
          { ...overlappingCheck(new Date(startDate), new Date(endDate)) },
          { status: { not: BookingStatus.CANCELLED } },
        ],
      },
    });

    if (existingBooking) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Booking already exists for this period",
      });
    }

    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "User not found",
      });
    }

    const booking = await prisma.booking.create({
      data: {
        startDate,
        endDate,
        user: {
          connect: {
            id: user.id,
          },
        },
        status: BookingStatus.PENDING,
        payment: paymentKind,
        paymentAmount: BookingService.calculateTotalCost(
          moment(startDate),
          moment(endDate),
          paymentKind,
          breakfast
        ),
        sessionId,
        breakfast,
      },
      select: {
        endDate: true,
        startDate: true,
        status: true,
        id: true,
        payment: true,
        paymentAmount: true,
      },
    });

    return booking;
  }

  static async getQuote(input: GetQuoteInput) {
    const { startDate, endDate, paymentKind, breakfast } = input;
    const totalCost = BookingService.calculateTotalCost(
      moment(startDate),
      moment(endDate),
      paymentKind,
      breakfast
    );

    return {
      amount: totalCost,
    };
  }

  static calculateTotalCost(
    startDate: moment.Moment,
    endDate: moment.Moment,
    paymentKind: Payment,
    breakfast: boolean
  ) {
    let totalCost = 0;

    const specialHolidays = [
      moment(`${startDate.year()}1225`, "YYYYMMDD"), // Christmas
      moment(`${startDate.year()}1231`, "YYYYMMDD"), // New Year's Eve
      moment(`${startDate.year()}0404`, "YYYYMMDD"),
      moment(`${startDate.year()}0820`, "YYYYMMDD"), // August 20th
    ];
    const specialHolidaysRate = 80000;

    const currentDate = startDate.clone();
    while (currentDate.isBefore(endDate, "day")) {
      const currentDayOfWeek = currentDate.day();
      if (
        specialHolidays.some((holiday) => holiday.isSame(currentDate, "day"))
      ) {
        console.log("adding special");
        totalCost += specialHolidaysRate;
      } else {
        const nightlyRate =
          currentDayOfWeek >= 1 && currentDayOfWeek <= 4
            ? weekdaysNightlyRate
            : weekendsNightlyRate;
        console.log("adding nightly", nightlyRate);
        totalCost += nightlyRate;
      }

      currentDate.add(1, "day");
    }
    if (breakfast) totalCost += 5000;

    if (paymentKind === Payment.CASH) {
      return {
        deposit: totalCost * 0.5,
        cash: totalCost * 0.5,
      };
    }

    return {
      deposit: totalCost,
      cash: 0,
    };
  }

  static async confirmBooking(id: string) {
    const booking = await prisma.booking.findFirst({
      where: {
        id,
      },
    });

    if (!booking) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Booking not found",
      });
    }

    if (booking.status !== BookingStatus.PENDING) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Booking is not pending",
      });
    }

    const updatedBooking = await prisma.booking.update({
      where: {
        id,
      },
      data: {
        status: BookingStatus.CONFIRMED,
      },
      select: {
        endDate: true,
        startDate: true,
        status: true,
        id: true,
        payment: true,
        paymentAmount: true,
      },
    });

    return updatedBooking;
  }

  static async cancelBooking(id: string) {
    const booking = await prisma.booking.findFirst({
      where: {
        id,
      },
    });

    if (!booking) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Booking not found",
      });
    }

    if (booking.status !== BookingStatus.CONFIRMED) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Booking is not confirmed",
      });
    }

    const updatedBooking = await prisma.booking.update({
      where: {
        id,
      },
      data: {
        status: BookingStatus.CANCELLED,
      },
      select: {
        endDate: true,
        startDate: true,
        status: true,
        id: true,
        payment: true,
        paymentAmount: true,
      },
    });

    return updatedBooking;
  }
}
