import express from 'express'
import dotenv from 'dotenv'
import { createHandler } from 'graphql-http/lib/use/express'
import schema from './schema/schema.js'
import connectDB from './config/db.js'
import { ruruHTML } from 'ruru/server'
import morgan from 'morgan'
import cors from 'cors'

const port = process.env.PORT || 5000

dotenv.config()


connectDB();


const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(cors())



// Create and use the GraphQL handler.
app.all("/graphql", (req, res) =>
  createHandler({
    schema,
    context: { req, res },
    graphiql: process.env.NODE_ENV === "development",
    rootValue: { },
  })(req, res)
)



// Serve the GraphiQL IDE.
app.get("/", (_req, res) => {
  res.type("html")
  res.end(ruruHTML({ endpoint: "/graphql" }))
})

// Start the server at port
app.listen(port)
console.log("Running a GraphQL API server at http://localhost:4000/graphql")