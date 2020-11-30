export default abstract class DBConnection {
    abstract setupConnection(): Promise<object>;

    abstract closeConnection(): Promise<void>;

    abstract exportCollection(_collection: string): Promise<object>;

    abstract listCollections(): Promise<object>;

    abstract deleteCollection(_collection: string): Promise<object>;

    abstract deleteDocument(_collection: string, _key: string | number): Promise<object>;
}
