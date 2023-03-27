import React from "react";
import { Bar } from "react-chartjs-2";
// import NFormatterFun from "../numberFormaterFun";
// import _ from "lodash";

/**
 * MixedData component
 */

const options = {
  elements: {
    point: {
      radius: 0,
    },
    line: {
      tension: 0,
    },
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          color: "rgba(0, 0, 0, 0)",
          display: false,
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: true,
          drawBorder: false,
        },
      },
      {
        id: "left-y-axis",
        display: true,
        type: "linear",
        position: "left",
      },
      {
        id: "right-y-axis",
        display: true,
        type: "linear",
        position: "right",
      },
    ],
    // yAxes: [
    //   {
    //     id: "left-y-axis",
    //     display: true,
    //     type: "linear",
    //     position: "left",
    //   },
    //   {
    //     id: "right-y-axis",
    //     display: true,
    //     type: "linear",
    //     position: "right",
    //   },
    // ],
  },
  responsive: true,
  options: {
    responsive: true,
    maintainAspectRatio: true,
  },
  plugins: {
    legend: {
      position: "bottom",
    },
  },
};

class MixedData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
  }
  getData(chartData) {
    var tempData = {
      labels: [],
      datasets: [],
    };
    var tempdataSet = {
      label: "",
      type: "line",
      borderColor: "#F3457E",
      backgroundColor: "transparent",
      yAxisID: "right-y-axis",
      data: [],
      dataSymbol: [],
      order: 1,
    };
    var tempdataSetTwo = {
      label: "",
      type: "bar",
      backgroundColor: "#7B47A4",
      yAxisID: "left-y-axis",
      data: [],
      dataSymbol: [],
      order: 2,
    };

    for (var i = 0; i < chartData.length; i++) {
      // Bar Data
      if (i === 0) {
        tempdataSetTwo.label = chartData[i].headerName;
        for (var l = 0; l < chartData[i].plots.length; l++) {
          tempData.labels.push(chartData[i].plots[l]["name"]);
          tempdataSetTwo.data.push(chartData[i].plots[l]["value"]);
          tempdataSetTwo.dataSymbol.push([
            chartData[i].plots[l]["symbol"],
            "Unit",
          ]);
        }
      }
      // Line Data
      if (i === 1) {
        tempdataSet.label = chartData[i].headerName;
        for (var j = 0; j < chartData[i].plots.length; j++) {
          tempdataSet.data.push(chartData[i].plots[j]["value"]);
          tempdataSet.dataSymbol.push([
            chartData[i].plots[j]["symbol"],
            "Unit",
          ]);
        }
      }
    }

    tempData.datasets.push(tempdataSetTwo);
    tempData.datasets.push(tempdataSet);
    return tempData;
  }

  render() {
    let { chartData } = this.props;
    let _data = this.getData(chartData);
    if (_data) {
      return (
        <Bar
          data={_data}
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
          options={options}
        />
      );
    }
    return <div>Loading...</div>;
  }
}

export default MixedData;
