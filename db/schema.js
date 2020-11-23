import mongoose from 'mongoose';
import joigoose from 'joigoose';
import Joi from 'joi';

const Joigoose = joigoose(mongoose);

const joiProjectSchema = Joi.object({
  name: Joi.string().required().meta({ unique: true }),
  dbURL: Joi.string().required().meta({ unique: true }),
});

const mongooseProjectSchema = new mongoose.Schema(
  Joigoose.convert(joiProjectSchema),
);

const Project = mongoose.model('Project', mongooseProjectSchema);

export {
  Project,
  joiProjectSchema,
};
