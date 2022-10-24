import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Import Apollo Server to connect to front end
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import Home from './pages/Home';
import Detail from './pages/Detail';
import NoMatch from './pages/NoMatch';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Nav from './components/Nav';
import { StoreProvider } from "./utils/GlobalState";
import OrderHistory from './pages/OrderHistory';

const httpLink = createHttpLink({
  uri: "/graphql",
  cache: new InMemoryCache(),
 //! graphql: true
});
console.log("httpLink: ", httpLink);

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  console.log("from App.JS token " + token);
  return {
    ...headers,
    authorization: token ? `Bearer ${token}` : "",
  };
});
console.log("authLink", authLink);

// create a new ApolloClient instance and pass in the link option to the constructor, which will be set to the authLink we just created
const client = new ApolloClient({
  //combine the authLink and httpLink objects so that every request retrieves the token and sets the request headers before making the request to the API
  link: authLink.concat(httpLink),
  // / set the cache to a new instance of InMemoryCache
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
        <StoreProvider>
          <Nav />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/orderHistory" element={<OrderHistory />} />
            <Route exact path="/products/:id" element={<Detail />} />
            <Route path="*" element={<NoMatch />} />
            </Routes>
          </StoreProvider>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
