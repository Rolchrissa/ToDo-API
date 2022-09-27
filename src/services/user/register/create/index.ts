import config from "src/config";
import { createUser as dbuser } from "src/utils/database/user";
import { sendMail } from "src/utils/mailing/send";
const { SENDGRID } = config;
const { API_EMAIL } = SENDGRID;
const createUser = async (user_data: any) => {
  const user = await dbuser(user_data);
  if (!user) return false;

  const msg = {
    to: user_data.email,
    from: API_EMAIL,
    subject: `Welcome to the team ${user_data.username}!`,
    text: "Cuenta creada",
    html: `<strong>${user_data.username}</strong>`,
  };
  try {
    await sendMail(msg);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export { createUser };
