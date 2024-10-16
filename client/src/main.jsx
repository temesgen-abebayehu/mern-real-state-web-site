import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { store } from './redux/store'
import { Provider } from 'react-redux'

import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
    ,
  </BrowserRouter>
);
