export declare function uploadImage<T extends string | undefined>(image: T, objectName: string, metaData?: Record<string, any>): Promise<string | T>;
export declare function uploadFile<T extends string | undefined>(file: T, objectFileName: string, contentType: string, metaData?: Record<string, any>): Promise<string | T>;
