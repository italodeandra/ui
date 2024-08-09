export default function getOrigin(req) {
    let origin;
    if (req.headers["referer"]) {
        origin = req.headers["referer"]?.split("/").slice(0, 3).join("/");
    }
    else if (req.headers["x-forwarded-host"]) {
        origin = `${req.headers["x-forwarded-proto"]}://${req.headers["x-forwarded-host"]}`;
    }
    else if (req.headers.origin) {
        origin = req.headers.origin;
    }
    else {
        const host = req.headers.host || "";
        const protocol = /^((localhost)|(\d+\.\d+\.\d+\.\d+))(:\d+)?$/.test(host)
            ? "http"
            : "https";
        origin = `${protocol}://${host}`;
    }
    return origin;
}
