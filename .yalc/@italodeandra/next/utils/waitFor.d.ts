export default function waitFor<T>(asyncFunction: () => Promise<T>, interval: number | string, timeout: number | string): Promise<T>;
