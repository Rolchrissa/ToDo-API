import CONFIG from "src/config";
import { Mail } from "../../types/mails.types";
const sgMail = require("@sendgrid/mail");
const { SENDGRID } = CONFIG;
sgMail.setApiKey(SENDGRID.API_KEY);

export const sendMail = async (msg: Mail) => {
  msg.from = SENDGRID.API_EMAIL;
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};
