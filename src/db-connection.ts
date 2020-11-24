export default abstract class DBConnection {
    
    public async abstract find(): Promise<void>;

    public async abstract update(): Promise<void>;

    public async abstract delete(): Promise<void>;

    public async abstract listCollection(): Promise<void>;

    public async abstract exportCollection(): Promise<void>;

    public async abstract connect(): Promise<void>;
}
