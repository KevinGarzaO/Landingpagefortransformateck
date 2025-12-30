import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import logo from "../../assets/logo.png";
import { useLocation } from "react-router-dom";
import { MySwal } from "../../utils/alert";
import { trackInitiateCheckout, trackPurchase } from "../../utils/metaPixel";

const stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
if (!stripeKey) throw new Error("Falta la clave pública de Stripe");
const stripePromise = loadStripe(stripeKey);

function PaymentForm({ token }: { token: string }) {
  const stripe = useStripe();
  const elements = useElements();

  const [paymentMethod, setPaymentMethod] = useState("card"); // card | oxxo
  const [selectedPayment, setSelectedPayment] = useState("pago1"); // precargamos por default
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState<any>(null);

  // 🔹 Fetch de todos los detalles al cargar
  useEffect(() => {
    const fetchPaymentDetails = async () => {
      if (!token) return;
      setLoading(true);
      try {
        const res = await fetch("http://localhost:3000/v1/payment-details", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Error obteniendo detalles de pago");

        const data = await res.json();
        console.log("Detalles de pago:", data);
        setPaymentDetails(data);
      } catch (err) {
        console.error(err);
        setPaymentDetails(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentDetails();
  }, [token]);

  useEffect(() => {
    if (!paymentDetails || !selectedPayment) return;

    const currentPayment = paymentDetails[selectedPayment];
    if (!currentPayment) return;

    const itemsOnly = currentPayment.breakdown.filter(
      (i: any) =>
        !i.name.toLowerCase().includes("subtotal") &&
        !i.name.toLowerCase().includes("iva") &&
        !i.name.toLowerCase().includes("anticipo") &&
        !i.name.toLowerCase().includes("liquidación")
    );

    trackInitiateCheckout(currentPayment.amount, itemsOnly);
  }, [selectedPayment, paymentDetails]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements || !paymentDetails) return;

    setLoading(true);

    try {
      // Crear PaymentIntent en backend
      const res = await fetch(
        "http://localhost:3000/v1/create-payment-intent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            amount: paymentDetails[selectedPayment].amount * 100, // centavos
            payment_method_type: paymentMethod, // card | oxxo
            customer: { name, email, phone },
          }),
        }
      );

      const { client_secret } = await res.json();

      if (paymentMethod === "card") {
        const card = elements.getElement(CardElement);
        if (!card) return;

        const result = await stripe.confirmCardPayment(client_secret, {
          payment_method: { card, billing_details: { name, email, phone } },
        });

        if (result.error) {
          MySwal.fire({
            icon: "error",
            title: "Error en el pago",
            text: result.error.message || "Error en pago",
          });
        } else if (result.paymentIntent?.status === "succeeded")
          trackPurchase(
            paymentDetails[selectedPayment].amount,
            paymentDetails[selectedPayment].breakdown.filter(
              (i: any) =>
                !i.name.toLowerCase().includes("subtotal") &&
                !i.name.toLowerCase().includes("iva") &&
                !i.name.toLowerCase().includes("anticipo") &&
                !i.name.toLowerCase().includes("liquidación")
            )
          );
        MySwal.fire({
          icon: "success",
          title: "¡Pago exitoso!",
          text:
            "Gracias por tu compra." +
            "\n\n" +
            "tu pago por " +
            "$" +
            paymentDetails[selectedPayment].amount.toFixed(2) +
            " MXN" +
            " ha sido procesado exitosamente. " +
            "\n\n" +
            "Recibirás un correo de confirmación en breve.",
        });
      } else if (paymentMethod === "oxxo") {
        const result = await stripe.confirmOxxoPayment(client_secret, {
          payment_method: { billing_details: { name, email, phone } },
        });

        if (result.error) {
          MySwal.fire({
            icon: "error",
            title: "Error en el pago OXXO",
            text: result.error.message || "Error en pago OXXO",
          });
        }
      }
    } catch (err) {
      console.error(err);
      MySwal.fire({
        icon: "error",
        title: "Error inesperado ",
        text: "Ocurrió un error inesperado durante el proceso de pago.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto bg-gray-900/80 p-8 rounded-2xl backdrop-blur-md border border-gray-700 space-y-6"
    >
      {/* Logo y Título */}
      <div className="text-center">
        <img src={logo} alt="Transformateck" className="h-20 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-2">
          <span className="text-cyan-400">🔒</span>
          Pago Seguro
        </h2>
        <p className="text-gray-300 max-w-md mx-auto leading-relaxed">
          Completa tus datos y selecciona tu método de pago. Tu información está
          protegida con{" "}
          <span className="text-cyan-400 font-semibold">cifrado SSL</span> y
          procesada de manera segura a través de{" "}
          <span className="text-cyan-400 font-semibold">Stripe</span>. Solo tú y
          Stripe tendrán acceso a tus datos de pago, garantizando una
          transacción rápida y confiable.
        </p>
      </div>

      {/* Datos del usuario */}
      <div className="grid grid-cols-1 gap-4">
        <input
          type="text"
          placeholder="Nombre completo"
          className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
          value={name.toUpperCase()}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="tel"
          placeholder="Teléfono"
          className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>

      {/* Opciones de Pago */}
      <div className="space-y-4">
        <label className="text-white font-bold text-lg block mb-2">
          Opciones de Pago
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {["pago1", "pago2", "total"].map((key) => (
            <div
              key={key}
              className={`cursor-pointer p-6 rounded-xl border text-white flex flex-col items-center justify-center transition-transform duration-300 ${
                selectedPayment === key
                  ? "border-cyan-500 bg-gray-700 scale-110 shadow-lg"
                  : "border-gray-700 bg-gray-800 hover:border-cyan-500 hover:scale-105"
              }`}
              onClick={() => setSelectedPayment(key)}
            >
              <span className="font-bold text-xl">
                {key === "pago1"
                  ? "Pago Anticipo"
                  : key === "pago2"
                  ? "Pago Final"
                  : "Pago Total"}
              </span>
              <span className="text-gray-300 text-lg">
                ${paymentDetails?.[key]?.amount?.toFixed(2) || "0.00"}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Resumen de Pago */}
      {selectedPayment && paymentDetails && (
        <div className="bg-gray-800 p-5 rounded-lg border border-gray-700 space-y-4 transition-all duration-500 ease-in-out">
          <h3 className="text-white font-semibold text-lg">
            🧾 Resumen de compra
          </h3>

          {/* ITEMS / CONCEPTOS */}
          <div className="space-y-2">
            <p className="text-gray-400 text-sm font-semibold uppercase tracking-wide">
              Conceptos
            </p>

            {paymentDetails[selectedPayment].breakdown
              .filter((item: any) => !item.name.toLowerCase().includes("iva"))
              .map((item: any, idx: number) => (
                <div
                  key={idx}
                  className={`flex justify-between transition-all duration-300 ${
                    item.paid ? "text-gray-500 line-through" : "text-gray-200"
                  }`}
                >
                  <span>
                    {item.name} {item.paid}
                  </span>
                  <span>${item.price.toFixed(2) + " MXN"}</span>
                </div>
              ))}
          </div>

          {/* SUBTOTAL + IVA */}
          <div className="pt-3 border-t border-gray-700 space-y-2">
            <p className="text-gray-400 text-sm font-semibold uppercase tracking-wide">
              Impuestos
            </p>

            {paymentDetails[selectedPayment].breakdown
              .filter((item: any) => item.name.toLowerCase().includes("iva"))
              .map((item: any, idx: number) => (
                <div
                  key={idx}
                  className={`flex justify-between transition-all duration-300 ${
                    item.paid ? "text-gray-500 line-through" : "text-gray-300"
                  }`}
                >
                  <span>
                    {item.name} {item.paid}
                  </span>
                  <span>${item.price.toFixed(2) + " MXN"}</span>
                </div>
              ))}
          </div>

          {/* TOTAL */}
          <div className="pt-4 border-t border-gray-600 flex justify-between font-bold text-white text-lg">
            <span>Total a pagar</span>
            <span>
              ${paymentDetails[selectedPayment].amount.toFixed(2) + " MXN"}
            </span>
          </div>
        </div>
      )}

      {/* Método de pago */}
      <div className="space-y-2">
        <label className="text-white font-semibold">Método de pago</label>
        <select
          className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="card">Tarjeta</option>
          <option value="oxxo">OXXO</option>
        </select>
      </div>

      {/* CardElement solo si es tarjeta */}
      {paymentMethod === "card" && (
        <div className="p-4 bg-gray-800 border border-gray-700 rounded-lg">
          <CardElement
            options={{
              style: {
                base: { color: "#fff", "::placeholder": { color: "#aaa" } },
              },
            }}
          />
        </div>
      )}

      {/* Botón de pago */}
      <button
        type="submit"
        disabled={!stripe || loading || !selectedPayment || !paymentDetails}
        className="w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-xl hover:shadow-xl transition-transform transform hover:scale-105 flex items-center justify-center gap-2"
      >
        {loading ? (
          "Procesando Pago…"
        ) : (
          <>
            <span className="text-xl">🔒</span>
            <span className="font-semibold text-lg">
              Pago Seguro -{" "}
              {selectedPayment === "pago1"
                ? "Pago Anticipo (50%)"
                : selectedPayment === "pago2"
                ? "Pago Final (50%)"
                : "Pago Total"}
            </span>
          </>
        )}
      </button>
    </form>
  );
}

export function PaymentPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token") || ""; // obtiene token desde ?token=xxxx

  return (
    <div className="min-h-screen bg-gray-900 py-24 px-4">
      <Elements stripe={stripePromise}>
        <PaymentForm token={token} />
      </Elements>
    </div>
  );
}
