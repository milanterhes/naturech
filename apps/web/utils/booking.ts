import { BookingStatus } from "@naturechill/db";
import moment from "moment-timezone";

export const enumerateDaysBetweenDates = function (
  startDate: moment.Moment,
  endDate: moment.Moment
) {
  const now = startDate.clone();
  const dates: Date[] = [];

  while (now.isSameOrBefore(endDate)) {
    dates.push(now.toDate());
    now.add(1, "days");
  }
  return dates;
};

export const tileDisabled: (
  date: Date,
  bookings:
    | {
        endDate: Date;
        startDate: Date;
        status: BookingStatus;
        id: string;
      }[]
    | undefined
) => boolean = (date, bookings) => {
  const target = moment(date).hours(14);
  const isBooked = bookings?.some((booking) => {
    const start = moment(booking.startDate);
    const end = moment(booking.endDate);

    return target.isBetween(start, end, "minutes", "[]");
  });
  return Boolean(isBooked);
};
