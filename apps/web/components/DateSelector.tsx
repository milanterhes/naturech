import moment from "moment-timezone";
import React, {
  PropsWithChildren,
  useContext,
  useState,
  useEffect,
} from "react";
import { RouterOutput, trpc } from "../utils/trpc";

interface IDateSelectorContext {
  startDate: moment.Moment | null;
  endDate: moment.Moment | null;
  totalCost: TotalCost;
  setDates: (start: moment.Moment | null, end: moment.Moment | null) => void;
  breakfast: boolean;
  setBreakfast: (value: boolean) => void;
  pet: boolean;
  setPet: (value: boolean) => void;
}

const zeroCost: TotalCost = {
  amount: {
    cash: 0,
    deposit: 0,
  },
};

const DateSelectorContext = React.createContext<IDateSelectorContext>({
  endDate: null,
  setDates: () => {},
  startDate: null,
  totalCost: zeroCost,
  breakfast: false,
  setBreakfast: () => {},
  pet: false,
  setPet: () => {},
});

type TotalCost = RouterOutput["booking"]["getQuote"];

export const DateSelectorProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [pet, setPet] = useState<boolean>(false);
  const [breakfast, setBreakfast] = useState<boolean>(false);
  const [startDate, setStartDate] =
    useState<IDateSelectorContext["startDate"]>(null);
  const [endDate, setEndDate] = useState<IDateSelectorContext["endDate"]>(null);
  const { data } = trpc.booking.getQuote.useQuery(
    {
      endDate: endDate?.valueOf() ?? 0,
      startDate: startDate?.valueOf() ?? 0,
      paymentKind: "CARD",
      breakfast,
      pet,
    },
    {
      enabled: Boolean(startDate && endDate),
    }
  );

  const setDates: IDateSelectorContext["setDates"] = (start, end) => {
    setStartDate(start ? start.tz("Europe/Budapest").hours(14) : null);
    setEndDate(end ? end.tz("Europe/Budapest").hours(12) : null);
  };

  return (
    <DateSelectorContext.Provider
      value={{
        startDate,
        pet,
        setPet,
        endDate,
        setDates,
        breakfast,
        setBreakfast,
        totalCost: data ?? zeroCost,
      }}
    >
      {children}
    </DateSelectorContext.Provider>
  );
};

export const useDateSelector = () => {
  const state = useContext(DateSelectorContext);

  if (state === undefined) {
    throw new Error("Missing DateSelectorProvider");
  }

  return state;
};
