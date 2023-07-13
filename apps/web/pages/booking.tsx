import { GetStaticProps, NextPage } from "next";
import { BookingMain } from "../components/Booking";
import { Footer, Navbar } from "../components/Home";
import { useState } from "react";
import CalendarWrapper from "../components/Calendar";
import { ProfileForm, ProfileFormPage2 } from "../components/BookingForm";

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
  const [currentPage, setCurrentPage] = useState(1);
  const [house1, setHouse1] = useState(true);
  const [price, setPrice] = useState(120000);
  const [guests, setGuests] = useState("3");

  const [endDate, setEndDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    return date;
  });

  const handleNextPage = () => setCurrentPage((prev) => prev + 1);
  const handlePreviousPage = () => setCurrentPage((prev) => prev - 1);

  return (
    <>
      <Navbar />
      {!showCalendar && showModalPage && (
        <div
          className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-40"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowModalPage(false);
              setCurrentPage(1);
            }
          }}
        >
          {currentPage === 1 ? (
            <ProfileForm
              startDate={startDate}
              endDate={endDate}
              showModalPage={showModalPage}
              setShowModalPage={setShowModalPage}
              onNextPage={handleNextPage}
              setHouse1={setHouse1}
              setGuests={setGuests}
            />
          ) : (
            <ProfileFormPage2
              startDate={startDate}
              endDate={endDate}
              onPrevPage={handlePreviousPage}
              house1={house1}
              guests={guests}
            />
          )}
        </div>
      )}
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
