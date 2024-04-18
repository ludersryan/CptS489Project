const express = require("express")
require('dotenv').config()
const { createHandler } = require("graphql-http/lib/use/express")
const schema = require('./schema/schema')
const port = process.env.PORT || 5000

const connectDB = require('./config/db')

var { ruruHTML } = require("ruru/server")


connectDB();


var app = express()

// Create and use the GraphQL handler.
app.all(
  "/graphql",
  createHandler({
    schema: schema,
    rootValue: {},
    graphiql: process.env.NODE_ENV === 'development'
  })
);

// Serve the GraphiQL IDE.
app.get("/", (_req, res) => {
  res.type("html")
  res.end(ruruHTML({ endpoint: "/graphql" }))
})

// Start the server at port
app.listen(port)
console.log("Running a GraphQL API server at http://localhost:4000/graphql")