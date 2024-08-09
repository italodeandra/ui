// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function log(content) {
    if (process.env.LOG_API_URL && process.env.LOG_APP_ID) {
        await fetch(process.env.LOG_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.LOG_TOKEN}`,
            },
            body: JSON.stringify({
                appId: process.env.LOG_APP_ID,
                content,
            }),
        });
    }
}
