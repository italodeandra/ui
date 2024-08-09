import ms from "ms";
export default async function waitFor(asyncFunction, interval, timeout) {
    const start = Date.now();
    return new Promise((resolve, reject) => {
        const intervalId = setInterval(async () => {
            let result;
            try {
                result = await asyncFunction();
            }
            catch (e) {
                clearInterval(intervalId);
                reject(e);
                return;
            }
            if (result) {
                clearInterval(intervalId);
                resolve(result);
            }
            else if (Date.now() - start >=
                (typeof timeout === "string" ? ms(timeout) : timeout)) {
                clearInterval(intervalId);
                reject(new Error("Timeout reached"));
            }
        }, typeof interval === "string" ? ms(interval) : interval);
    });
}
