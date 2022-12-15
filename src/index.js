import { ApolloClient, ApolloLink, ApolloProvider, HttpLink, InMemoryCache } from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";

const subgraphUri = "http://localhost:8000/subgraphs/name/scaffold-eth/your-contract";
const watcherUri = "https://mobymask.vdb.to/graphql"

const subgraphEndpoint = new HttpLink({
  uri: subgraphUri,
});
const watcherEndpoint = new HttpLink({
  uri: watcherUri,
});

const client = new ApolloClient({
  link: ApolloLink.split(
    operation => operation.getContext().clientName === "watcher",
    watcherEndpoint,
    subgraphEndpoint,
  ),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App subgraphUri={subgraphUri} />
  </ApolloProvider>,
  document.getElementById("root"),
);
