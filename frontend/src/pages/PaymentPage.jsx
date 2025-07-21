import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCreditCard, FaPaypal, FaUniversity } from "react-icons/fa";
import {
  SiKlarna,
  SiVisa,
  SiMastercard,
  SiAmericanexpress,
  SiSepa,
} from "react-icons/si";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const booking = location.state;

  // wenn keine Buchung vorhanden ist, zurück zur Buchungsseite
  if (!booking) {
    navigate("/booking");
    return null;
  }

  const [selectedBank, setSelectedBank] = useState("TBK Bank");
  const [paymentMethod, setPaymentMethod] = useState("paypal");

  return (
    <div className="pt-15 bg-gray-50 min-h-screen">
      <div className="p-4 md:p-8 max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-600 mb-2">
            Zahlung abschließen
          </h1>
          <p className="text-gray-600">
            Wählen Sie Ihre bevorzugte Zahlungsmethode und schließen Sie Ihre
            Buchung ab.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6 md:p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-700">
            Ihre Bestellung
          </h2>

          <div className="border-b pb-4 mb-4">
            <p className="font-medium">Produkt</p>
            <p className="mt-2">{booking.hotel.name}</p>
            <p className="text-sm text-gray-600">
              Daten: {booking.startDate} – {booking.endDate}
              <br />
              Unterkunft: {booking.hotel.name}, {booking.hotel.location}
            </p>
            <p className="mt-2 font-semibold text-right text-blue-500 text-xl">
              €{booking.totalPrice}
            </p>
          </div>

          {/*        <div className="flex justify-between mb-2 text-gray-700">
            <span>Zwischensumme</span>
            <span>€{booking.totalPrice}</span>
          </div> */}
          <div className="flex justify-between font-bold mb-4 text-lg text-gray-800">
            <span>Gesamt</span>
            <span>€{booking.totalPrice}</span>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 text-lg mb-4">
              Zahlungsmethode wählen
            </h3>
            <div className="grid grid-cols-1 gap-3">
              <label
                className={`flex items-center p-3 rounded-lg border cursor-pointer transition
                  ${
                    paymentMethod === "paypal"
                      ? "border-orange-500 bg-orange-50"
                      : "border-gray-200 bg-white"
                  }
                  hover:border-orange-400`}
              >
                <input
                  type="radio"
                  id="paypal"
                  name="payment"
                  value="paypal"
                  checked={paymentMethod === "paypal"}
                  onChange={() => setPaymentMethod("paypal")}
                  className="appearance-none w-4 h-4 border-2 border-orange-400 rounded checked:bg-blue-400 checked:border-blue-200 focus:ring-blue-500"
                />
                <FaPaypal className="ml-3 text-xl text-blue-600" />
                <span className="ml-3 font-medium">PayPal</span>
              </label>
              <label
                className={`flex items-center p-3 rounded-lg border cursor-pointer transition
                  ${
                    paymentMethod === "creditcard"
                      ? "border-orange-500 bg-orange-50"
                      : "border-gray-200 bg-white"
                  }
                  hover:border-orange-400`}
              >
                <input
                  type="radio"
                  id="creditcard"
                  name="payment"
                  value="creditcard"
                  checked={paymentMethod === "creditcard"}
                  onChange={() => setPaymentMethod("creditcard")}
                  className="appearance-none w-4 h-4 border-2 border-orange-400 rounded checked:bg-blue-400 checked:border-blue-200 focus:ring-blue-500"
                />
                <FaCreditCard className="ml-3 text-xl text-green-600" />
                <span className="ml-3 font-medium flex items-center gap-2">
                  Kreditkarte
                  <SiVisa className="text-blue-500" />
                  <SiMastercard className="text-orange-500" />
                  <SiAmericanexpress className="text-blue-700" />
                </span>
              </label>
              <label
                className={`flex items-center p-3 rounded-lg border cursor-pointer transition
                  ${
                    paymentMethod === "sepa"
                      ? "border-orange-500 bg-orange-50"
                      : "border-gray-200 bg-white"
                  }
                  hover:border-orange-400`}
              >
                <input
                  type="radio"
                  id="sepa"
                  name="payment"
                  value="sepa"
                  checked={paymentMethod === "sepa"}
                  onChange={() => setPaymentMethod("sepa")}
                  className="appearance-none w-4 h-4 border-2 border-orange-400 rounded checked:bg-blue-400 checked:border-blue-200 focus:ring-blue-500"
                />
                <SiSepa className="ml-3 text-xl text-indigo-600" />
                <span className="ml-3 font-medium">SEPA-Lastschrift</span>
              </label>
              <label
                className={`flex items-center p-3 rounded-lg border cursor-pointer transition
                  ${
                    paymentMethod === "sofort"
                      ? "border-orange-500 bg-orange-50"
                      : "border-gray-200 bg-white"
                  }
                  hover:border-orange-400`}
              >
                <input
                  type="radio"
                  id="sofort"
                  name="payment"
                  value="sofort"
                  checked={paymentMethod === "sofort"}
                  onChange={() => setPaymentMethod("sofort")}
                  className="appearance-none w-4 h-4 border-2 border-orange-400 rounded checked:bg-blue-400 checked:border-blue-200 focus:ring-blue-500"
                />
                <SiKlarna className="ml-3 text-xl text-pink-500" />
                <span className="ml-3 font-medium">
                  Sofortüberweisung / Klarna
                </span>
              </label>
              <label
                className={`flex items-center p-3 rounded-lg border cursor-pointer transition
                  ${
                    paymentMethod === "giropay"
                      ? "border-orange-500 bg-orange-50"
                      : "border-gray-200 bg-white"
                  }
                  hover:border-orange-400`}
              >
                <input
                  type="radio"
                  id="giropay"
                  name="payment"
                  value="giropay"
                  checked={paymentMethod === "giropay"}
                  onChange={() => setPaymentMethod("giropay")}
                  className="appearance-none w-4 h-4 border-2 border-orange-400 rounded checked:bg-blue-400 checked:border-blue-200 focus:ring-blue-500"
                />
                <FaUniversity className="ml-3 text-xl text-blue-800" />
                <span className="ml-3 font-medium">Giropay</span>
              </label>
            </div>
          </div>

          <div className="mb-6">
            <label className="block mb-1 font-medium text-gray-700">
              Bank auswählen
            </label>
            <select
              value={selectedBank}
              onChange={(e) => setSelectedBank(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              disabled={paymentMethod !== "bank"}
            >
              <option value="TBK Bank">TBK Bank</option>
              <option value="KBC/CBC">KBC/CBC Payment Button</option>
              <option value="Bancontact">Bancontact / Mister Cash</option>
              <option value="PayPal">PayPal</option>
              <option value="SOFORT">SOFORT Banking</option>
            </select>
            {paymentMethod !== "bank" && (
              <p className="text-xs text-gray-400 mt-1">
                Bankauswahl nur bei Banküberweisung verfügbar
              </p>
            )}
          </div>

          <button className="w-full px-8 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-400 transition-colors font-medium shadow-md hover:shadow-lg text-lg">
            Bestellung abschließen
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
