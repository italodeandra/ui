export default function getIp(req) {
    let ip = req.headers["x-real-ip"];
    const forwardedFor = req.headers["x-forwarded-for"];
    if (!ip && forwardedFor) {
        ip = forwardedFor?.split(",").at(0) ?? "Unknown";
    }
    if (!ip && req.socket.remoteAddress) {
        ip = req.socket.remoteAddress;
    }
    return ip;
}
