import React from "react";

export default function success() {
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
            <td>ABC123</td>
          </tr>
          <tr>
            <td className="pr-4">Fizetési mód:</td>
            <td>MASTERCARD</td>
          </tr>
          <tr>
            <td className="pr-4">Teljes összeg:</td>
            <td>120.000 Ft</td>
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
}
