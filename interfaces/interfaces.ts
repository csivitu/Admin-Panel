import { Document } from 'mongoose';
import DBConnection from '../classes/DBConnection';

export interface CollectionSchema {
    name: string
}

export interface DocSchema extends Document {
    dbURL: string,
    name: string
}

export interface liveConnectionsSchema {
        [key: string]: DBConnection
}

export interface SQLReturnTypeSChema {
    [key: string]: string
}

interface paramsSchema {
    project: string,
    collection: string,
    oldDoc: object,
    newDoc: object
}

interface metaSchema {
    $statusCode: number
}

export interface ContextSchema {
    params: paramsSchema,
    meta: metaSchema
}
