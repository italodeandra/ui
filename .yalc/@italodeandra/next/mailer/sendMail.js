"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mailgen_1 = __importDefault(require("mailgen"));
var nodemailer_1 = require("nodemailer");
var cached = global.nodemailer;
if (!cached) {
    cached = global.nodemailer = { transporter: null };
}
var isProd = process.env.APP_ENV === "production";
function prepareSendMail(_a) {
    var _this = this;
    var product = _a.product, smtp = _a.smtp;
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
    return function (to, subject, content) { return __awaiter(_this, void 0, void 0, function () {
        var testAccount, mailGenerator, emailBody, emailText, info;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!!cached.transporter) return [3 /*break*/, 3];
                    if (!!isProd) return [3 /*break*/, 2];
                    return [4 /*yield*/, (0, nodemailer_1.createTestAccount)()];
                case 1:
                    testAccount = _a.sent();
                    smtp = {
                        from: "Majapi <".concat(testAccount.user, ">"),
                        server: {
                            host: "smtp.ethereal.email",
                            port: 587,
                            auth: {
                                user: testAccount.user,
                                pass: testAccount.pass,
                            },
                        },
                    };
                    _a.label = 2;
                case 2:
                    cached.transporter = (0, nodemailer_1.createTransport)(smtp.server);
                    _a.label = 3;
                case 3:
                    mailGenerator = new mailgen_1.default({
                        theme: "cerberus",
                        product: product,
                    });
                    emailBody = mailGenerator.generate({ body: content });
                    emailText = mailGenerator.generatePlaintext({ body: content });
                    return [4 /*yield*/, cached.transporter.sendMail({
                            from: smtp.from,
                            to: to,
                            subject: subject,
                            text: emailText,
                            html: emailBody,
                        })];
                case 4:
                    info = _a.sent();
                    if (!isProd) {
                        console.info("Message sent: %s", info.messageId);
                        console.info("Preview URL: %s", (0, nodemailer_1.getTestMessageUrl)(info));
                    }
                    return [2 /*return*/];
            }
        });
    }); };
}
exports.default = prepareSendMail;
