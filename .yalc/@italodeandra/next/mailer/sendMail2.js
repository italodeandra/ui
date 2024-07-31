"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-var */
const nodemailer_1 = require("nodemailer");
const components_1 = require("@react-email/components");
let cached = global.nodemailer;
if (!cached) {
    cached = global.nodemailer = { transporter: null };
}
const isProd = process.env.APP_ENV === "production";
function prepareSendMail(props) {
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
                const testAccount = await (0, nodemailer_1.createTestAccount)();
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
            cached.transporter = (0, nodemailer_1.createTransport)(smtp.server);
        }
        const htmlString = (0, components_1.render)(emailBody, {
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
            console.info("Preview URL: %s", (0, nodemailer_1.getTestMessageUrl)(info));
        }
    };
}
exports.default = prepareSendMail;
