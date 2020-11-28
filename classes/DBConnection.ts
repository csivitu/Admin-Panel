export default abstract class DBConnection {
    abstract setupConnection(): Promise<object>;

    abstract closeConnection(): Promise<void>;

    abstract exportCollection(_collection: string): Promise<object>;

    abstract listCollections(): Promise<object>;
}
