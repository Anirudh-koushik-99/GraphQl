// USING SCHEMA TO BRING IN DATA FROM ANY DATABASE
const { projects, clients } = require("../sampleData.js");

const graphql = require("graphql");

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema } = graphql;

//Client Type
const ClientType = new GraphQLObjectType({
  name: "Client",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

//TO MAKE A QUERY WE NEED A ROOT QUERY OBJECT
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return clients.find((client) => client.id === args.id);
      },
    },
  },
});

module.exports = new GraphQLSchema({
    query: RootQuery
})
