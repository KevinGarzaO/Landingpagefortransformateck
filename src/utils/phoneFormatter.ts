export const normalizeMxPhone = (rawPhone: string) => {
  if (!rawPhone) return "";

  // quitar todo lo que no sea número
  let phone = rawPhone.replace(/\D/g, "");

  // quitar prefijos comunes de México
  if (phone.startsWith("521")) phone = phone.slice(3);
  else if (phone.startsWith("52")) phone = phone.slice(2);

  // asegurar solo 10 dígitos
  return phone.slice(-10);
};

export const formatMxPhone = (phone: string) => {
  if (phone.length !== 10) return phone;
  return `${phone.slice(0, 2)} ${phone.slice(2, 6)} ${phone.slice(6)}`;
};
