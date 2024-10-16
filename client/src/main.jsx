import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { persister, store } from './redux/store'
import { Provider } from 'react-redux'

import App from "./App.jsx";
import "./index.css";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persister}>
        <App />
      </PersistGate>
    </Provider>
    ,
  </BrowserRouter>
);
