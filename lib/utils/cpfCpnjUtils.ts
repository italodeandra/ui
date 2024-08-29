export function formatCpfCnpj(input = "") {
  // Remove any non-digit characters
  const cleanInput = input.replace(/\D/g, "");

  if (cleanInput.length === 11) {
    // Format as CPF (Individual Taxpayer Registry)
    return cleanInput.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  } else if (cleanInput.length === 14) {
    // Format as CNPJ (National Registry of Legal Entities)
    return cleanInput.replace(
      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
      "$1.$2.$3/$4-$5",
    );
  }
  return cleanInput;
}

export function isCpf(cpf: string) {
  cpf = cpf.replace(/\D+/g, "");

  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
    return false;
  }

  let sum = 0;
  let rest;

  // Valida o primeiro dígito verificador
  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cpf.charAt(i - 1)) * (11 - i);
  }

  rest = (sum * 10) % 11;
  if (rest === 10 || rest === 11) rest = 0;
  if (rest !== parseInt(cpf.charAt(9))) {
    return false;
  }

  sum = 0;

  // Valida o segundo dígito verificador
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cpf.charAt(i - 1)) * (12 - i);
  }

  rest = (sum * 10) % 11;
  if (rest === 10 || rest === 11) rest = 0;
  return rest === parseInt(cpf.charAt(10));
}

export function stripCpfCnpjFormatting(value: string) {
  return value.replace(/\D+/g, "");
}
