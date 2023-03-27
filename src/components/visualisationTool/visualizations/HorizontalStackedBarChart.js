import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import NFormatterFun from "./numberFormaterFun";
let stackedBarPalette = window.palette;

/**
 * HorizontalStackedBarChart component
 */

 const HorizontalStackedBarChart = ({ chartData, showLegend, showGrid }) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    let optionsData = {
      indexAxis: "y",
      scales: {
        x: {
          stacked: true,
          grid: {
            display: true,
          },
        },
        y: {
          stacked: true,
          grid: {
            display: true,
          },
        },
      },
      responsive: true,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              stacked: true,
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
      plugins: {
        legend: {
          position: "bottom",
          display: false,
        },
      },
    };

    setOptions(optionsData);
  }, []);

  useEffect(() => {
    let optionsData = {
      indexAxis: "y",
      scales: {
        x: {
          stacked: true,
          grid: {
            display: true,
          },
        },
        y: {
          stacked: true,
          grid: {
            display: true,
          },
        },
      },
      responsive: true,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              stacked: true,
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
      plugins: {
        legend: {
          position: "bottom",
          display: true,
        },
      },
    };

    if (showLegend) {
      optionsData.plugins.legend.display = true;
      setOptions(optionsData);
    } else {
      optionsData.plugins.legend.display = false;
      setOptions(optionsData);
    }

    if (showGrid) {
      optionsData.scales.x.grid.display = false;
      optionsData.scales.y.grid.display = false;
      setOptions(optionsData);
    } else {
      optionsData.scales.x.grid.display = true;
      optionsData.scales.y.grid.display = true;
      setOptions(optionsData);
    }
  }, [showLegend, showGrid]);

  const manuplateData = (chartData) => {
    if (chartData) {
      var stackedBarTempData = {
        labels: [],
        datasets: [],
      };
      let colors = stackedBarPalette("cb-Custom1", chartData.length).map(
        function (hex) {
          return "#" + hex;
        }
      );
      chartData.forEach((d, i) => {
        let stackedBarTempObj = {
          label: "",
          borderColor: d.colorPaletteCode ? d.colorPaletteCode : colors[i],
          backgroundColor: d.colorPaletteCode ? d.colorPaletteCode : colors[i],
          fill: false,
        };
        let stackedbarTempdataArr = [];
        let stackedbartempdatalabel = [],
          tempVal = "";
        stackedBarTempObj.label = d.headerName;
        d.plots.forEach((d1, i) => {
          tempVal = NFormatterFun(d1.value, d1.symbol, "Unit");
          tempVal =
            typeof tempVal == "string"
              ? parseFloat(tempVal.replace(/,/g, ""))
              : tempVal;
          stackedbarTempdataArr.push(tempVal);
          stackedbartempdatalabel.push(d1.name);
        });
        stackedBarTempObj.data = stackedbarTempdataArr;
        stackedBarTempData.labels = stackedbartempdatalabel;
        stackedBarTempData.datasets.push(stackedBarTempObj);
      });
      return stackedBarTempData;
    }
  };

  let data = manuplateData(chartData);

  if (data) {
    return (
      <Bar
        className="cursorStyleOne"
        style={{ fill: "none" }}
        data={data}
        options={options}
        width="400"
        height="275"
      />
    );
  }
  return (
    <center>
      <div className="">
        <img
          className="empty-state-3"
          src="/icons/Empty_icon.svg"
          alt="empty visual"
        />
      </div>
      <div className="">
        <label className="label-style-4 mt-3">No data found</label>
      </div>
      <div className="w-50">
        <label className="label-style-5 mt-3">
          Please add data on the left side to view the corresponding
          visualisation here
        </label>
      </div>
    </center>
  );
};

export default HorizontalStackedBarChart;
