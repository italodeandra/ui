import { ContentBody, Product } from "mailgen";
import Mail from "nodemailer/lib/mailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
declare global {
    var nodemailer: {
        transporter: Mail<SMTPTransport.SentMessageInfo> | null;
    };
}
export default function prepareSendMail({ product, smtp, }: {
    product: Product;
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
}): (to: string, subject: string, content: ContentBody) => Promise<void>;
