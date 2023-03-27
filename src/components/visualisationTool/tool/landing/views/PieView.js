import React, { useEffect, useState } from "react";
import Notify from "../../../../../helpers/notify";
let piePalette = window.palette;

const PieView = ({ passChartData, passHeaderData, showLegend }) => {
  const [data, setData] = useState([]);
  const [manuplatedData, setManuplatedData] = useState([]);
  const [chartHeaders, setChartHeaders] = useState();
  const colors = [
    { row: 1, colors: ["#024BA3", "#0068BE", "#0082CB", "#019AC9", "#02B1BC"] },
    { row: 2, colors: ["#00C6A4", "#00D88B", "#8AE770", "#024BA3", "#7B47A4"] },
    {
      row: 3,
      colors: ["#B93F94", "#E24577", "#E24577", "#F58834", "#F56155"],
    },
  ];

  useEffect(() => {
    let data = [
      {
        id: 0,
        vizType: "pie",
        headerName: "Show Legend",
        color: "",
        plots: [
          {
            id: 0,
            value: "Jan",
            color: "#00C6A4",
          },
          {
            id: 1,
            value: "Feb",
            color: "#E24577",
          },
          {
            id: 2,
            value: "Mar",
            color: "#024BA3",
          },
        ],
      },
      {
        id: 1,
        vizType: "pie",
        headerName: "",
        color: "",
        plots: [
          {
            id: 0,
            value: 20,
            color: "#00C6A4",
          },
          {
            id: 1,
            value: 60,
            color: "#E24577",
          },
          {
            id: 2,
            value: 20,
            color: "#024BA3",
          },
        ],
      },
    ];

    let chartHeaders = {
      vizType: "pie",
      chartTitle: "",
      subTitle: "",
      data: [],
    };

    setData(data);
    setChartHeaders(chartHeaders);
    showLegend(true);

    setTimeout(() => {
      if (document.getElementById("legends-3")) {
        document.getElementById("legends-3").checked = true;
      }
    }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addRow = (e) => {
    e.preventDefault();

    let tempArr = [...data];

    let colors = piePalette("cb-Custom1", data.length).map(function (hex) {
      return "#" + hex;
    });

    tempArr.map((i, j) => {
      return i.plots.push({
        id: i.plots[i.plots.length - 1].id + 1,
        value: "",
        color: colors[colors.length - 1],
      });
    });

    setData(tempArr);
  };

  const deleteRow = (e, id) => {
    e.preventDefault();

    let tempArr = [...data];

    if (tempArr[0].plots.length > 2) {
      tempArr.forEach(
        (i, j) => (i.plots = i.plots.filter((item) => item.id !== id))
      );
    } else {
      console.log("Can't delete!");
    }

    setData(tempArr);
  };

  const clearRow = (e, id) => {
    e.preventDefault();

    let tempArr = [...data];

    tempArr.forEach((i, j) => {
      i.plots.map((m, n) => {
        if (m.id === id) {
          m.value = "";
          m.color = "";
        }
        return null;
      });
    });

    setData(tempArr);
  };

  const updatePlotsData = (e, parent, child) => {
    e.preventDefault();

    let updateArr = [...data];

    updateArr[parent].plots[child].value = e.target.value;

    setData(updateArr);
  };

  useEffect(() => {
    setTimeout(() => processData(data), 850);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const processData = (data) => {
    let tempArr = [];

    data.map((i, j) => {
      if (j > 0) {
        let tempPlots = [];
        i.plots.map((m, n) => {
          let plotsData = {
            label: "Header",
            name: data[0].plots[n].value,
            value: parseInt(m.value),
            valueLabel: "Value",
            symbol: "number",
            parentName: null,
            parentLabel: null,
            isPercentage: false,
            colorCode: "one",
            color: m.color,
          };

          return tempPlots.push(plotsData);
        });

        let dataPlot = {
          id: i.id,
          vizType: "pie",
          headerName: i.headerName,
          headerValue: "",
          headerSymbol: "",
          colorPaletteCode: "",
          colorPaletteId: null,
          plots: tempPlots,
        };

        tempArr.push(dataPlot);
      }
      return null;
    });

    setManuplatedData(tempArr);
  };

  const updateChartHeaders = (e) => {
    e.preventDefault();

    if (e.target.name === "chartTitle") {
      setChartHeaders({ ...chartHeaders, chartTitle: e.target.value });
    }

    if (e.target.name === "chartSubTitle") {
      setChartHeaders({ ...chartHeaders, subTitle: e.target.value });
    }
  };

  const addInsights = (e) => {
    e.preventDefault();

    let data = {
      label: "",
      metric: "",
      change: "",
    };

    let tempData = chartHeaders;

    tempData.data.push(data);

    setChartHeaders({ ...chartHeaders, data: tempData.data });
  };

  const removeInsights = (e, index) => {
    e.preventDefault();

    let tempData = chartHeaders;

    tempData.data.splice(index, 1);

    setChartHeaders({ ...chartHeaders, data: tempData.data });
  };

  const updateInsightsData = (e, index) => {
    e.preventDefault();

    let tempData = chartHeaders;

    if (tempData && e.target.name === "label") {
      tempData.data[index].label = e.target.value;
    }

    if (tempData && e.target.name === "metric") {
      tempData.data[index].metric = e.target.value;
    }

    if (tempData && e.target.name === "change") {
      tempData.data[index].change = e.target.value;
    }

    setChartHeaders({ ...chartHeaders, data: tempData.data });
  };

  const getColor = (e, color, id) => {
    e.preventDefault();

    let tempArr = [...data];

    tempArr.map((i, j) => {
      i.plots.map((k, l) => {
        if (k.id === id) {
          k.color = color;
        }
        return null;
      });
      return null;
    });

    setData(tempArr);
  };

  const updateLegends = (e) => {
    let value = document.getElementById("legends-3");

    showLegend(value.checked);
  };

  const reset = (e) => {
    e.preventDefault();

    let emptyArr = [
      {
        id: 0,
        vizType: "pie",
        headerName: "Show Legend",
        color: "",
        plots: [
          {
            id: 0,
            value: "",
            color: "#00C6A4",
          },
          {
            id: 1,
            value: "",
            color: "#E24577",
          },
          {
            id: 2,
            value: "",
            color: "#024BA3",
          },
        ],
      },
      {
        id: 1,
        vizType: "pie",
        headerName: "",
        color: "",
        plots: [
          {
            id: 0,
            value: "",
            color: "#00C6A4",
          },
          {
            id: 1,
            value: "",
            color: "#E24577",
          },
          {
            id: 2,
            value: "",
            color: "#024BA3",
          },
        ],
      },
    ];

    setData(emptyArr);

    let emptyObj = {
      vizType: "pie",
      chartTitle: "",
      subTitle: "",
      data: [],
    };

    setChartHeaders(emptyObj);

    Notify.info(".Chart data has been resetted. New chart fields added");
  };

  useEffect(() => {
    passHeaderData(chartHeaders);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartHeaders]);

  useEffect(() => {
    passChartData(manuplatedData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [manuplatedData]);

  return (
    <div className="col-12">
      <label
        className="label-style-3 float-end pt-4 me-3 position-btn-1 cursor-style-1"
        onClick={reset}
      >
        <span className="material-icons reset-icon-1 me-1">restart_alt</span>
        Reset
      </label>
      <ul
        className="nav nav-tabs custom-nav-tabs-1 pt-4"
        role="tablist"
        id="pieTab"
      >
        <li className="nav-item me-2" role="presentation">
          <button
            className="nav-link active custom-tab-1"
            id="pie-tab"
            data-bs-toggle="tab"
            data-bs-target="#dataPie"
            type="button"
            role="tab"
            aria-controls="dataPie"
            aria-selected="true"
          >
            Data
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link custom-tab-1 "
            id="optionalPie-tab"
            data-bs-toggle="tab"
            data-bs-target="#optionalPie"
            type="button"
            role="tab"
            aria-controls="optionalPie"
            aria-selected="false"
          >
            Configuration
          </button>
        </li>
      </ul>

      <div className="tab-content" id="pieTabContent">
        <div
          className="tab-pane fade show active"
          id="dataPie"
          role="tabpanel"
          aria-labelledby="pie-tab"
        >
          <div className="p-0 m-0 mt-4 pt-2 hori-scroll-1 ps-4">
            {data &&
              data.map((i, j) => {
                return (
                  <React.Fragment>
                    <div className="col-3 me-3" key={j}>
                      {j === 0 && (
                        <div className="">
                          <hr className="custom-hr-1" />
                        </div>
                      )}
                      {j > 0 && (
                        <div className="">
                          <hr className="custom-hr-1" />
                        </div>
                      )}
                      <div className="">
                        {i.plots &&
                          i.plots.map((m, n) => {
                            return (
                              <React.Fragment>
                                <div className="d-flex flex-row mt-3">
                                  <div
                                    className=""
                                    style={{
                                      width: `${j === 0 ? "80%" : "100%"}`,
                                    }}
                                  >
                                    {j === 0 && (
                                      <React.Fragment>
                                        <span className="dropdown">
                                          <span
                                            className="material-icons three-dots-icon-1 "
                                            id="rowDropdownMenu1"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                          >
                                            more_vert
                                          </span>

                                          <ul
                                            className="dropdown-menu row-dropdown-1"
                                            aria-labelledby="rowDropdownMenu1"
                                          >
                                            <li>
                                              <button
                                                className="dropdown-item pt-2 pb-2"
                                                type="button"
                                                onClick={(e) => {
                                                  deleteRow(e, m.id);
                                                }}
                                              >
                                                <span className="material-icons row-mat-icon-1">
                                                  delete
                                                </span>
                                                Delete row
                                              </button>
                                            </li>
                                            <li>
                                              <button
                                                className="dropdown-item"
                                                type="button"
                                                onClick={(e) => {
                                                  clearRow(e, m.id);
                                                }}
                                              >
                                                <span className="material-icons row-mat-icon-1">
                                                  clear_all
                                                </span>
                                                Clear row
                                              </button>
                                            </li>
                                          </ul>
                                        </span>
                                        <span
                                          className="custom-color-pad-1 me-2"
                                          id="colorPickerDropdownPie"
                                          data-bs-toggle="dropdown"
                                          aria-expanded="false"
                                          style={{
                                            backgroundColor: `${
                                              m.color ? m.color : "#bbb"
                                            }`,
                                          }}
                                        ></span>
                                      </React.Fragment>
                                    )}
                                    <div
                                      className="dropdown-menu color-picker-dd-1"
                                      aria-labelledby="colorPickerDropdownB"
                                    >
                                      <div className="">
                                        {colors.map((k, l) => {
                                          return (
                                            <div className="ms-3" key={l}>
                                              {k.colors.map((q, w) => {
                                                return (
                                                  <span
                                                    className="color-picker-shape-1 me-2"
                                                    key={w}
                                                    onClick={(e) =>
                                                      getColor(e, q, m.id)
                                                    }
                                                    style={{
                                                      backgroundColor: `${q}`,
                                                    }}
                                                  ></span>
                                                );
                                              })}
                                            </div>
                                          );
                                        })}
                                      </div>
                                    </div>

                                    <input
                                      type="text"
                                      placeholder={`${
                                        j === 0 ? "Label" : "Value"
                                      }`}
                                      value={m.value}
                                      onChange={(e) => updatePlotsData(e, j, n)}
                                      className="custom-input-type-1 w-100"
                                      autoComplete="off"
                                    />
                                  </div>
                                </div>
                              </React.Fragment>
                            );
                          })}
                      </div>
                    </div>
                  </React.Fragment>
                );
              })}
          </div>
          <button
            type="button"
            className="btn custom-btn-3 col-6 ms-2 mt-3"
            onClick={addRow}
          >
            <span className="material-icons me-2">add</span>
            Add new row
          </button>
        </div>
        <div
          className="tab-pane fade show"
          id="optionalPie"
          role="tabpanel"
          aria-labelledby="optionalPie-tab"
        >
          <div className="p-0 m-0 mt-4 pt-2">
            <div className="row">
              <div className="col-6">
                <label className="label-style-2 pb-2">Chart title</label>
                <input
                  type="text"
                  className="custom-input-type-1"
                  onChange={updateChartHeaders}
                  name="chartTitle"
                  value={chartHeaders && chartHeaders.chartTitle}
                  placeholder="Untitled"
                  autoComplete="off"
                />
              </div>
              <div className="col-6">
                <label className="label-style-2 pb-2">Subtitle</label>
                <input
                  type="text"
                  className="custom-input-type-1"
                  onChange={updateChartHeaders}
                  name="chartSubTitle"
                  value={chartHeaders && chartHeaders.subTitle}
                  placeholder="Short description"
                  autoComplete="off"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="label-style-2 pb-2">Numbers</label>
              <div className="mt-3 ms-1">
                <label className="input-header-1">
                  <span className="me-2">
                    <input
                      type="checkbox"
                      onClick={updateLegends}
                      id="legends-3"
                    />
                  </span>
                  Show Legends
                </label>
              </div>
            </div>

            <div className="mt-3 ms-1">
              <div className="row">
                {chartHeaders &&
                  chartHeaders.data &&
                  chartHeaders.data.map((i, j) => {
                    return (
                      <React.Fragment>
                        <div
                          className="insights-box-1 ms-2"
                          id="insightsDropdown"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <span
                            id="insightsHover"
                            className="material-icons delete-icon-1 pt-1 float-end hover-btn-1"
                            style={{ marginRight: "-0.5rem" }}
                            onClick={(e) => removeInsights(e, j)}
                          >
                            delete
                          </span>
                          <label className="ms-1 pt-3">{i.label}</label>
                          <div className="d-flex flex-row pt-2 ms-1 pb-1">
                            <h3>{i.metric}</h3>
                            {/* {i.change !== "" && <p className="ms-2">4</p>} */}
                          </div>
                        </div>
                        <div
                          className="dropdown-menu row-dropdown-2"
                          aria-labelledby="insightsDropdown"
                        >
                          <div className="p-3">
                            <input
                              type="text"
                              className="custom-input-type-1 mb-2"
                              name="label"
                              onChange={(e) => updateInsightsData(e, j)}
                              value={i.label && i.label}
                              placeholder="Label"
                              autoComplete="off"
                            />
                            <input
                              type="text"
                              name="metric"
                              onChange={(e) => updateInsightsData(e, j)}
                              value={i.metric && i.metric}
                              className="custom-input-type-1 mb-2"
                              placeholder="Metric"
                              autoComplete="off"
                            />
                            <input
                              type="text"
                              name="change"
                              onChange={(e) => updateInsightsData(e, j)}
                              value={i.change && i.change}
                              className="custom-input-type-1 mb-2"
                              placeholder="Change%"
                              autoComplete="off"
                            />
                          </div>
                        </div>
                      </React.Fragment>
                    );
                  })}

                <div className="insights-box-2 ms-2" onClick={addInsights}>
                  <center className="pt-30">
                    <span className="material-icons">add</span>
                  </center>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PieView;
