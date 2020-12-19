import mongoose from 'mongoose';
import joigoose from 'joigoose';
import Joi from 'joi';
import { DocSchema } from '../interfaces/interfaces';

const Joigoose = joigoose(mongoose);

const joiProjectSchema = Joi.object({
    name: Joi.string().required().meta({ unique: true }),
    dbURL: Joi.string().required().meta({ unique: true }),
}).options({ stripUnknown: true });

const mongooseProjectSchema = new mongoose.Schema(
    Joigoose.convert(joiProjectSchema),
);

const Project = mongoose.model<DocSchema>('Project', mongooseProjectSchema);

export {
    Project,
    joiProjectSchema,
};
