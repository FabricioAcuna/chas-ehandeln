"use client";

import { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useCartStore } from "../../store/cartStore";
import { getJWT } from "../../../../packages/shared/src/jwt";

export default function CheckoutPage() {
  const { items, total, clearCart } = useCartStore();
   const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
    email: "",
  });
  const [paid, setPaid] = useState(false);

  const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "sb";

  const handleApprove = async () => {
  try {
    const jwt = getJWT();
    if (!jwt) throw new Error("User är inte inloggad");

    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        data: {
          total,
          items: items.map((item) => ({ id: item.documentId })), 
          statusOrder: "paid",
        },
      }),
    });

    if (!res.ok) throw new Error("Failed to save order in Strapi");

    setPaid(true);
    clearCart();
  } catch (error) {
    console.error(error);
    alert("Något gick fel vid sparning av order.");
  }
};


  if (items.length === 0 && !paid) {
    return (
      <main style={{ padding: "2rem" }}>
        <h1>Kassan</h1>
        <p>Din kundkorg är tom.</p>
      </main>
    );
  }

  if (paid) {
    return (
      <main style={{ padding: "2rem" }}>
        <h1>Tack för ditt köp!</h1>
        <p>Din order är slutförd och sparad.</p>
      </main>
    );
  }

  return (
    <main style={{ padding: "2rem" }}>
      <h1 className="check-h1">Checkout</h1>
      <div className="checkout-form-container">
          <form className="checkout-form">
            <div className="form-row">
              <label>
                First Name
                <input type="text" name="firstName" required />
              </label>
              <label>
                Last Name
                <input type="text" name="lastName" required />
              </label>
            </div>
            <label>
              Address
              <input type="text" name="address" required />
            </label>
            <div className="form-row">
              <label>
                City
                <input type="text" name="city" required />
              </label>
              <label>
                Postal Code
                <input type="text" name="postalCode" required />
              </label>
            </div>
            <label>
              Phone Number
              <input type="tel" name="phone" required />
            </label>
            <label>
              Email
              <input type="email" name="email" required />
            </label>
          </form>
        </div>

        <div className="order-summary-container">
          <h2>Order Summary</h2>
      <ul className="col">
        {items.map((item) => (
          <span key={item.documentId} className="order-summary">
            {item.name} — {item.price} kr × {item.quantity} <hr/>
          </span>
        ))}
      </ul>
      <h3 className="order-summary-total">Totalt: {total} kr</h3>
      </div>

     <div className="paypal-buttons">
      <PayPalScriptProvider options={{ clientId: PAYPAL_CLIENT_ID, currency: "SEK" }}>
        <PayPalButtons
          style={{ layout: "vertical" }}
          createOrder={(data, actions) => {
            return actions.order.create({
              intent: "CAPTURE",
              purchase_units: [
                {
                  amount: {
                    currency_code: "SEK",
                    value: total.toString(),
                  },
                },
              ],
            });
          }}
          onApprove={async (data, actions) => {
            await actions.order?.capture();
            alert("Betalning genomförd!");
            handleApprove();
          }}
        />
      </PayPalScriptProvider>
      </div>
    </main>
  );
}
