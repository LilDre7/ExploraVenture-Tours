require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // upgrade later with STARTTLS
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_USERNAME,
  },
});

module.exports = transporter;
