import { Payment, BookingStatus } from "@naturechill/db";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { prisma } from "../prisma";

// 3 months and 1 day
const maxDateRange = 1000 * 60 * 60 * 24 * 92;

// 2 days
const minimumStay = 1000 * 60 * 60 * 24 * 2;

// rates in HUF
export const weekdaysNightlyRate = 60000;
export const weekendsNightlyRate = 75000;

function isRangeTooLong(startDate: Date, endDate: Date) {
  return endDate.getTime() - startDate.getTime() > maxDateRange;
}

function isRangeTooShort(startDate: Date, endDate: Date) {
  return endDate.getTime() - startDate.getTime() < minimumStay;
}

export function validateDateRange(startDate: Date, endDate: Date) {
  if (new Date(startDate) > new Date(endDate))
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Check-in date must be before check-out date",
    });

  if (isRangeTooLong(new Date(startDate), new Date(endDate)))
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "The range between check-in and check-out is too long",
    });

  if (isRangeTooShort(new Date(startDate), new Date(endDate)))
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "The range between check-in and check-out is too short",
    });
}

export const GetBookingsSchema = z.object({
  startDate: z.number(),
  endDate: z.number(),
});

export const BookSchema = z.object({
  startDate: z.date(),
  endDate: z.date(),
  paymentKind: z.nativeEnum(Payment),
});

export type BookInput = z.infer<typeof BookSchema>;

export const GetQuoteSchema = z.object({
  startDate: z.string().nonempty(),
  endDate: z.string().nonempty(),
  paymentKind: z.nativeEnum(Payment),
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
  }: BookInput & { email: string }) {
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
          new Date(startDate),
          new Date(endDate),
          paymentKind
        ),
        sessionId: "ASJOKBDPAOJBSDPJOLBAPSJOKDBPJOKLABSDSPJKLBD",
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
    const { startDate, endDate, paymentKind } = input;
    const totalCost = BookingService.calculateTotalCost(
      new Date(startDate),
      new Date(endDate),
      paymentKind
    );

    return {
      amount: totalCost,
    };
  }

  static calculateTotalCost(
    startDate: Date,
    endDate: Date,
    paymentKind: Payment
  ) {
    let totalCost = 0;

    const specialHolidays = [
      new Date(startDate.getFullYear(), 11, 25), // Christmas
      new Date(startDate.getFullYear(), 11, 31), // New Year's Eve
      // Placeholder for Easter (this requires additional logic based on the year)
      new Date(startDate.getFullYear(), 3, 4),
      new Date(startDate.getFullYear(), 7, 20), // August 20th
    ];
    const specialHolidaysRate = 80000;

    const currentDate = new Date(startDate);
    while (currentDate < endDate) {
      const currentDayOfWeek = currentDate.getDay();

      // Check if the date is a special holiday
      if (
        specialHolidays.some(
          (holiday) =>
            holiday.getDate() === currentDate.getDate() &&
            holiday.getMonth() === currentDate.getMonth()
        )
      ) {
        totalCost += specialHolidaysRate;
      } else {
        const nightlyRate =
          currentDayOfWeek >= 1 && currentDayOfWeek <= 4
            ? weekdaysNightlyRate
            : weekendsNightlyRate;
        totalCost += nightlyRate;
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }

    if (paymentKind === Payment.CASH) {
      return {
        deposit: totalCost * 0.2,
        cash: totalCost * 0.8,
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
