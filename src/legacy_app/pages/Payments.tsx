/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect, Suspense } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
// Update logo path to public asset
const logo = "/assets/logo.png";
import { useSearchParams } from "next/navigation";
import { MySwal } from "../../utils/alert";
import { trackInitiateCheckout, trackPurchase } from "../../utils/metaPixel";
import { formatMxPhone, normalizeMxPhone } from "../../utils/phoneFormatter";

const stripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
// Prevent build crash if key is missing (e.g. during CI/CD or before .env update)
const stripePromise = stripeKey ? loadStripe(stripeKey) : null;

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
    if (paymentDetails?.customer?.phone) {
      const cleanPhone = normalizeMxPhone(paymentDetails.customer.phone);
      setPhone(formatMxPhone(cleanPhone));
    }
  }, [paymentDetails]);

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
            "Tu pago por $" +
            paymentDetails[selectedPayment].amount.toFixed(2) +
            " MXN ha sido procesado exitosamente." +
            "\n\n" +
            "Recibirás un correo de confirmación en breve.",
          confirmButtonText: "Ir al inicio",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/";
          }
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
          inputMode="numeric"
          value={phone}
          readOnly
          tabIndex={-1}
          className="
            w-full p-3 rounded-lg
            bg-gray-800 text-white border border-gray-700
            opacity-70
            pointer-events-none
            select-none
          "
        />

        <p className="text-sm text-cyan-400 italic">
          Este número fue tomado de tu información de compra y no puede
          modificarse.
        </p>
      </div>

      {/* Opciones de Pago */}
      <div className="space-y-4">
        <div className="text-center mt-6">
          <h3 className="text-2xl font-bold text-white mb-2 flex items-center justify-center gap-2">
            <span className="text-cyan-400">💳</span>
            Opciones de Pago
          </h3>

          <p className="text-gray-300 max-w-md mx-auto leading-relaxed text-center">
            Puedes elegir la forma de pago que mejor se adapte a ti. Inicia tu
            proyecto con un{" "}
            <span className="text-cyan-400 font-semibold">
              anticipo del 50%
            </span>{" "}
            y liquida el resto{" "}
            <span className="text-cyan-400 font-semibold">contra entrega</span>,
            o bien realiza el{" "}
            <span className="text-cyan-400 font-semibold">pago total</span>{" "}
            desde el inicio para avanzar sin pagos pendientes.
            <br />
            <br />
            Aceptamos pagos con{" "}
            <span className="text-cyan-400 font-semibold">
              Visa, Mastercard y American Express
            </span>{" "}
            , así como{" "}
            <span className="text-cyan-400 font-semibold">
              pago en efectivo en OXXO
            </span>
            . Todas las transacciones se procesan de forma segura mediante{" "}
            <span className="text-cyan-400 font-semibold">Stripe</span>.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {["pago1", "pago2", "total"].map((key) => {
            const payment = paymentDetails?.[key];
            const isEnabled = payment?.enabled;

            return (
              <div
                key={key}
                onClick={() => {
                  if (!isEnabled) return;
                  setSelectedPayment(key);
                }}
                className={`
          p-6 rounded-xl border text-white flex flex-col items-center justify-center
          transition-all duration-300
          ${
            !isEnabled
              ? "cursor-not-allowed opacity-40 border-gray-700 bg-gray-900"
              : selectedPayment === key
              ? "cursor-pointer border-cyan-500 bg-gray-700 scale-110 shadow-lg"
              : "cursor-pointer border-gray-700 bg-gray-800 hover:border-cyan-500 hover:scale-105"
          }
        `}
              >
                <span className="font-bold text-xl">{payment?.label}</span>

                <span className="text-gray-300 text-lg mt-1">
                  ${payment?.amount?.toFixed(2) || "0.00"}
                </span>

                {/* Mensaje opcional si está bloqueado */}
                {!isEnabled && payment?.reason && (
                  <span className="text-xs text-gray-400 mt-2 text-center">
                    {payment.reason}
                  </span>
                )}
              </div>
            );
          })}
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
          <option value="card">
            Tarjeta de crédito o débito — Pago inmediato
          </option>
          <option value="oxxo">OXXO — Paga en efectivo en tienda</option>
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

// Internal component that uses search params
function PaymentContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";

  return (
    <div className="min-h-screen bg-gray-900 py-24 px-4">
      <Elements stripe={stripePromise}>
        <PaymentForm token={token} />
      </Elements>
    </div>
  );
}

export function PaymentPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">Cargando...</div>}>
      <PaymentContent />
    </Suspense>
  );
}
