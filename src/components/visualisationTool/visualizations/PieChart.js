import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import _ from "lodash";
// let piePalette = window.palette;

/**
 * PieChart component
 */

 const PieChart = ({ chartData, showLegend }) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    let optionsData = {
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
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
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
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
  }, [showLegend]);

  const manuplateData = (chartData) => {
    if (chartData) {
      var pieChartTempData = {
        labels: [],
        datasets: [],
      };
      var pieChartTempDataSet = {
        label: "",
        data: [],
        dataSymbol: [],
        backgroundColor: [],
        borderColor: [],
      };

      _.map(chartData, function (k, v) {
        var plots = k["plots"];
        for (var i = 0; i < plots.length; i++) {
          pieChartTempData.labels.push(plots[i]["name"]);
          pieChartTempDataSet.data.push(plots[i]["value"]);
          pieChartTempDataSet.dataSymbol.push([plots[i]["symbol"], "Unit"]);
          pieChartTempDataSet.backgroundColor.push(plots[i]["color"]);
          pieChartTempDataSet.borderColor.push(plots[i]["color"]);
        }
      });

      pieChartTempData.datasets.push(pieChartTempDataSet);

      return pieChartTempData;
    }
  };

  let data = manuplateData(chartData);

  if (data) {
    return <Pie data={data} options={options} width="400" height="275" />;
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

export default PieChart;
