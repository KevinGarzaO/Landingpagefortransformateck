"use client";

/**
 * Hook para vibración háptica en dispositivos móviles Android
 * iOS Safari no soporta la Vibration API en web
 */
export function useHapticFeedback() {
  // Verificar si la vibración está soportada
  const isSupported = typeof navigator !== 'undefined' && 'vibrate' in navigator;

  /**
   * Vibración muy suave para typing (como ChatGPT)
   * Solo vibra cada ciertos caracteres para no saturar
   */
  let typingCounter = 0;
  const vibrateOnType = () => {
    if (!isSupported) return;
    
    typingCounter++;
    // Vibrar cada 3-4 caracteres para una sensación suave
    if (typingCounter % 4 === 0) {
      navigator.vibrate(8); // Vibración muy corta (8ms)
    }
  };

  /**
   * Vibración suave para acciones (enviar, click, etc.)
   */
  const vibrateLight = () => {
    if (!isSupported) return;
    navigator.vibrate(15);
  };

  /**
   * Vibración media para confirmaciones
   */
  const vibrateMedium = () => {
    if (!isSupported) return;
    navigator.vibrate(30);
  };

  /**
   * Vibración para errores o alertas
   */
  const vibrateError = () => {
    if (!isSupported) return;
    navigator.vibrate([50, 30, 50]); // Patrón de error
  };

  /**
   * Vibración doble para notificaciones/respuestas
   */
  const vibrateNotification = () => {
    if (!isSupported) return;
    navigator.vibrate([15, 50, 15]);
  };

  /**
   * Resetear el contador de typing
   */
  const resetTypingCounter = () => {
    typingCounter = 0;
  };

  return {
    isSupported,
    vibrateOnType,
    vibrateLight,
    vibrateMedium,
    vibrateError,
    vibrateNotification,
    resetTypingCounter,
  };
}
