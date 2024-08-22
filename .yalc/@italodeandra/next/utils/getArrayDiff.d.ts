export default function getArrayDiff<T extends object>(array1: T[], array2: T[], by: keyof T): {
    type: "inserted" | "updated" | "deleted";
    before?: T;
    after?: T;
    diff: Partial<T>;
}[];
