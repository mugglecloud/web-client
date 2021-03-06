// import React from "react";
// import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";

import render from "@mugglecloud/web-runtime";
import config from "./config";

render(config);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
