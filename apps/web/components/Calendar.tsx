import { useEffect, useState } from "react";
import { trpc } from "../utils/trpc";
import Calendar from "react-calendar";
import moment from "moment-timezone";
import { useDateSelector } from "./DateSelector";
import { TileDisabledFunc } from "react-calendar/dist/cjs/shared/types";

interface CalendarWrapperProps {
  setShowCalendar: React.Dispatch<React.SetStateAction<boolean>>;
}

const CalendarWrapper: React.FC<CalendarWrapperProps> = ({
  setShowCalendar,
}) => {
  const [shouldDisplay, setShouldDisplay] = useState(false);
  const { endDate, startDate, setDates } = useDateSelector();

  useEffect(() => {
    // making sure that the calendar is not displayed server side
    setShouldDisplay(true);
  }, []);

  const { data: bookings } = trpc.booking.getBookings.useQuery();

  const tileDisabled: TileDisabledFunc = ({ date, view }) => {
    if (view === "month") {
      const target = moment(date).hours(14);
      const isBooked = bookings?.some((booking) => {
        const start = moment(booking.startDate);
        const end = moment(booking.endDate);

        console.log({
          s: start.format("llll"),
          e: end.format("llll"),
          t: target.format("llll"),
        });

        return target.isBetween(start, end, "minutes", "[]");
      });
      return Boolean(isBooked);
    }
    return false;
  };

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

    const start = moment(newDates[0]).hour(14).minute(0).tz("Europe/Budapest");
    const end = moment(newDates[1]).hour(12).minute(0).tz("Europe/Budapest");

    setDates(start, end);
    setShowCalendar(false);
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
            tileDisabled={tileDisabled}
            tileClassName={(props) =>
              tileDisabled(props) ? "line-through opacity-70 text-gray-500" : ""
            }
            returnValue="range"
            selectRange
            onChange={handleDateChange}
            onViewChange={console.log}
            className={"text-secondary-theme"}
            value={[startDate?.toDate() ?? null, endDate?.toDate() ?? null]}
          />
        </div>
      </div>
    </div>
  );
};

export default CalendarWrapper;
