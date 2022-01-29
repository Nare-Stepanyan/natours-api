import nodemailer from 'nodemailer';
import pug from 'pug';
import htmlToText from 'html-to-text';
import path from 'path';
const __dirname = path.resolve();

class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `Nar <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    // Sendgrid
    return nodemailer.createTransport({
      service: process.env.SENDGRID_SERVICE,
      host: process.env.SENDGRID_HOST,
      port: process.env.SENDGRID_PORT,
      auth: {
        user: process.env.SENDGRID_USERNAME,
        pass: process.env.SENDGRID_PASSWORD
      }
    });
  }

  async send(template, subject) {
    const html = pug.renderFile(`${__dirname}/views/email/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      subject
    });

    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.fromString(html)
    };

    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send('welcome', 'Welcome to the Natours Family!');
  }

  async sendPasswordReset() {
    await this.send(
      'passwordReset',
      'Your password reset token (valid for only 10 minutes)'
    );
  }
}

export default Email;
