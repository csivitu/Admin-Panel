const mongoose = require('mongoose')
const Joigoose = require('joigoose')(mongoose)
const Joi = require('joi')

const joiProjectSchema = Joi.object({
  name: Joi.string().required().meta({ unique: true }),
  dbURL: Joi.string().required().meta({ unique: true })
})

const mongooseProjectSchema = new mongoose.Schema(
  Joigoose.convert(joiProjectSchema)
)

const Project = mongoose.model('Project', mongooseProjectSchema)

module.exports = {
  Project,
  joiProjectSchema
}
