import nodemailer, { Transporter } from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

interface VerifyUserEmailParams {
  email: string;
  token: string;
  nome: string;
}

const transporter: Transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  secure: false,
  auth: {
    user: process.env.MAILER_USER as string, 
    pass: process.env.MAILER_PASSWORD as string,
  },
});

export const verifyUserEmail = async ({
  email,
  token,
  nome,
}: VerifyUserEmailParams): Promise<void> => {
  try {
    await transporter.sendMail({
      from: process.env.MAILER_USER,
      to: email,
      subject: `${token} é seu código do Time2Play`,
      text: `Olá, ${nome}!
Esse é o seu código de recuperação de senha para o Time2Play.

Caso não tenha solicitado esse código, apenas ignore esse e-mail.

Seu token de recuperação de senha é ${token}`,
    });
    console.log("Email enviado com sucesso");
  } catch (err) {
    console.error("Erro ao enviar email:", err);
  }
};
