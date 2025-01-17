import nodemailer, { Transporter } from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

interface VerifyUserEmailParams {
  userEmail: string;
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
  userEmail,
  token,
  nome,
}: VerifyUserEmailParams): Promise<void> => {
  try {
    await transporter.sendMail({
      from: process.env.MAILER_USER,
      to: userEmail,
      subject: "Recuperação de senha para sua conta no Time2Play",
      text: `Olá, ${nome}! Você solicitou a recuperação da sua senha para a sua conta no Time2Play. Caso não tenha solicitado, apenas ignore esse e-mail. Seu token de recuperação de senha é ${token}`,
    });
    console.log("Email enviado com sucesso");
  } catch (err) {
    console.error("Erro ao enviar email:", err);
  }
};
