import React from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { PeerProvider } from "@cerc-io/react-peer";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";

const watcherUri = "https://mobymask.vdb.to/graphql"
const signalServerURL = "/ip4/127.0.0.1/tcp/13579/ws/p2p-webrtc-star/"
const relayNodeURL = "/ip4/127.0.0.1/tcp/13579/wss/p2p-webrtc-star/p2p/12D3KooWL6co42CAbwyDhRSKa1F49CNZQtG9VLbgiy5CJBDKjsvX"

const client = new ApolloClient({
  uri: watcherUri,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <PeerProvider signalServer={signalServerURL} relayNode={relayNodeURL}>
      <App />
    </PeerProvider>
  </ApolloProvider>,
  document.getElementById("root"),
);
