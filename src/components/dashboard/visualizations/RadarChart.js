import React from "react";
import { Radar } from "react-chartjs-2";
// import NFormatterFun from "../numberFormaterFun";
import _ from "lodash";
let radarPalette = window.palette;

/**
 * Radar chart component
 */

const options = {
  responsive: true,
  options: {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  },
  plugins: {
    legend: {
      position: "bottom",
    },
  },
};

class RadarChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }
  getData(chartData) {
    var radarTempData = {
      labels: [],
      datasets: []
    };
    var radarTempDataSet = {
      label: "",
      data: []
    };

    _.map(chartData, function(k, v) {
      var plots = k["plots"];

      for (var i = 0; i < plots.length; i++) {
        radarTempData.labels.push(plots[i]["name"]);
        radarTempDataSet.data.push(plots[i]["value"]);
      }
    });

    radarTempDataSet.backgroundColor = radarPalette(
      "tol",
      radarTempDataSet.data.length
    ).map(function(hex) {
      return "#" + hex;
    });
    radarTempDataSet.borderColor = radarPalette(
      "tol",
      radarTempDataSet.data.length
    ).map(function(hex) {
      return "#" + hex;
    });

    radarTempDataSet.pointBackgroundColor = radarPalette(
      "tol",
      radarTempDataSet.data.length
    ).map(function(hex) {
      return "#" + hex;
    });
    radarTempDataSet.pointBorderColor = radarPalette(
      "tol",
      radarTempDataSet.data.length
    ).map(function(hex) {
      return "#" + hex;
    });
    radarTempDataSet.pointHoverBackgroundColor = radarPalette(
      "tol",
      radarTempDataSet.data.length
    ).map(function(hex) {
      return "#" + hex;
    });
    radarTempDataSet.pointHoverBorderColor = radarPalette(
      "tol",
      radarTempDataSet.data.length
    ).map(function(hex) {
      return "#" + hex;
    });
    radarTempData.datasets.push(radarTempDataSet);
    return radarTempData;
  }

  render() {
    let { chartData } = this.props;
    let _data = this.getData(chartData);

    if (_data) {
      return (
        <Radar
          height={this.props.dimensions.height}
          data={_data}
          options={options}
        />
      );
    }
    return <div>Loading...</div>;
  }
}

export default RadarChart;
