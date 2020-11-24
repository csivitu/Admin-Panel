import Joi from 'joi';
import broker from '../../misc/broker';
import { Project, joiProjectSchema } from '../../db/schema';
import { connectDB, liveConnections } from '../../db/connectProjects';

broker.createService({
  name: 'project',
  actions: {
    async create(ctx) {
      const { name, dbURL } = ctx.params;
      try {
        const doc = Joi.attempt({
          name, dbURL,
        }, joiProjectSchema);
        const document = await Project.create(doc);
        connectDB(document);
        return document;
      } catch (err) {
        ctx.meta.$statusCode = 400;
        return { error: err.toString() };
      }
    },
    async list(ctx) {
      try {
        const docs = await Project.find({}, { _id: false, name: true });
        return docs;
      } catch (err) {
        ctx.meta.$statusCode = 400;
        return { error: err.toString() };
      }
    },
    async get(ctx) {
      try {
        const doc = await Project.find({
          name: Joi.attempt(ctx.params.name, Joi.string()),
        });
        if (doc.length !== 1) {
          ctx.meta.$statusCode = 404;
          return { error: 'Error: project not found' };
        }
        return doc[0];
      } catch (err) {
        ctx.meta.$statusCode = 400;
        return { error: err.toString() };
      }
    },
    async update(ctx) {
      const { name, dbURL } = ctx.params;
      try {
        const doc = Joi.attempt({ name, dbURL }, joiProjectSchema);
        const document = await Project.updateOne({
          name: Joi.attempt(name, Joi.string()),
        }, doc);
        if (liveConnections[name]) {
          try {
            liveConnections[name].end();
          } catch {
            liveConnections[name].close();
          }
          delete liveConnections[name];
        }
        connectDB(document);
        return document;
      } catch (err) {
        ctx.meta.$statusCode = 400;
        return { error: err.toString() };
      }
    },
    async remove(ctx) {
      try {
        const document = await Project.deleteOne({
          name: Joi.attempt(ctx.params.name, Joi.string()),
        });
        if (liveConnections[ctx.params.name]) {
          try {
            liveConnections[ctx.params.name].connection.end();
          } catch {
            liveConnections[ctx.params.name].connection.close();
          }
          delete liveConnections[ctx.params.name];
        }
        return document;
      } catch (err) {
        ctx.meta.$statusCode = 400;
        return { error: err.toString() };
      }
    },
  },
});
