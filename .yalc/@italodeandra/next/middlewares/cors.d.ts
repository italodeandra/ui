import { CorsOptions } from "cors";
import type { NextMiddleware } from "next-api-middleware";
/**
 * The CORS middleware.
 */
declare const cors: (config?: CorsOptions) => NextMiddleware;
export default cors;
