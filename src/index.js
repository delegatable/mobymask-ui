import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom/client";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { responsiveFontSizes } from "@mui/material";

import { StyledEngineProvider } from "@mui/material/styles";
import App from "./App";
import "./index.css";

const hostname = window.location.hostname;

const watcherUri = ["localhost", "127.0.0.1"].includes(hostname)
  ? "http://localhost:3001/graphql"
  : "https://mobymask.vdb.to/graphql";

const client = new ApolloClient({
  uri: watcherUri,
  cache: new InMemoryCache(),
});
const theme = responsiveFontSizes(
  createTheme({
    typography: {
      fontFamily: "Inter",
      fontStyle: "normal",
      h1: {
        fontSize: "62px",
        lineHeight: 1.02,
        fontWeight: 600,
      },
    },
  }),
);
console.log("theme", theme);

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
