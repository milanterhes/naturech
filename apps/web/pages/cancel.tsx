import Link from "next/link";
import React from "react";

export default function cancel() {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="w-[100px] h-[100px] relative mx-auto my-5">
        <svg
          viewBox="0 0 87 87"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            width: "100%",
            height: "100%",
            display: "block",
            position: "relative",
            top: "5px",
            right: "5px",
          }}
        >
          <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g transform="translate(2.000000, 2.000000)">
              <circle
                stroke="rgba(252, 191, 191, .5)"
                strokeWidth="4"
                cx="41.5"
                cy="41.5"
                r="41.5"
              ></circle>
              <circle
                style={{
                  strokeDasharray: "260.75219024795285px",
                  strokeDashoffset: "260.75219024795285px",
                  animation: "ani-error-circle 1.2s linear",
                }}
                stroke="#F74444"
                strokeWidth="4"
                cx="41.5"
                cy="41.5"
                r="41.5"
              ></circle>
              <path
                style={{
                  strokeDasharray: "54px 55px",
                  strokeDashoffset: "55px",
                  strokeLinecap: "round",
                  animation: "ani-error-line .15s 1.2s linear both",
                }}
                d="M22.244224,22 L60.4279902,60.1837662"
                stroke="#F74444"
                strokeWidth="3"
                strokeLinecap="square"
              ></path>
              <path
                style={{
                  strokeDasharray: "54px 55px",
                  strokeDashoffset: "55px",
                  strokeLinecap: "round",
                  animation: "ani-error-line .2s .9s linear both",
                }}
                d="M60.755776,21 L23.244224,59.8443492"
                stroke="#F74444"
                strokeWidth="3"
                strokeLinecap="square"
              ></path>
            </g>
          </g>
        </svg>
      </div>
      <h1 className="text-2xl text-red-500 mb-6">Sikertelen fizetés!</h1>
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
}
