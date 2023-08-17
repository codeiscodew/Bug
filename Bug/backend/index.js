const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
} = require("graphql");
const mysql = require("mysql2/promise");

const app = express();

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "yourpassword",
  database: "bug_list_db", // Replace with your database name
});

// Define a BugType for GraphQL
const BugType = new GraphQLObjectType({
  name: "Bug",
  fields: {
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
  },
});

// Define the root query for GraphQL
const RootQueryType = new GraphQLObjectType({
  name: "Query",
  fields: {
    bug: {
      type: BugType,
      args: { id: { type: GraphQLString } },
      resolve: async (_, args) => {
        const [rows] = await pool.query("SELECT * FROM bugs WHERE id = ?", [
          args.id,
        ]);
        return rows[0];
      },
    },
    bugs: {
      type: new GraphQLList(BugType),
      resolve: async () => {
        const [rows] = await pool.query("SELECT * FROM bugs");
        return rows;
      },
    },
  },
});

// Create a GraphQL schema
const schema = new GraphQLSchema({
  query: RootQueryType,
});

// Create a GraphQL HTTP server
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true, // Enable the GraphQL Playground
  })
);

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
