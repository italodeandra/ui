"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-var */
const mailgen_1 = __importDefault(require("mailgen"));
const nodemailer_1 = require("nodemailer");
let cached = global.nodemailer;
if (!cached) {
    cached = global.nodemailer = { transporter: null };
}
const isProd = process.env.APP_ENV === "production";
function prepareSendMail({ product, smtp, }) {
    smtp = smtp || {
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
    return async (to, subject, content) => {
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
        const mailGenerator = new mailgen_1.default({
            theme: "cerberus",
            product,
        });
        const emailBody = mailGenerator.generate({ body: content });
        const emailText = mailGenerator.generatePlaintext({ body: content });
        const info = await cached.transporter.sendMail({
            from: smtp.from,
            to,
            subject,
            text: emailText,
            html: emailBody,
        });
        if (!isProd) {
            console.info("Message sent: %s", info.messageId);
            console.info("Preview URL: %s", (0, nodemailer_1.getTestMessageUrl)(info));
        }
    };
}
exports.default = prepareSendMail;
