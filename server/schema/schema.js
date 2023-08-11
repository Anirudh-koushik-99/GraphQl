// USING SCHEMA TO BRING IN DATA FROM ANY DATABASE

//Mongoose models
const Project = require("../models/Project.js");
const Client = require("../models/Client.js");

const graphql = require("graphql");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

//Project Type
const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve(parent, args) {
        return Client.findById(parent.clientId);
      },
    },
  }),
});

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
    clients: {
      type: new GraphQLList(ClientType),
      resolve(parent, args) {
        return Client.find();
      },
    },
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Client.findById(args.id);
      },
    },
    projects: {
      type: new GraphQLList(ProjectType),
      resolve(parent, args) {
        return Project.find();
      },
    },
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Project.findById(args.id);
      },
    },
  },
});

//Mutations
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addClient: {
      type: ClientType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args){
        //can also use the Client.create({}) method
        /*
          Client.create({
            name: args.name,
            email: args.email,
            phone: args.phone,
          })
        */
        const client = new Client({
          name: args.name,
          email: args.email,
          phone: args.phone,
        })
        return client.save()
      }
    },
    deleteClient: {
      type: ClientType,
      args: { id: { type: GraphQLNonNull(GraphQLID) } },
      resolve(parent, args) {
        return Client.findByIdAndRemove(args.id);
      },
    }
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});

//SAMPLE GraphiQL QUERY
/*
{
  project(id: "1"){
    name,
    status,
    description,
    client{
      name
    }
  }
}

RESPONSE - 
{
  "data": {
    "project": {
      "name": "eCommerce Website",
      "status": "In Progress",
      "description": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu.",
      "client": {
        "name": "Tony Stark"
      }
    }
  }
}
*/
