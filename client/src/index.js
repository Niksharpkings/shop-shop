import React from 'react';
// import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createRoot } from "react-dom/client";
//import "bootstrap/dist/css/bootstrap.min.css";
// ✅ correct ID passed
const rootElement = document.getElementById("root")
const root = createRoot(rootElement)

serviceWorker.register();
root.render(<App />);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

