import React from "react";
import { PolarArea } from "react-chartjs-2";
// import NFormatterFun from "../numberFormaterFun";
import _ from "lodash";
let polarPalette = window.palette;

/**
 * Polar area component
 */

const polarOptions = {
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
  legend: {
    display: true,
    position: "bottom",
    labels: {
      boxWidth: 10
    }
  },
  plugins: {
    legend: {
      position: "bottom",
    },
  },
};

class PolarAreaChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }
  getData(chartData) {
    var polarTempData = {
      labels: [],
      datasets: []
    };
    var polarTempdataSet = {
      label: "",
      data: [],
      dataSymbol: []
    };

    _.map(chartData, function(k, v) {
      var plots = k["plots"];

      for (var i = 0; i < plots.length; i++) {
        polarTempData.labels.push(plots[i]["name"]);
        polarTempdataSet.data.push(plots[i]["value"]);
        polarTempdataSet.dataSymbol.push([plots[i]["symbol"], "Unit"]);
      }
    });

    polarTempdataSet.backgroundColor = polarPalette(
      "cb-BasePalette",
      polarTempdataSet.data.length
    ).map(function(hex) {
      return "#" + hex;
    });
    polarTempdataSet.borderColor = polarPalette(
      "cb-BasePalette",
      polarTempdataSet.data.length
    ).map(function(hex) {
      return "#" + hex;
    });
    polarTempData.datasets.push(polarTempdataSet);
    return polarTempData;
  }

  render() {
    let { chartData } = this.props;
    let _data = this.getData(chartData);

    if (_data) {
      return (
        <PolarArea
          height={this.props.dimensions.height}
          data={_data}
          options={polarOptions}
          plugins={[
            {
              beforeInit: (chart, options) => {
                chart.legend.afterFit = () => {
                  if (chart.legend.margins) {
                    // chart.height += 50;
                    chart.legend.options.labels.padding = 20;
                    // chart.legend.height += 20;
                  }
                };
              },
            },
          ]}
        />
      );
    }
    return <div>Loading...</div>;
  }
}

export default PolarAreaChart;
