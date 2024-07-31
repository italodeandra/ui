"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const form_data_1 = __importDefault(require("form-data"));
const converters_1 = require("./fileStorage/converters");
async function uploadToImgur(image) {
    if (typeof image === "string" && image.startsWith("http")) {
        return image;
    }
    const data = new form_data_1.default();
    data.append("image", typeof image == "string" && image.startsWith("data")
        ? (0, converters_1.base64ToBuffer)(image)
        : image);
    return (0, axios_1.default)({
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
exports.default = uploadToImgur;
