const timeElapsed = Date.now();
const today = new Date(timeElapsed);

const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');

const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serve up static assets
app.use('/images', express.static(path.join(__dirname, '../client/images')));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`
    Connection 🟢
    ${today.toUTCString()}
    Budget-Tracker App ⚡On 127.0.0.1:${PORT}!✅
    Performance:${performance.now()}
    `);
      console.log(`
    Connection 🟢
    ⚡Running GraphQL at http://127.0.0.1:${PORT}${server.graphqlPath}
    ${today.toUTCString()}
    Performance:${performance.now()}
    `);
    })
  })
  };

  // Call the async function to start the server
  startApolloServer(typeDefs, resolvers);
