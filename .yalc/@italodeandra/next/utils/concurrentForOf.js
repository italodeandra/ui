export default async function concurrentForOf(items, callback, maxConcurrent) {
    const processInBatches = async (items, maxConcurrent) => {
        const results = [];
        const executing = new Set();
        for (const item of items) {
            const promise = callback(item).then(() => {
                executing.delete(promise);
            });
            results.push(promise);
            executing.add(promise);
            if (executing.size >= maxConcurrent) {
                await Promise.race(executing);
            }
        }
        return Promise.all(results);
    };
    await processInBatches(items, maxConcurrent);
}
