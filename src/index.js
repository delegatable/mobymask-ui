import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom/client";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { StyledEngineProvider } from "@mui/material/styles";
import App from "./App";
import "./index.css";

// const watcherUri = "https://mobymask.vdb.to/graphql";
const watcherUri = "http://localhost:3001/graphql";

const client = new ApolloClient({
  uri: watcherUri,
  cache: new InMemoryCache(),
});
const theme = createTheme({
  typography: {
    fontFamily: "Inter",
    fontStyle: "normal",
  },
});

const container = document.querySelector("#root");
const root = ReactDOM.createRoot(container);
root.render(
  <ApolloProvider client={client}>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </StyledEngineProvider>
  </ApolloProvider>,
);
