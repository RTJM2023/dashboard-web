import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Chart } from "chart.js";
// import ChartDataLabels from "chartjs-plugin-datalabels";

// Chart.helpers.merge(Chart.defaults.global.plugins.datalabels, {
//   color: "#00000",
//   anchor: "end",
//   align: "end",
//   formatter: Math.round,
//   font: {
//     weight: "bold",
//     family: "Montserrat-Medium"
//   }
// });

Chart.defaults.font.family = "Montserrat-Medium";
Chart.defaults.font.size = 12.25;
Chart.defaults.animation.duration = 0;
// Chart.defaults.plugins.unregister(ChartDataLabels);

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
