//Line Chart
import React from "react";
import { Line } from "react-chartjs-2";
import NFormatterFun from "../numberFormaterFun";
let linePalette = window.palette;

/**
 * LineChart component
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
    y: {
      grid: {
        display: true,
      },
      ticks: {
        font: {
          family: "Lato-Regular",
          size: 12,
          lineHeight: 1.333,
        },
      },
    },
    x: {
      grid: {
        display: true,
      },
      ticks: {
        font: {
          family: "Lato-Regular",
          size: 12,
          lineHeight: 1.333,
        },
      },
    },
  },
  responsive: true,
  options: {
    responsive: true,
    maintainAspectRatio: true,
  },
  plugins: {
    legend: {
      position: "bottom",
      display: true,
      labels: {
        font: {
          family: "Lato-Regular",
          size: 14,
          lineHeight: 1.429,
        },
      },
    },
    datalabels: {
      anchor: "end",
      align: "end",
    },
  },
};

class LineChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trigger: "",
    };
  }

  // callforNewData(elems) {
  // 	console.log(elems[0]._datasetIndex + ', ' + elems[0]._index);
  // 	// this.setState({ data: null })
  //
  // }

  /**
   * Function to update the chart visualization
   */
  updateLineVisuals = () => {
    this.setState({
      trigger: true,
    });
    this.props.pathName.history.push({
      pathName: "/dashboards",
      state: { trigger: this.state.trigger },
    });
  };

  manupulateData(chartData) {
    // let temp, tempdata;
    // temp = this.props.chartData;
    var tempdata = {
      labels: [],
      datasets: [],
    };

    chartData.forEach((d, i) => {
      let colors = linePalette("cb-BasePalette2", chartData.length).map(
        function (hex) {
          return "#" + hex;
        }
      );
      let tempObj = {
        label: "",
        borderColor: colors[i],
        backgroundColor: colors[i],
        fill: false,
      };

      let tempdataArr = [];
      let tempdatalabel = [],
        tempVal = "";
      tempObj.label = d.headerName;
      d.plots.forEach((d1, i) => {
        tempVal = NFormatterFun(d1.value, d1.symbol, "Unit");
        tempVal =
          typeof tempVal == "string"
            ? parseFloat(tempVal.replace(/,/g, ""))
            : tempVal;
        tempdataArr.push(d1.value);
        if (d1.name.length > 20) {
          tempdatalabel.push(d1.name.match(/.{1,20}\S+\s*/g));
        } else {
          tempdatalabel.push(d1.name);
        }
      });
      tempObj.data = tempdataArr;
      tempdata.labels = tempdatalabel;
      tempdata.datasets.push(tempObj);
    });
    return tempdata;
  }

  render() {
    let { chartData } = this.props;
    let data = this.manupulateData(chartData);

    /*
     * Function to get the chart label title
     */
    const getLineLabelFilter = (elems) => {
      if (localStorage.getItem("filterKey") && elems[0] !== undefined) {
        let index = elems[0]._datasetIndex;
        let selectedLabel = elems[0]._xScale.chart.data.datasets[index].label;
        // console.log("LineChart GetLabelFilter: "+elems[0]._xScale.chart.data.datasets[index].label);
        localStorage.setItem("label", selectedLabel);
        this.updateLineVisuals();
      } else {
        // console.log("Out!");
      }
    };

    if (data) {
      return (
        <Line
          height={this.props.dimensions.height}
          style={{ fill: "none" }}
          data={data}
          options={options}
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
          getElementAtEvent={(elems) => getLineLabelFilter(elems)}
        ></Line>
      );
    }
    return <div>Loading...</div>;
  }
}

export default LineChart;
