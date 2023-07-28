import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import reducers from "./reducers";
import { ThemeProvider, createTheme } from "@mui/material/styles";
// import dotenv from "dotenv";

// Load environment variables from .env
// dotenv.config();

const theme = createTheme();

// Create the Redux store using configureStore
const store = configureStore({
  reducer: reducers,
  middleware: [thunk],
});

createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>
  // </React.StrictMode>
);
