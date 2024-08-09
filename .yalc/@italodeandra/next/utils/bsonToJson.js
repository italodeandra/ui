export default function bsonToJson(value) {
    if (value === undefined || value === null) {
        return value;
    }
    try {
        return JSON.parse(JSON.stringify(value));
    }
    catch (e) {
        console.error(e);
        return undefined;
    }
}
