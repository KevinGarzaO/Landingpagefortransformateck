// Función para traducir errores de Stripe a español
function getStripeErrorMessage(error: any): string {
  const code = error?.code || "";
  const message = error?.message || "";

  switch (code) {
    case "card_declined":
      return "Tu tarjeta fue declinada. Verifica tu saldo o intenta con otra tarjeta.";
    case "expired_card":
      return "Tu tarjeta ha expirado. Por favor, usa otra tarjeta válida.";
    case "incorrect_cvc":
      return "El código de seguridad (CVC) es incorrecto. Verifica e intenta nuevamente.";
    case "insufficient_funds":
      return "Fondos insuficientes en la tarjeta. Usa otra tarjeta o verifica tu saldo.";
    case "processing_error":
      return "Ocurrió un error procesando tu pago. Intenta nuevamente más tarde.";
    case "invalid_card_number":
      return "Número de tarjeta inválido. Verifica los datos e intenta de nuevo.";
    case "incorrect_zip":
      return "El código postal ingresado no coincide con la tarjeta. Verifica e intenta nuevamente.";
    case "authentication_required":
      return "Se requiere autenticación adicional para completar el pago. Sigue las instrucciones en pantalla.";
    case "amount_too_large":
      return "El monto a pagar excede el límite permitido. Intenta con un monto menor.";
    case "amount_too_small":
      return "El monto a pagar es demasiado pequeño. Verifica y vuelve a intentarlo.";
    case "balance_insufficient":
      return "No hay suficiente saldo en la cuenta para procesar este pago.";
    case "currency_not_supported":
      return "La moneda seleccionada no es soportada por la tarjeta.";
    case "card_not_supported":
      return "Esta tarjeta no es aceptada para pagos en línea. Usa otra tarjeta.";
    case "stolen_card":
      return "La tarjeta ha sido reportada como robada. Contacta a tu banco.";
    case "lost_card":
      return "La tarjeta ha sido reportada como perdida. Contacta a tu banco.";
    default:
      // Si Stripe no envía un code conocido, mostramos el mensaje que ya tiene o uno genérico
      return (
        message || "Ocurrió un error con tu pago. Intenta nuevamente más tarde."
      );
  }
}

export default getStripeErrorMessage;
