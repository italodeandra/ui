export default async function asyncMap(arr, predicate) {
    return arr ? Promise.all(arr.map(predicate)) : [];
}
