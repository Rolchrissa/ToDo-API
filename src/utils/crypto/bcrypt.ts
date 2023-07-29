import bcrypt from "bcrypt";
const hashPassword = async (password: string | null) => {
  if (!password) throw new Error("Password is required");
  const maxLength = 72;
  const encoder = new TextEncoder(); // Utiliza TextEncoder para contar los bytes, no los caracteres
  const encodedPassword = encoder.encode(password);

  if (encodedPassword.length > maxLength) {
    throw new Error("is to long");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

const validatePassword = async (password: any, hash: any) => {
  const isValid = await bcrypt.compare(password, hash);
  return isValid;
};

export { hashPassword, validatePassword };
