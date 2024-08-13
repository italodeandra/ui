/* eslint-disable no-var */
import { createTestAccount, createTransport, getTestMessageUrl, } from "nodemailer";
import { render } from "@react-email/components";
import { onlyServer } from "../utils/isServer";
const _global = (onlyServer(() => global) || {});
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
        if (!_global._nodemailerTransporter) {
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
            _global._nodemailerTransporter = createTransport(smtp.server);
        }
        const htmlString = render(emailBody, {
            pretty: true,
        });
        const info = await _global._nodemailerTransporter.sendMail({
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
