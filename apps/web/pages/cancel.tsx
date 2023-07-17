import React from "react";

export default function cancel() {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="flex items-center space-x-2 mb-4">
        <svg className="h-12 w-12 text-red-500" fill="currentColor">
          <rect width="100%" height="100%" />
        </svg>
        <svg className="h-6 w-6 text-red-500" fill="currentColor">
          <circle cx="50%" cy="50%" r="50%" />
        </svg>
      </div>
      <h1 className="text-2xl text-red-500 mb-6">Sikertelen fizetés!</h1>
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
}
