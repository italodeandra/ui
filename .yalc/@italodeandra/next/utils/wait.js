import ms from "ms";
export default function wait(time) {
    return new Promise((resolve) => {
        setTimeout(resolve, typeof time === "string" ? ms(time) : time);
    });
}
