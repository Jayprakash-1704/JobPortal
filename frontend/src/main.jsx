


import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { Toaster } from "./components/ui/sonner.jsx";
import { Provider } from 'react-redux'
// import {store} from './redux/store.js'
import { PersistGate } from "redux-persist/integration/react";
import {store,persistor} from "./redux/store.js"


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor} >
        <App />
        </PersistGate>
      </Provider>
      <Toaster duration={2000} richColors position="bottom-right" />
    </BrowserRouter>
  </React.StrictMode>
);
