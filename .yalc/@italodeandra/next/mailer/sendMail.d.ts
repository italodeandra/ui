import { ContentBody } from "mailgen";
import Mail from "nodemailer/lib/mailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
declare global {
    var nodemailer: {
        transporter: Mail<SMTPTransport.SentMessageInfo> | null;
    };
}
export default function sendMail(to: string, subject: string, content: ContentBody): Promise<void>;
