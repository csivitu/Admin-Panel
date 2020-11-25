export default abstract class DBConnection {
    abstract setupConnection(): Promise<object>;

    abstract closeConnection(): Promise<void>;

    abstract findAll(_collection: string): Promise<object>;

    abstract listCollections(): Promise<object>;
}
