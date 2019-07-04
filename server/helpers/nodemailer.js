import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL,
    serviceClient: process.env.CLIENT_ID,
    privateKey: process.env.PRIVATE_KEY,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export default transporter;
