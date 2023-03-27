import React from "react";
import { Bar } from "react-chartjs-2";
import NFormatterFun from "../numberFormaterFun";
import { DashboardService } from "../../../services/dashboard.service";
import _ from "lodash";
let barPalette = window.palette;

/**
 * BarChart component
 */

const options = {
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

class BarChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trigger: "",
      chartsGData: {},
      isData: false,
    };
  }

  /**
   * Function to update the chart visualization
   */
  updateBarVisuals = (drillDownId) => {
    if (drillDownId !== "none" && drillDownId !== undefined) {
      DashboardService.getData(drillDownId).then(
        (response) => {
          this.setState(
            (prevState) => ({
              ...prevState,
              chartsGData: {
                ...prevState.chartsGData,
                [drillDownId]: response.responseData,
              },
            }),
            () =>
              this.setState({
                isData: true,
              })
          );
        },
        (error) => {}
      );
      localStorage.removeItem("label");
    } else {
      this.setState(
        {
          isData: false,
        },
        () => {
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
        }
      );
    }
  };

  manupulateData(chartData) {
    var barTempData = {
      labels: [],
      datasets: [],
    };
    let colors = barPalette("cb-BasePalette2", chartData.length).map(function (hex) {
      return "#" + hex;
    });
    chartData.forEach((d, i) => {
      let barTempObj = {
        label: "",
        borderColor: colors[i],
        backgroundColor: colors[i],
        fill: false,
      };
      let tempdataArr = [];
      let tempdatalabel = [],
        tempVal = "";
      barTempObj.label = d.headerName;
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
      barTempObj.data = tempdataArr;
      barTempData.labels = tempdatalabel;
      barTempData.datasets.push(barTempObj);
    });

    return barTempData;
  }

  contextMenu = (e) => {
    e.preventDefault();

    this.setState({
      isData: false,
    });
  };

  render() {
    let { chartData } = this.props;
    let { drillDownId } = this.props;
    let data;

    /*
     * Drilldown chart data
     */
    let drillDownData = _.chain(this.state.chartsGData)
      .get(drillDownId)
      .get("data")
      .value();

    /*
     * Condition to load drill down datasets
     * if user enabled the drill down feature
     */
    if (this.state.isData) {
      if (drillDownData !== undefined) {
        data = this.manupulateData(drillDownData);
      } else {
        data = this.manupulateData(chartData);
      }
    } else {
      data = this.manupulateData(chartData);
    }

    /*
     * Function to get the chart label title
     */
    // const getBarLabelFilter = elems => {
    //   if (localStorage.getItem("filterKey") && elems[0] !== undefined) {
    //     let selectedLabel = {
    //       labels: []
    //     };
    //     // console.log("Bar GetLabelFilter: "+elems[0]._view.label);
    //     selectedLabel.labels.push(elems[0]._view.label);
    //     localStorage.setItem("label", selectedLabel.labels);
    //     this.updateBarVisuals(drillDownId);
    //   } else {
    //     // console.log("Out!");
    //   }
    // };

    // const handleClick = (e) => {
    //   console.log("Click handler: "+e);
    // }

    if (data) {
      return (
        <div onContextMenu={this.contextMenu}>
          <Bar
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
          ></Bar>
        </div>
      );
    }
    return <div>Loading...</div>;
  }
}

export default BarChart;
