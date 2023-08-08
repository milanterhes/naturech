import moment from "moment-timezone";
import React, { PropsWithChildren, useContext, useState } from "react";

interface IDateSelectorContext {
  startDate: moment.Moment | null;
  endDate: moment.Moment | null;
  setDates: (start: moment.Moment, end: moment.Moment) => void;
}

const DateSelectorContext = React.createContext<IDateSelectorContext>({
  endDate: null,
  setDates: () => {},
  startDate: null,
});

export const DateSelectorProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [startDate, setStartDate] =
    useState<IDateSelectorContext["startDate"]>(null);
  const [endDate, setEndDate] = useState<IDateSelectorContext["endDate"]>(null);

  const setDates: IDateSelectorContext["setDates"] = (start, end) => {
    setStartDate(start.tz("Europe/Budapest"));
    setEndDate(end.tz("Europe/Budapest"));
  };

  return (
    <DateSelectorContext.Provider value={{ startDate, endDate, setDates }}>
      {children}
    </DateSelectorContext.Provider>
  );
};

export const useDateSelector = () => {
  const state = useContext(DateSelectorContext);

  if (state === undefined) {
    throw new Error("Missing DateSelectorProvider");
  }

  console.log({
    start: state.startDate?.format("llll"),
    end: state.endDate?.format("llll"),
  });

  return state;
};
