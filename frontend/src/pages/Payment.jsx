import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useSearchParams } from "react-router-dom";

const Payment = () => {
  const stripePromise = loadStripe(
    "pk_test_51SiD4F0tfFGyizACNBIaiP2YdVyrZ0d5bvJj7V0qXFvkg4uX9Gzqtnn0xSCJC0jlZcIjYIMTlOyprQayXctrngz000uZLBdPQZ"
  );
  const [searchParams] = useSearchParams();
  const  appointmentId  = searchParams.get("appointmentId");
  const  fees  = searchParams.get("fees");
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <Elements stripe={stripePromise}>
        <CheckoutForm appointmentId={appointmentId} fees={fees} />
      </Elements>
    </div>
  );
};

export default Payment;