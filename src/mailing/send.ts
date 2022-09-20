import { Mail } from "../types/mails.types";
import { SENDGRID_API_EMAIL, SENDGRID_API_KEY } from "../../config/constant";
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(SENDGRID_API_KEY);
export const sendMail = async (msg: Mail) => {
  msg.from = SENDGRID_API_EMAIL;
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};
