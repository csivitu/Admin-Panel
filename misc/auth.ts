const token = process.env.TOKEN || 'some-secret-here';

export default function auth(
    req: {query: { token: string; }; },
    res: { status: Function },
    next: Function,
) {
    if (req.query.token !== token) {
        res.status(401).json({ error: 'Error: unauthorized' });
    } else {
        next();
    }
}
