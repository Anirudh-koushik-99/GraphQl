// USING SCHEMA TO BRING IN DATA FROM ANY DATABASE
const { projects, clients } = require("../sampleData.js");

const graphql = require("graphql");

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList } = graphql;

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
      resolve(parent, args){
        return clients.find(client => client.id === parent.clientId)
      }
    }
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
      resolve(parent,args){
        return clients;
      }
    },
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return clients.find((client) => client.id === args.id);
      },
    },
    projects: {
      type: new GraphQLList(ProjectType),
      resolve(parent,args){
        return projects;
      }
    },
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return projects.find((project) => project.id === args.id);
      },
    },
  },
});

module.exports = new GraphQLSchema({
    query: RootQuery
})

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
