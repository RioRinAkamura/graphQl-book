const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require("cors");

dotenv.config()


// Load schema & resolvers
const typeDefs = require('./schema/schema')
const resolvers = require('./resolver/resolver')

// DB method
const mongoDataMethods = require('./data/db')

const connectMongoDb = async () => {
    try {
        await mongoose.connect((process.env.MONGODB_URL),
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            },
            () => {
                console.log("Connected to MongoDB");
            })
    } catch (error) {
        console.log(error)
    }
}

async function startApolloServer(typeDefs, resolvers) {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: () => ({ mongoDataMethods })
    })
    const app = express();
    connectMongoDb();
    app.use(cors());
    await server.start();

    server.applyMiddleware({ app })
    app.listen({ port: 4000 }, () => {
        console.log(`Server is running at http://localhost:4000${server.graphqlPath}`)
    })
}

startApolloServer(typeDefs, resolvers)
