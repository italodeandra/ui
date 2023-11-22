export default function asyncMap<T, R>(arr: T[] | undefined, predicate: (item: T) => Promise<R>): Promise<R[]>;
