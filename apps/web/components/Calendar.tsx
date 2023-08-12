import * as React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { addDays, format } from "date-fns";
import { DateRange, SelectRangeEventHandler } from "react-day-picker";
import moment from "moment-timezone";
import { trpc } from "../utils/trpc";
import { useDateSelector } from "./DateSelector";
import { cn } from "./ui/lib/utils";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

const enumerateDaysBetweenDates = function (
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

export function DatePickerWithRange({
  className,
  setShowCalendar,
  setShowModalPage,
}: React.HTMLAttributes<HTMLDivElement> & {
  setShowCalendar?: React.Dispatch<React.SetStateAction<boolean>>;
  setShowModalPage: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { data: bookings } = trpc.booking.getBookings.useQuery();
  const { startDate, endDate, setDates } = useDateSelector();
  const date = { to: endDate?.toDate(), from: startDate?.toDate() };

  const tileDisabled: (date: Date) => boolean = (date) => {
    const target = moment(date).hours(14);
    const isBooked = bookings?.some((booking) => {
      const start = moment(booking.startDate);
      const end = moment(booking.endDate);

      return target.isBetween(start, end, "minutes", "[]");
    });
    return Boolean(isBooked);
  };

  const handleDateChange: SelectRangeEventHandler = (range) => {
    if (range?.from === undefined) return;

    const start = moment(range.from).hour(14).minute(0).tz("Europe/Budapest");

    if (start.isBefore(new Date(), "day")) {
      return;
    }

    if (range.to) {
      const differenceInDays = Math.abs(
        moment.duration(start.hour(0).diff(moment(range.to))).asDays()
      );
      if (differenceInDays < 2) {
        setDates(start, null);
        return;
      }
      const end = moment(range.to).hour(12).minute(0).tz("Europe/Budapest");
      const days = enumerateDaysBetweenDates(start, end);

      if (days.some((day) => tileDisabled(day))) {
        console.log("lol rekt");
        return;
      }
    }

    const end = range.to
      ? moment(range.to).hour(12).minute(0).tz("Europe/Budapest")
      : null;

    setDates(start, end);
    if (setShowCalendar) setShowCalendar(false);
  };

  return (
    <div className={cn("grid gap-2 text-main-theme", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full 2xl:h-[3rem] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Válasszon dátumot</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleDateChange}
            disabled={tileDisabled}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
