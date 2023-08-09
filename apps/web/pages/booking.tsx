import { GetStaticProps, NextPage } from "next";
import { BookingMain } from "../components/Booking";
import { Footer, Navbar } from "../components/Home";
import { useState, useEffect } from "react";
import CalendarWrapper from "../components/Calendar";
import { ProfileForm, ProfileFormPage2 } from "../components/BookingForm";
import {
  DateSelectorProvider,
  useDateSelector,
} from "../components/DateSelector";

export const getStaticProps: GetStaticProps = async (context) => {
  const locale = context.locale === "default" ? "de" : context.locale;
  return {
    props: {
      messages: (await import(`../dictionaries/${locale}.json`)).default,
    },
  };
};

const BookingPage: NextPage = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [showModalPage, setShowModalPage] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [guests, setGuests] = useState(3);
  const { startDate, endDate, totalPrice } = useDateSelector();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleNextPage = () => setCurrentPage((prev) => prev + 1);
  const handlePreviousPage = () => setCurrentPage((prev) => prev - 1);

  return (
    <DateSelectorProvider>
      <Navbar />
      {!showCalendar && showModalPage && (
        <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-40">
          {currentPage === 1 ? (
            <ProfileForm
              showModalPage={showModalPage}
              setShowModalPage={setShowModalPage}
              onNextPage={handleNextPage}
              setGuests={setGuests}
              totalPrice={totalPrice}
            />
          ) : (
            <ProfileFormPage2
              totalPrice={totalPrice}
              onPrevPage={handlePreviousPage}
              guests={guests}
            />
          )}
        </div>
      )}
      {showCalendar && <CalendarWrapper setShowCalendar={setShowCalendar} />}
      <BookingMain
        onIconTextClick={() => setShowCalendar(!showCalendar)}
        showModalPage={showModalPage}
        setShowModalPage={setShowModalPage}
      />
      <Footer />
    </DateSelectorProvider>
  );
};

export default BookingPage;
