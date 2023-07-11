import { GetStaticProps, NextPage } from "next";
import { BookingMain } from "../components/Booking";
import { Footer, Navbar } from "../components/Home";
import { useState } from "react";
import CalendarWrapper from "../components/Calendar";
import { ProfileForm } from "../components/BookingForm";

export const getStaticProps: GetStaticProps = async (context) => {
  const locale = context.locale === "default" ? "de" : context.locale;
  return {
    props: {
      messages: (await import(`../dictionaries/${locale}.json`)).default,
    },
  };
};

const BookingPage: NextPage = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [isDateSelected, setIsDateSelected] = useState(false);
  const [showModalPage, setShowModalPage] = useState(false);

  const [endDate, setEndDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    return date;
  });

  return (
    <>
      <Navbar />
      {!showCalendar && showModalPage && 
          <div
            className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-40"
            onClick={(e) =>
              e.target === e.currentTarget && setShowModalPage(false)
            }
          >
            <ProfileForm/>
          </div>
        }
      {showCalendar && (
        <CalendarWrapper
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          setShowCalendar={setShowCalendar}
          isDateSelected={isDateSelected}
          setIsDateSelected={setIsDateSelected}
        />
      )}
      <BookingMain
        startDate={startDate}
        endDate={endDate}
        onIconTextClick={() => setShowCalendar(!showCalendar)}
        isDateSelected={isDateSelected}
        setIsDateSelected={setIsDateSelected}
        showModalPage={showModalPage}
        setShowModalPage={setShowModalPage}
      />
      <Footer />
    </>
  );
};

export default BookingPage;
