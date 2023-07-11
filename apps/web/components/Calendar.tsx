"use client";

import { useEffect, useMemo, useState } from "react";
import { trpc } from "../utils/trpc";
import Calendar from "react-calendar";
import { FC, SetStateAction } from "react";

// interface CalendarProps {
//   minDate: Date;
//   maxDate: Date;
//   tileDisabled: TileDisabledFunc;
// }

// const Calendar: React.FC<CalendarProps> = ({
//   maxDate,
//   minDate,
//   tileDisabled,
// }) => {
//   return (
//     <RCalendar
//       maxDate={maxDate}
//       minDate={minDate}
//       tileDisabled={tileDisabled}
//     />
//   );
// };

interface CalendarWrapperProps {
  startDate: Date;
  endDate: Date;
  setStartDate: React.Dispatch<SetStateAction<Date>>;
  setEndDate: React.Dispatch<SetStateAction<Date>>;
  setShowCalendar: React.Dispatch<React.SetStateAction<boolean>>;
  isDateSelected: boolean;
  setIsDateSelected: React.Dispatch<React.SetStateAction<boolean>>;
}

const CalendarWrapper = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  setShowCalendar,
  isDateSelected,
  setIsDateSelected,
}) => {
  const [shouldDisplay, setShouldDisplay] = useState(false);
  

  useEffect(() => {
    setShouldDisplay(true);
  }, []);

  const { data: availableDates, status } =
    trpc.booking.getAvailableDates.useQuery(
      {
        startDate: startDate.toString(),
        endDate: endDate.toString(),
      },
      {
        refetchInterval: 1000 * 30, // 30 seconds
        refetchOnWindowFocus: false,
      }
    );

  // 3 months later
  const maxDate = useMemo(() => {
    const date = new Date(startDate);
    date.setMonth(date.getMonth() + 3);
    return date;
  }, [startDate]);

  // Prev Month
  const minDate = useMemo(() => {
    const date = new Date(startDate);
    date.setMonth(date.getMonth() - 1);
    return date;
  }, [startDate]);

  function tileDisabled({ date, view }: { date: Date; view: string }) {
    // if same day as today
    if (
      date.getDate() === new Date().getDate() &&
      date.getMonth() === new Date().getMonth() &&
      date.getFullYear() === new Date().getFullYear()
    ) {
      console.log("today");
      console.log(date);
      return true;
    }
    if (!availableDates) return false;
    if (view === "month") {
      return !availableDates.find((d) => d.getTime() === date.getTime());
    }
    return false;
  }

  if (!shouldDisplay) return null;
  const handleDateChange = (newDates: [Date, Date]) => {
    setStartDate(newDates[0]);
    setEndDate(newDates[1]);
    setShowCalendar(false);
    setIsDateSelected(true);
  };

  return (
    <div
      className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-40"
      onClick={(e) => e.target === e.currentTarget && setShowCalendar(false)}
    >
      <div className="flex items-center justify-center overflow-hidden rounded-lg">
        <div className="w-full">
          <Calendar
            maxDate={maxDate}
            minDate={minDate}
            tileDisabled={tileDisabled}
            returnValue="range"
            selectRange
            onChange={handleDateChange}
            onViewChange={console.log}
            className={"text-secondary-theme"}
            value={[startDate, endDate]}
          />
        </div>
      </div>
    </div>
  );
};

export default CalendarWrapper;
