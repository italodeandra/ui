import { isNil } from "lodash-es";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function queryString(obj) {
    return Object.entries(obj)
        .map(([key, value]) => {
        if (isNil(value)) {
            return null;
        }
        if (Array.isArray(value)) {
            return value
                .map((item) => `${encodeURIComponent(key)}=${encodeURIComponent(item)}`)
                .join("&");
        }
        return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    })
        .filter(Boolean)
        .join("&");
}
