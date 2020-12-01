import { Document } from 'mongoose';

export interface CollectionSchema {
    name: string
}

export interface DocSchema extends Document {
    dbURL: string,
    name: string
}
export interface NewDocumentSchema{
   tuple: object,
}

interface paramsSchema {
    project: string,
    collection: string,
    key: object,
    tuple: NewDocumentSchema,
    keyTuple: NewDocumentSchema,
}
interface metaSchema {
    $statusCode: number
}

export interface ContextSchema {
    params: paramsSchema,
    meta: metaSchema
}
