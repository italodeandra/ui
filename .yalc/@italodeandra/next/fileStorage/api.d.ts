/// <reference types="node" />
import { NextApiHandler } from "next";
export type GetFileArgs = {
    fileStorage?: [string, string];
};
declare const FileStorage: () => NextApiHandler<Buffer>;
export default FileStorage;
