import React, { useEffect, useState } from "react";
import Notify from "../../../../../helpers/notify";
let linePalette = window.palette;

const LineView = ({ passChartData, passHeaderData, showLegend, showGrid }) => {
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
        vizType: "line",
        headerName: "Show Legend",
        color: "",
        plots: [
          {
            id: 0,
            value: "Jan",
          },
          {
            id: 1,
            value: "Feb",
          },
          {
            id: 2,
            value: "Mar",
          },
        ],
      },
      {
        id: 1,
        vizType: "line",
        headerName: "Region 1",
        color: "#00C6A4",
        plots: [
          {
            id: 0,
            value: 75,
          },
          {
            id: 1,
            value: 65,
          },
          {
            id: 2,
            value: 55,
          },
        ],
      },
      {
        id: 2,
        vizType: "line",
        headerName: "Region 2",
        color: "#0068BE",
        plots: [
          {
            id: 0,
            value: 35,
          },
          {
            id: 1,
            value: 55,
          },
          {
            id: 2,
            value: 45,
          },
        ],
      },
    ];

    let chartHeaders = {
      vizType: "line",
      chartTitle: "",
      subTitle: "",
      data: [],
    };

    setData(data);
    setChartHeaders(chartHeaders);
    showLegend(true);

    setTimeout(() => {
      if (document.getElementById("legends-4")) {
        document.getElementById("legends-4").checked = true;
      }
    }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addRow = (e) => {
    e.preventDefault();

    let tempArr = [...data];

    tempArr.map((i, j) => {
      return i.plots.push({
        id: i.plots[i.plots.length - 1].id + 1,
        value: "",
      });
    });

    setData(tempArr);
  };

  const addColumn = (e) => {
    e.preventDefault();

    let tempPlot = [];

    for (let i = 0; i < data[0].plots.length; i++) {
      tempPlot.push({ id: i, value: "" });
    }

    let colors = linePalette("cb-Custom1", data.length).map(function (hex) {
      return "#" + hex;
    });

    let newData = {
      id: data[data.length - 1].id + 1,
      headerName: "",
      color: colors[colors.length - 1],
      plots: tempPlot,
    };

    let tempArr = [...data];

    tempArr.push(newData);

    setData(tempArr);
  };

  const deleteColumn = (e, id) => {
    e.preventDefault();

    let tempArr = [...data];

    let updatedArr = [];

    tempArr.map((i, j) => {
      if (j !== id) {
        updatedArr.push(i);
      }
      return null;
    });

    setData(updatedArr);
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

  const updateHeaderData = (e, parent) => {
    e.preventDefault();

    let updateArr = [...data];

    updateArr[parent].headerName = e.target.value;

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
          };

          return tempPlots.push(plotsData);
        });

        let dataPlot = {
          id: i.id,
          vizType: "line",
          headerName: i.headerName,
          headerValue: "",
          headerSymbol: "",
          colorPaletteCode: i.color ? i.color : "",
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
      if (i.id === id) {
        i.color = color;
      }
      return null;
    });

    setData(tempArr);
  };

  const updateLegends = (e) => {
    let value = document.getElementById("legends-4");

    showLegend(value.checked);
  };

  const updateGrids = (e) => {
    let value = document.getElementById("grid-4");

    showGrid(value.checked);
  };

  const reset = (e) => {
    e.preventDefault();

    let emptyArr = [
      {
        id: 0,
        vizType: "line",
        headerName: "Show Legend",
        color: "",
        plots: [
          {
            id: 0,
            value: "",
          },
          {
            id: 1,
            value: "",
          },
          {
            id: 2,
            value: "",
          },
        ],
      },
      {
        id: 1,
        vizType: "line",
        headerName: "",
        color: "#00C6A4",
        plots: [
          {
            id: 0,
            value: "",
          },
          {
            id: 1,
            value: "",
          },
          {
            id: 2,
            value: "",
          },
        ],
      },
      {
        id: 2,
        vizType: "line",
        headerName: "",
        color: "#0068BE",
        plots: [
          {
            id: 0,
            value: "",
          },
          {
            id: 1,
            value: "",
          },
          {
            id: 2,
            value: "",
          },
        ],
      },
    ];

    setData(emptyArr);

    let emptyObj = {
      vizType: "line",
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
        id="lineTab"
      >
        <li className="nav-item me-2" role="presentation">
          <button
            className="nav-link active custom-tab-1"
            id="line-tab"
            data-bs-toggle="tab"
            data-bs-target="#dataLine"
            type="button"
            role="tab"
            aria-controls="dataLine"
            aria-selected="true"
          >
            Data
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link custom-tab-1 "
            id="optionalLine-tab"
            data-bs-toggle="tab"
            data-bs-target="#optionalLine"
            type="button"
            role="tab"
            aria-controls="optionalLine"
            aria-selected="false"
          >
            Configuration
          </button>
        </li>
      </ul>

      <div className="tab-content" id="lineTabContent">
        <div
          className="tab-pane fade show active"
          id="dataLine"
          role="tabpanel"
          aria-labelledby="line-tab"
        >
          <div className="p-0 m-0 mt-4 pt-2 hori-scroll-1 ps-4">
            {data &&
              data.map((i, j) => {
                return (
                  <div className="col-3 me-3" key={j}>
                    {j === 0 && (
                      <React.Fragment key={j}>
                        <div className="">
                          <hr className="custom-hr-1" />
                        </div>
                        <div>
                          {i.plots &&
                            i.plots.map((m, n) => {
                              return (
                                <div className="pb-3">
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

                                  <input
                                    type="text"
                                    placeholder="Label"
                                    value={m.value}
                                    onChange={(e) => updatePlotsData(e, j, n)}
                                    className="custom-input-type-1"
                                    autoComplete="off"
                                  />
                                </div>
                              );
                            })}
                        </div>
                      </React.Fragment>
                    )}
                    {j > 0 && (
                      <React.Fragment key={j}>
                        <div className="">
                          <span
                            className="color-picker-selected-1 me-2"
                            id="colorPickerDropdownB"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            style={{
                              backgroundColor: `${i.color ? i.color : "#bbb"}`,
                            }}
                          ></span>
                          <div
                            className="dropdown-menu color-picker-dd-1"
                            aria-labelledby="colorPickerDropdownB"
                          >
                            <div className="">
                              {colors.map((k, l) => {
                                return (
                                  <div className="ms-3" key={l}>
                                    {k.colors.map((m, n) => {
                                      return (
                                        <span
                                          className="color-picker-shape-1 me-2"
                                          key={n}
                                          onClick={(e) => getColor(e, m, i.id)}
                                          style={{
                                            backgroundColor: `${m}`,
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
                            className="input-header-1 custom-input-type-2"
                            placeholder="Label"
                            onChange={(e) => updateHeaderData(e, j)}
                            value={i.headerName}
                            autoComplete="off"
                          />
                          {data.length > 2 && (
                            <span
                              className="material-icons delete-icon-1"
                              onClick={(e) => deleteColumn(e, i.id)}
                            >
                              delete
                            </span>
                          )}

                          <hr className="custom-hr-1" />
                        </div>
                        <div className="">
                          {i.plots.map((m, n) => {
                            return (
                              <div className="pb-3">
                                <input
                                  type="text"
                                  placeholder="Value"
                                  value={m.value}
                                  onChange={(e) => updatePlotsData(e, j, n)}
                                  className="custom-input-type-1"
                                  autoComplete="off"
                                />
                              </div>
                            );
                          })}
                        </div>
                      </React.Fragment>
                    )}
                  </div>
                );
              })}
            <div className="col-3 pull-up-2">
              <button
                type="button"
                className="btn custom-btn-2 pull-up-1 remove-btn-outline"
                onClick={addColumn}
              >
                <span className="material-icons me-2">add</span>
                New Region
              </button>
            </div>
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
          id="optionalLine"
          role="tabpanel"
          aria-labelledby="optionalLine-tab"
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
                      id="legends-4"
                    />
                  </span>
                  Show Legends
                </label>
                <label className="input-header-1 ms-3">
                  <span className="me-2">
                    <input type="checkbox" onClick={updateGrids} id="grid-4" />
                  </span>
                  Hide gridlines
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

export default LineView;
