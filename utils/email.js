import nodemailer from 'nodemailer';

const sendEmail = async options => {
  const { email, subject, message } = options;
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  const mailOptions = {
    from: 'Nar <nar@gmail.com>',
    to: email,
    subject,
    text: message
  };

  await transporter.sendMail(mailOptions);
};

export default sendEmail;
