import * as ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "@patternfly/react-core/dist/styles/base.css";
import "./css/fonts.css";

import App from "./App";
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
