import { Document } from 'mongoose';

export interface CollectionSchema {
    name: string
}

export interface DocSchema extends Document {
    dbURL: string,
    name: string
}

interface paramsSchema {
    project: string,
    collection: string
}

interface metaSchema {
    $statusCode: number
}

export interface ContextSchema {
    params: paramsSchema,
    meta: metaSchema
}
