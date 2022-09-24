import bcrypt from "bcrypt";
const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

const validatePassword = async (password: any, hash: any) => {
  const isValid = await bcrypt.compare(password, hash);
  return isValid;
};

export { hashPassword, validatePassword };
