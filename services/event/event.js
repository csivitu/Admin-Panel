require('./db/init')
const { Project, joiProjectSchema } = require('./db/schema')
const Joi = require('joi')

module.exports = {
  name: 'project',
  actions: {
    create (ctx) {
      const { name, dbURL, date } = ctx.params
      if (dbURL !== 'SQL' || dbURL !== 'NOSQL') {
        ctx.meta.$statusCode = 400
        return { error: 'Error: invalid db type' }
      }
      try {
        const doc = Joi.attempt({
          name, dbURL, date
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
          ctx.meta.$statusCode = 400
          return { error: 'Error: list is empty' }
        }
        return docs
      } catch (err) {
        ctx.meta.$statusCode = 400
        return { error: err.toString() }
      }
    },
    async get (ctx) {
      try {
        const doc = Project.find({ name: Joi.attempt(ctx.params.name, Joi.string()) }, { _id: false })
        if (doc.length !== 1) {
          ctx.meta.$statusCode = 400
          return { error: `Error: no such project with name '${ctx.params.name}' found` }
        }
        return doc[0]
      } catch (err) {
        ctx.meta.$statusCode = 400
        return { error: err.toString() }
      }
    },
    update (ctx) {
      const { name, dbURL, date } = ctx.params
      if (dbURL !== 'SQL' || dbURL !== 'NOSQL') {
        ctx.meta.$statusCode = 400
        return { error: 'Error: invalid db type' }
      }
      try {
        const doc = Joi.attempt({ name, dbURL, date }, joiProjectSchema)
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
