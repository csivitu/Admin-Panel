export default abstract class DBConnection {
    abstract updateDocument(_collection: string,
        _oldDoc: object, _newDoc: object): Promise<object>;

    abstract addDocument(_collection: string, _newDoc: object): Promise<object>;

    abstract deleteDocument(_collection: string, _oldDoc: object): Promise<object>;

    abstract deleteCollection(_collection: string): Promise<object>;

    abstract setupConnection(): Promise<object>;

    abstract closeConnection(): Promise<void>;

    abstract exportCollection(_collection: string): Promise<object[]>;

    abstract listCollections(): Promise<object>;
}
