export default function whereWrapper(len: number) {
    let query = '';
    for (let i = 0; i < len; i += 1) {
        if (i === 0) {
            query += 'WHERE ? ';
        } else {
            query += 'AND ? ';
        }
    }
    const ret = query.trim();
    return ret;
}
