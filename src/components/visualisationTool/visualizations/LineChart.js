import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import NFormatterFun from "./numberFormaterFun";
let linePalette = window.palette;

/**
 * LineChart component
 */

 const LineChart = ({ chartData, showLegend, showGrid }) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    let optionsData = {
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
        },
        x: {
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
        },
        x: {
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
      var tempdata = {
        labels: [],
        datasets: [],
      };

      chartData.forEach((d, i) => {
        let colors = linePalette("cb-Custom1", chartData.length).map(function (
          hex
        ) {
          return "#" + hex;
        });
        let tempObj = {
          label: "",
          borderColor: d.colorPaletteCode ? d.colorPaletteCode : colors[i],
          backgroundColor: d.colorPaletteCode ? d.colorPaletteCode : colors[i],
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
          tempdataArr.push(d1.value && d1.value.toFixed(2));
          tempdatalabel.push(d1.name);
        });
        tempObj.data = tempdataArr;
        tempdata.labels = tempdatalabel;
        tempdata.datasets.push(tempObj);
      });
      return tempdata;
    }
  };
  let data = manuplateData(chartData);

  if (data) {
    return (
      <Line
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

export default LineChart;