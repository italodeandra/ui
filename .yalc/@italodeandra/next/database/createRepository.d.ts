import { Collection } from "mongodb";
export default function createRepository<TSchema>(collectionName: string, setup?: () => Promise<void> | void): Collection<TSchema>;
