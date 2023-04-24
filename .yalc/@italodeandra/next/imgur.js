"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var form_data_1 = __importDefault(require("form-data"));
var converters_1 = require("./fileStorage/converters");
function uploadToImgur(image) {
    var data = new form_data_1.default();
    data.append("image", typeof image == "string" && image.startsWith("data")
        ? (0, converters_1.base64ToBuffer)(image)
        : image);
    var config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://api.imgur.com/3/image",
        headers: __assign({ Authorization: "Client-ID 4e33f012808af45" }, data.getHeaders()),
        data: data,
    };
    return (0, axios_1.default)(config).then(function (res) { return res.data.data.link; });
}
exports.default = uploadToImgur;
