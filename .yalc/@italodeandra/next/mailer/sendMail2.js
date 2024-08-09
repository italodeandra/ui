/* eslint-disable no-var */
import { createTestAccount, createTransport, getTestMessageUrl, } from "nodemailer";
import { render } from "@react-email/components";
let cached = global.nodemailer;
if (!cached) {
    cached = global.nodemailer = { transporter: null };
}
const isProd = process.env.APP_ENV === "production";
export default function prepareSendMail(props) {
    let smtp = props?.smtp || {
        from: process.env.SMTP_FROM,
        server: {
            auth: {
                pass: process.env.SMTP_PASS,
                user: process.env.SMTP_USER,
            },
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT),
        },
    };
    return async (to, subject, emailBody) => {
        if (!cached.transporter) {
            if (!isProd) {
                const testAccount = await createTestAccount();
                smtp = {
                    from: `Majapi <${testAccount.user}>`,
                    server: {
                        host: "smtp.ethereal.email",
                        port: 587,
                        auth: {
                            user: testAccount.user,
                            pass: testAccount.pass,
                        },
                    },
                };
            }
            cached.transporter = createTransport(smtp.server);
        }
        const htmlString = render(emailBody, {
            pretty: true,
        });
        const info = await cached.transporter.sendMail({
            from: smtp.from,
            to,
            subject,
            html: htmlString,
        });
        if (!isProd) {
            console.info("Message sent: %s", info.messageId);
            console.info("Preview URL: %s", getTestMessageUrl(info));
        }
    };
}
