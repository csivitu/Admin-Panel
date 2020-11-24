export default abstract class DBConnection {
    
    public async abstract find(instance): Promise<void>;

    public async abstract update(): Promise<void>;

    public async abstract delete(): Promise<void>;

    public async abstract listCollection(instance): Promise<void>;

    public async abstract exportCollection(collection, instance): Promise<void>;

    public async abstract connect(dbURL): Promise<void>;
}
