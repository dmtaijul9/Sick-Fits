import React, { useState } from "react";
import styled from "styled-components";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import SickButton from "../components/styles/SickButton";
import nProgress from "nprogress";
import DisplayError from "./ErrorMessage";

const CheckoutFormStyles = styled.form`
  box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 5px;
  padding: 1rem;
  display: grid;
  grid-gap: 1rem;
`;

const stripeLib = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

const CheckoutForm = () => {
  const [customError, setCustomError] = useState();
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const element = useElements();
  const submitHandler = async (e) => {
    //TODO: Stop the form sunmitting and turn the leader one.
    e.preventDefault();
    console.log("I am doing something ");
    setLoading(true);
    //TODO: Start the page transition
    nProgress.start();
    //TODO: Create The payment method via stripe . ( token comes bnack here. if successful)
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: element.getElement(CardElement),
    });

    console.log(paymentMethod);
    //TODO: Hadle any error s from the Stripe.
    if (error) {
      setCustomError(error);
      console.log(error);
    }
    //TODO: Send the token from step 3  to our keystone server , via a custom mutaiton .
    //TODO: Change the page to view the order .
    //TODO: Close the cart
    //TODO: Turn the loader off.
    setLoading(false);
    nProgress.done();
  };
  return (
    <CheckoutFormStyles onSubmit={submitHandler}>
      {customError && <p style={{ fontSize: "15px" }}>{customError.message}</p>}
      <CardElement />
      <SickButton>Check Out Now</SickButton>
    </CheckoutFormStyles>
  );
};

function Checkout(props) {
  return (
    <Elements stripe={stripeLib}>
      <CheckoutForm />
    </Elements>
  );
}

export default Checkout;
