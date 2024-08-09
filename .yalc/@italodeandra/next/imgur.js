import axios from "axios";
import FormData from "form-data";
import { base64ToBuffer } from "./fileStorage/converters";
export default async function uploadToImgur(image) {
    if (typeof image === "string" && image.startsWith("http")) {
        return image;
    }
    const data = new FormData();
    data.append("image", typeof image == "string" && image.startsWith("data")
        ? base64ToBuffer(image)
        : image);
    return axios({
        method: "post",
        maxBodyLength: Infinity,
        url: "https://api.imgur.com/3/image",
        headers: {
            Authorization: "Client-ID 4e33f012808af45",
            ...data.getHeaders(),
        },
        data: data,
    }).then((res) => res.data.data.link);
}
