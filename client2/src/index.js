/* eslint-disable no-undef */

import React from "react";
import { createRoot } from "react-dom/client";
import Main from "./EntryFile/Main";
import { Provider } from "react-redux";
import { store } from "./app/store";

createRoot(document.getElementById("app")).render(
  <Provider store={store}>
    <Main />
  </Provider>
);

if (module.hot) {
  module.hot.accept();
}
