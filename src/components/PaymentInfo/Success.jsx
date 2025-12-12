import React, { useEffect } from "react";
import { useSearchParams } from "react-router";
import useAxiosSicures from "../../Hooks/useAxiosSicure";
import { FiCheckCircle } from "react-icons/fi";
const Success = () => {
  const axiosSicure = useAxiosSicures();
  const [searchParem] = useSearchParams();
  const sessionId = searchParem.get("session_id");

  useEffect(() => {
    if (sessionId) {
      axiosSicure.post("/payment-successs", { sessionId });
    }
  }, [axiosSicure, sessionId]);
  console.log("pyent infe", sessionId);
  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white rounded-2xl shadow-xl p-10 text-center max-w-md w-full animate-fadeIn">
          <FiCheckCircle className="mx-auto mb-4 text-green-500" size={80} />

          <h1 className="text-3xl font-bold text-gray-800">
            Payment Successful!
          </h1>
          <p className="text-gray-600 mt-2">
            Your order has been placed successfully.
          </p>

          <div className="mt-6 flex justify-center">
            <a
              href="/dashboard/My-order"
              className="px-6 py-3 rounded-xl bg-green-600 text-white font-semibold shadow hover:bg-green-700 transition"
            >
              View Orders
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
