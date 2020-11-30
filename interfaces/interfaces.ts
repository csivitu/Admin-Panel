import { Document } from 'mongoose';

export interface CollectionSchema {
    name: string
}

export interface DocSchema extends Document {
    dbURL: string,
    name: string
}
export interface NewDocumentSchema{
    key: string,
    value: string,
}

interface paramsSchema {
    project: string,
    collection: string,
    key: string | number,
    tuple: NewDocumentSchema,
}
interface metaSchema {
    $statusCode: number
}

export interface ContextSchema {
    params: paramsSchema,
    meta: metaSchema
}
