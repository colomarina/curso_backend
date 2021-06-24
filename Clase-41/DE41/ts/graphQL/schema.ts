import { SchemaComposer } from 'graphql-compose';
import { UserMutation, UserQuery } from "./user";
import { ProductoMutation, ProductoQuery } from './productos';

const schemaComposer = new SchemaComposer();

schemaComposer.Query.addFields({
  ...ProductoQuery,
});

schemaComposer.Mutation.addFields({
  ...ProductoMutation,
});

module.exports = schemaComposer.buildSchema();