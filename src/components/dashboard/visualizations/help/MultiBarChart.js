import React from "react";
import { Bar } from "react-chartjs-2";
import NFormatterFun from "../numberFormaterFun";
let multiBarHelpPalette = window.palette;

/**
 * MultiBarChart component
 */

const options = {
  scales: {
    xAxes: [
      {
        gridLines: {
          color: "rgba(0, 0, 0, 0)"
        }
      }
    ]
  },
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
  }
};

class MultiBarChartHelp extends React.Component {
  manupulateSampleData(chartData) {
    var multiBarSampleData = {
      labels: [],
      datasets: []
    };
    let colors = multiBarHelpPalette("cb-Custom1", chartData.length).map(
      function(hex) {
        return "#" + hex;
      }
    );
    chartData.forEach((d, i) => {
      let multiBarSampleObj = {
        label: "",
        borderColor: colors[i],
        backgroundColor: colors[i],
        fill: false
      };
      let tempdataArr = [];
      let tempdatalabel = [],
        tempVal = "";
      multiBarSampleObj.label = d.headerName;
      d.plots.forEach((d1, i) => {
        tempVal = NFormatterFun(d1.value, d1.symbol, "Unit");
        tempVal =
          typeof tempVal == "string"
            ? parseFloat(tempVal.replace(/,/g, ""))
            : tempVal;
        tempdataArr.push(tempVal);
        tempdatalabel.push(d1.name);
      });
      multiBarSampleObj.data = tempdataArr;
      multiBarSampleData.labels = tempdatalabel;
      multiBarSampleData.datasets.push(multiBarSampleObj);
    });
    return multiBarSampleData;
  }

  render() {
    let { chartData } = this.props;
    let data = this.manupulateSampleData(chartData);

    /*
     * Function to get the chart label title
     */
    const getMultiBarLabelFilter = elems => {
      if (elems[0] !== undefined) {
        console.log("Bar GetLabelFilter: " + elems[0]._view.label);
      } else {
        console.log("Out!");
      }
    };

    if (data) {
      return (
        <Bar
          height={this.props.dimensions.height}
          style={{ fill: "none" }}
          data={data}
          options={options}
          onElementsClick={elems => getMultiBarLabelFilter(elems)}
        ></Bar>
      );
    }
    return <div>Loading...</div>;
  }
}

export default MultiBarChart;
