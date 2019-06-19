import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.email,
    clientId: process.env.client,
    clientSecret: process.env.secret,
    refreshToken: process.env.token,
    accessToken: process.env.access,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export default transporter;
