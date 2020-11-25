export default abstract class DBConnection {
    abstract setupConnection(): Promise<object>;

    abstract closeConnection(): Promise<void>;

    abstract findAll(_collection: string, _params?: object, _fields?: object): Promise<object>;

    abstract listCollections(): Promise<object>;
}
