import { GetServerSideProps, NextPage } from "next";
import React from "react";
import { prisma } from "../server/prisma";
import { Booking } from "@naturechill/db";

const sessionKey = "session_id";

type PageProps = {
  booking: Pick<Booking, "id" | "payment" | "paymentAmount" | "sessionId">;
};

export const getServerSideProps: GetServerSideProps<PageProps> = async ({
  query,
}) => {
  if (
    !query.hasOwnProperty(sessionKey) ||
    !query[sessionKey] ||
    typeof query[sessionKey] !== "string"
  ) {
    throw new Error("Missing session id");
  }
  const sessionId = query[sessionKey];

  const booking = await prisma.booking.findUnique({
    where: {
      sessionId,
    },
    select: {
      id: true,
      payment: true,
      paymentAmount: true,
      sessionId: true,
    },
  });

  if (!booking) {
    throw new Error("Booking not found");
  }

  return { props: { booking } };
};

const SuccessPage: NextPage<PageProps> = ({ booking }) => {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="flex items-center space-x-2 mb-4">
        <svg className="h-12 w-12 text-green-500" fill="currentColor">
          <rect width="100%" height="100%" />
        </svg>
        <svg className="h-6 w-6 text-green-500" fill="currentColor">
          <circle cx="50%" cy="50%" r="50%" />
        </svg>
      </div>
      <h1 className="text-2xl text-green-500 mb-6">Sikeres fizetés!</h1>
      <table className="table-auto mb-6">
        <tbody>
          <tr>
            <td className="pr-4">Foglalás száma:</td>
            <td>{booking.id}</td>
          </tr>
          <tr>
            <td className="pr-4">Fizetési mód:</td>
            <td>{booking.payment === "CARD" ? "Kartya" : "Eloleg"}</td>
          </tr>
          <tr>
            <td className="pr-4">Fizetett összeg:</td>
            <td>{booking.paymentAmount.deposit} Ft</td>
          </tr>
        </tbody>
      </table>
      <div className="flex space-x-2">
        <button className="py-2 px-4 bg-blue-500 text-white rounded">
          Vissza a főoldalra
        </button>
        <button className="py-2 px-4 bg-blue-500 text-white rounded">
          Foglalás részletei
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
