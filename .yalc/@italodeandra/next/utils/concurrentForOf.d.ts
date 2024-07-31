export default function concurrentForOf<T>(items: T[], callback: (item: T) => Promise<void>, maxConcurrent: number): Promise<void>;
