import { NewDocumentSchema } from '../interfaces/interfaces';

export default abstract class DBConnection {
    abstract setupConnection(): Promise<object>;

    abstract closeConnection(): Promise<void>;

    abstract exportCollection(_collection: string): Promise<object>;

    abstract listCollections(): Promise<object>;

    abstract deleteCollection(_collection: string): Promise<object>;

    abstract deleteDocument(_collection: string, _key: object): Promise<object>;

    abstract addDocument(_collection: string, _tuple: NewDocumentSchema): Promise<object>;

    abstract updateDocument(
        _collection: string,
        _keyTuple: NewDocumentSchema,
         _tuple: NewDocumentSchema): Promise<object>;
}
