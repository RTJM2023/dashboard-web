import React from "react";
import { Bar } from "react-chartjs-2";
import NFormatterFun from "../numberFormaterFun";
let hbarPalette = window.palette;

/**
 * HorizontalBarChart component
 */

const options = {
  indexAxis: "y",
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

class HorizontalBarChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trigger: "",
    };
  }

  /**
   * Function to update the chart visualization
   */
  updateHbarVisuals = () => {
    this.setState({
      trigger: true,
    });
    this.props.pathName.history.push({
      pathName: "/dashboards",
      state: { trigger: this.state.trigger },
    });
    setTimeout(() => {
      this.props.pathName.history.push({
        pathName: "/dashboards",
        state: { trigger: this.state.trigger },
      });
    }, 500);
  };

  manupulateData(chartData) {
    var tempdata = {
      labels: [],
      datasets: [],
    };
    let colors = hbarPalette("cb-BasePalette2", chartData.length).map(function (
      hex
    ) {
      return "#" + hex;
    });
    chartData.forEach((d, i) => {
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

    if (data) {
      return (
        <Bar
          height={this.props.dimensions.height}
          className="cursorStyleOne"
          style={{ fill: "none" }}
          data={data}
          options={options}
        ></Bar>
      );
    }
    return <div>Loading...</div>;
  }
}

export default HorizontalBarChart;
