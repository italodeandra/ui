export const unmaskCpf = (value: string) =>
  value.replace(/\D/g, "").substring(0, 11);
export const maskCpf = (value: string) => {
  const valueSplit = value.split("");
  if (valueSplit.length > 3) valueSplit.splice(3, 0, ".");
  if (valueSplit.length > 7) valueSplit.splice(7, 0, ".");
  if (valueSplit.length > 11) valueSplit.splice(11, 0, "-");
  return valueSplit.join("").substring(0, 14);
};
export const cpfMask = { mask: maskCpf, unmask: unmaskCpf };
