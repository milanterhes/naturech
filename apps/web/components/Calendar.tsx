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
  setIsDateSelected: React.Dispatch<React.SetStateAction<boolean>>;
}

const CalendarWrapper: React.FC<CalendarWrapperProps> = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  setShowCalendar,
  setIsDateSelected,
}) => {
  const [shouldDisplay, setShouldDisplay] = useState(false);

  useEffect(() => {
    // making sure that the calendar is not displayed server side
    setShouldDisplay(true);
  }, []);

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

  const { data: bookings } = trpc.booking.getBookings.useQuery({
    startDate: minDate.toString(),
    endDate: maxDate.toString(),
  });

  function tileDisabled({ date, view }: { date: Date; view: string }) {
    if (view === "month") {
      const dateToCheck = new Date(date);
      dateToCheck.setHours(0, 0, 0, 0);
      const isBooked = bookings?.some(
        (booking) =>
          new Date(booking.startDate).getTime() <= dateToCheck.getTime() &&
          new Date(booking.endDate).getTime() >= dateToCheck.getTime()
      );
      return Boolean(isBooked);
    }
    return false;
  }
  const handleDateChange = (newDates: [Date, Date]) => {
    const differenceInDays = Math.round(
      Math.abs(
        (newDates[0].getTime() - newDates[1].getTime()) / (24 * 60 * 60 * 1000)
      )
    );
    if (differenceInDays < 3) {
      alert("Legalább két éjszaka tartózkodás szükséges!");
      return;
    }

    setStartDate(newDates[0]);
    setEndDate(newDates[1]);
    setShowCalendar(false);
    setIsDateSelected(true);
  };

  if (!shouldDisplay) return null;

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
