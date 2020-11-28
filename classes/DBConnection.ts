export default abstract class DBConnection {
    abstract setupConnection(): Promise<object>;

    abstract closeConnection(): Promise<void> | undefined;

    abstract exportCollection(_collection: string): Promise<object> | undefined;

    abstract listCollections(): Promise<object> | undefined;
}
