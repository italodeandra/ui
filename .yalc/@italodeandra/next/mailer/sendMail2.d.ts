import Mail from "nodemailer/lib/mailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { ReactElement } from "react";
declare global {
    var nodemailer: {
        transporter: Mail<SMTPTransport.SentMessageInfo> | null;
    };
}
export default function prepareSendMail(props?: {
    smtp?: {
        from: string;
        server: {
            host: string;
            port: number;
            auth: {
                user: string;
                pass: string;
            };
        };
    };
}): (to: string, subject: string, emailBody: ReactElement) => Promise<void>;
