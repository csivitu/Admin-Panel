require('./db/init')
const { Project, joiProjectSchema } = require('./db/schema')
const Joi = require('joi')

module.exports = {
  name: 'project',
  actions: {
    create (ctx) {
      const { name, dbURL } = ctx.params
      try {
        const doc = Joi.attempt({
          name, dbURL
        }, joiProjectSchema)
        return Project.create(doc)
      } catch (err) {
        ctx.meta.$statusCode = 400
        return { error: err.toString() }
      }
    },
    async list (ctx) {
      try {
        const docs = await Project.find({}, { _id: false, name: true })
        if (docs.length === 0) {
          ctx.meta.$statusCode = 204
          return []
        }
        return docs
      } catch (err) {
        ctx.meta.$statusCode = 400
        return { error: err.toString() }
      }
    },
    async get (ctx) {
      try {
        const doc = await Project.find({ name: Joi.attempt(ctx.params.name, Joi.string()) }, { _id: false })
        if (doc.length !== 1) {
          ctx.meta.$statusCode = 404
          return { error: 'Error: project not found' }
        }
        return doc[0]
      } catch (err) {
        ctx.meta.$statusCode = 400
        return { error: err.toString() }
      }
    },
    update (ctx) {
      const { name, dbURL } = ctx.params
      try {
        const doc = Joi.attempt({ name, dbURL }, joiProjectSchema)
        return Project.updateOne({
          name: Joi.attempt(name, Joi.string())
        }, doc)
      } catch (err) {
        ctx.meta.$statusCode = 400
        return { error: err.toString() }
      }
    },
    delete (ctx) {
      try {
        return Project.deleteOne({ name: Joi.attempt(ctx.params.name, Joi.string()) })
      } catch (err) {
        ctx.meta.$statusCode = 400
        return { error: err.toString() }
      }
    }
  }
}
