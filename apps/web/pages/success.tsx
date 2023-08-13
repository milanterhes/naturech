import { GetServerSideProps, NextPage } from "next";
import React from "react";
import { prisma } from "../server/prisma";
import { Booking } from "@naturechill/db";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui//table";

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
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 52 52"
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            display: "block",
            strokeWidth: "2",
            stroke: "#4bb71b",
            strokeMiterlimit: "10",
            boxShadow: "inset 0px 0px 0px #4bb71b",
            animation:
              "fill .4s ease-in-out .4s forwards, scale .3s ease-in-out .9s both",
            position: "relative",
            top: "5px",
            right: "5px",
            margin: "0 auto",
          }}
        >
          <circle
            cx="26"
            cy="26"
            r="25"
            fill="none"
            style={{
              strokeDasharray: "166",
              strokeDashoffset: "166",
              strokeWidth: "2",
              strokeMiterlimit: "10",
              stroke: "#4bb71b",
              fill: "#fff",
              animation: "stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards",
            }}
          />
          <path
            fill="none"
            d="M14.1 27.2l7.1 7.2 16.7-16.8"
            style={{
              transformOrigin: "50% 50%",
              strokeDasharray: "48",
              strokeDashoffset: "48",
              animation:
                "stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards",
            }}
          />
        </svg>
      </div>
      <h1 className="text-2xl text-green-500 mb-6">Sikeres fizetés!</h1>
      <Table className="my-5 max-w-screen-md w-full overflow-x-auto mx-auto">
        <TableHeader>
          <TableRow className="bg-white bg-opacity-50">
            <TableHead className="w-[100px]">Foglalás száma:</TableHead>
            <TableHead>Fizetési mód:</TableHead>
            <TableHead>Fizetett összeg:</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">{booking.id}</TableCell>
            <TableCell>
              {booking.payment === "CARD" ? "Kartya" : "Eloleg"}
            </TableCell>
            <TableCell>{booking.paymentAmount.deposit}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <div className="flex space-x-2">
        <Link
          href="/"
          className="py-2 px-4 bg-white text-main-theme rounded transform transition-transform duration-300 hover:scale-105 hover:bg-gray-100 hover:shadow-lg"
        >
          Vissza a főoldalra
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;
