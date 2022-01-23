import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

export const Checkout = prop => {
  const stripe = useStripe();
  const elements = useElements();
  let submitting = false;

  const handleSubmit = async (event) => {
    event.preventDefault();
    submitting=true;
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      console.log("Stripe 23 | token generated!", paymentMethod);
      //send token to backend here
      paymentMethod.amount=9900;
      prop.makePayment(paymentMethod);
    } else {
      console.log(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, padding:'20px' }}>
      <CardElement />
      <button style={{float:'right',marginTop:'20px'}}
                    type="submit"
                    className="btn btn-primary"
                    disabled={ submitting }>
              {submitting?'Processing, Please wait...': 'PAY NOW'}
            </button>
    </form>
  );
};