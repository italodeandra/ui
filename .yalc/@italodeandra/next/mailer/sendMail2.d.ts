import { ReactElement } from "react";
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
