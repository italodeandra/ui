export default function paginated(array, page, perPage) {
    return array.slice(page * perPage, (page + 1) * perPage);
}
