import mongoose from 'mongoose';
import JG from 'joigoose';
import Joi from 'joi';

const Joigoose = JG(mongoose);

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
