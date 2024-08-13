import { ContentBody, Product } from "mailgen";
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
