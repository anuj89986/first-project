import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import API from "../../config/API.js";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const CheckoutForm = ({ appointmentId, fees }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)

    try {
      const { data } = await API.post(`/appointment/payment`, { fees: fees });
      const result = await stripe.confirmCardPayment(data.data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        alert(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          alert("Payment Successful 🎉");
          await API.post(`/appointment/change-book-status/${appointmentId}`);
          navigate("/my-appointments");
        }
      }
    } catch (error) {
      console.error("Payment error:", error);
      setLoading(false);
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <form
      onSubmit={
        handleSubmit
      }
      className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-4">Complete Payment</h2>
      <div className="mb-4 p-4 border rounded">
        <CardElement />
      </div>
      {loading ? (
        <button
          type="submit"
          disabled={true}
          className="w-full bg-blue-400 text-white py-2 rounded hover:cursor-not-allowed"
        >
          Pay ${fees}
        </button>
      ) : (
        <button
          type="submit"
          disabled={!stripe}
          className="w-full bg-gray-300 text-black py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          Pay ${fees}
        </button>
      )}
    </form>
  );
};

export default CheckoutForm;