import nodemailer from "nodemailer";
import dotenv from "dotenv";
import Mailgen from "mailgen";
dotenv.config();

const sendMail = async (options) => {
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Mailgen",
      link: "https://mailgen.js/",
    },
  });

  var emailBody = mailGenerator.generate(options.mailGenContent);

  var emailText = mailGenerator.generatePlaintext(options.mailGenContent);
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const handleMail = {
    from: "support@gmail.com",
    to: options.email,
    subject: options.subject,
    text: emailText,
    html: emailBody,
  };

  await transporter.sendMail(handleMail);
};
const generateMail = (username, verificationUrl) => {
  return {
    body: {
      name: username,
      intro: `Hi ${username}, welcome to our app! We're thrilled to have you join our community.`,
      action: {
        instructions:
          "To activate your account and get started, please verify your email address by clicking the button below:",
        button: {
          color: "#22BC66",
          text: "Verify Email",
          link: verificationUrl,
        },
      },
      outro:
        "If you have any questions or need assistance, feel free to reply to this email. We're always here to help!",
    },
  };
};

const forgotPasswordMail = (username, passwordResetUrl) => {
  return {
    body: {
      name: username,
      intro: `Hi ${username}, we received a request to reset your password.`,
      action: {
        instructions:
          "Click the button below to reset your password. This link will expire after a short time for security reasons.",
        button: {
          color: "#22BC66",
          text: "Reset Your Password",
          link: passwordResetUrl,
        },
      },
      outro:
        "If you didn’t request a password reset, you can safely ignore this email. If you need any help, just reply to this message — we’re here for you!",
    },
  };
};

export { sendMail, generateMail, forgotPasswordMail };
