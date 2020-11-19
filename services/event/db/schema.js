const mongoose = require('mongoose')
const Joigoose = require('joigoose')(mongoose)
const Joi = require('joi')

const joiEventSchema = Joi.object({
  name: Joi.string().required().meta({ unique: true }),
  dbURL: Joi.string().required(),
  regCount: Joi.number().required().meta({ default: 0 }),
  date: Joi.string().required()
})

const mongooseEventSchema = new mongoose.Schema(
  Joigoose.convert(joiEventSchema)
)

const Event = mongoose.model('Event', mongooseEventSchema)

module.exports = {
  Event,
  joiEventSchema
}
