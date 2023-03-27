import React, { useState } from "react";
import AreaView from "./AreaView";
import BarView from "./BarView";
import HorizontalBarView from "./HorizontalBarView";
import LineView from "./LineView";
import PieView from "./PieView";
import TableView from "./TableView";

const LeftSideView = ({
  props,
  chartData,
  headerData,
  showLegend,
  showInsights,
  showGrid,
}) => {
  const [selectedChart, setSelectedChart] = useState();
  const [selectedSubChart, setSelectedSubChart] = useState();

  const captureChartSelection = (e, value) => {
    e.preventDefault();
    setSelectedChart(value);
  };

  const captureSubChartSelection = (e, value) => {
    e.preventDefault();
    setSelectedSubChart(value);
  };

  const passChartData = (data) => {
    chartData(data);
  };

  const passHeaderData = (data) => {
    headerData(data);
  };

  const captureLegends = (value) => {
    showLegend(value);
  };

  const captureInsights = (value) => {
    showInsights(value);
  };

  const captureGrid = (value) => {
    showGrid(value);
  };

  return (
    <div className="col-12 p-3">
      {/* Row 1 */}
      <div className="clearfix">
        <label className="label-style-2 float-start pt-3">
          Select chart type
        </label>
      </div>

      {/* Row 2 */}
      <div className="row p-0 m-0 pt-4">
        {/* Horizontal bars */}
        {(!selectedChart || selectedChart !== "horizontal_bar") && (
          <button
            type="button"
            className="btn custom-btn-1 me-2"
            title="Horizontal bar chart"
            onClick={(e) => {
              captureChartSelection(e, "horizontal_bar");
              props({
                chartType: "horizontal_bar",
                subChartType: "horizontal_bar",
              });
              setTimeout(() => {
                let dd = document.getElementById(
                  "horizontalBarChartDD"
                ).classList;

                dd.add("show");

                let dm = document.querySelectorAll(
                  '[aria-labelledby="horizontalBarChartDD"]'
                );

                dm[0].classList.add("show");

                setTimeout(() => {
                  dd.remove("show");
                  dm[0].classList.remove("show");
                }, 1800);
              }, 500);
            }}
          >
            <img
              src="/icons/viz-icon.svg"
              alt="Horizontal bar chart"
              className="chart-icon-1"
            />
          </button>
        )}

        {selectedChart && selectedChart === "horizontal_bar" && (
          <div className="dropdown p-0 custom-dd-section-1">
            <button
              className="btn custom-btn-expanded-1 me-2 dropdown-toggle"
              type="button"
              id="horizontalBarChartDD"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              title="Horizontal bar chart"
            >
              <span>
                <img
                  src="/icons/viz-icon.svg"
                  alt="Horizontal bar chart"
                  className="me-2"
                />
              </span>
              HBar chart
            </button>
            <div
              className="dropdown-menu custom-dd-1"
              aria-labelledby="horizontalBarChartDD"
            >
              <div className="row m-0 pt-3 pb-3">
                <button
                  type="button"
                  className={`btn col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 me-3 ms-4 ${
                    selectedSubChart === "horizontal_bar"
                      ? "sub-chart-box-2"
                      : "sub-chart-box-1"
                  }`}
                  onClick={(e) => {
                    captureSubChartSelection(e, "horizontal_bar");
                    props({
                      chartType: "horizontal_bar",
                      subChartType: "horizontal_bar",
                    });
                  }}
                >
                  <center>
                    <div className="">
                      <img
                        src="/icons/viz-icon.svg"
                        alt="Horizontal bar chart"
                      />
                    </div>
                    <div className="">
                      <label>HBar chart</label>
                    </div>
                  </center>
                </button>
                <button
                  type="button"
                  className={`btn col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 ${
                    selectedSubChart === "horizontal_stacked_bar"
                      ? "sub-chart-box-2"
                      : "sub-chart-box-1"
                  }`}
                  onClick={(e) => {
                    captureSubChartSelection(e, "horizontal_stacked_bar");
                    props({
                      chartType: "horizontal_bar",
                      subChartType: "horizontal_stacked_bar",
                    });
                  }}
                >
                  <center>
                    <div className="">
                      <img
                        src="/icons/viz-bar-stacked.svg"
                        alt="Horizontal stacked bar chart"
                      />
                    </div>
                    <div className="">
                      <label>Stacked HBar chart</label>
                    </div>
                  </center>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Vertical bars */}
        {(!selectedChart || selectedChart !== "bar") && (
          <button
            type="button"
            className="btn custom-btn-1 mx-2"
            title="Bar chart"
            onClick={(e) => {
              captureChartSelection(e, "bar");
              props({
                chartType: "bar",
                subChartType: "bar",
              });
              setTimeout(() => {
                if (document.getElementById("barChartDD")) {
                  let dd = document.getElementById("barChartDD").classList;

                  dd.add("show");

                  let dm = document.querySelectorAll(
                    '[aria-labelledby="barChartDD"]'
                  );

                  dm[0].classList.add("show");

                  setTimeout(() => {
                    dd.remove("show");
                    dm[0].classList.remove("show");
                  }, 1800);
                }
              }, 500);
            }}
          >
            <img
              src="/icons/viz-icon-column.svg"
              alt="Bar chart"
              className="chart-icon-1"
            />
          </button>
        )}

        {selectedChart && selectedChart === "bar" && (
          <div className="dropdown custom-dd-section-1 p-0">
            <button
              className="btn custom-btn-expanded-1 me-2 dropdown-toggle"
              type="button"
              id="barChartDD"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              title="Bar chart"
            >
              <span>
                <img
                  src="/icons/viz-icon-column.svg"
                  alt="Bar chart"
                  className="me-2"
                />
              </span>
              Bar chart
            </button>
            <div
              className="dropdown-menu custom-dd-1"
              aria-labelledby="barChartDD"
            >
              <div className="row m-0 pt-3 pb-3">
                <button
                  type="button"
                  className={`btn col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 me-3 ms-4 ${
                    selectedSubChart === "bar"
                      ? "sub-chart-box-2"
                      : "sub-chart-box-1"
                  }`}
                  onClick={(e) => {
                    captureSubChartSelection(e, "bar");
                    props({
                      chartType: "bar",
                      subChartType: "bar",
                    });
                  }}
                >
                  <center>
                    <div className="">
                      <img src="/icons/viz-icon-column.svg" alt="Bar chart" />
                    </div>
                    <div className="">
                      <label>Bar chart</label>
                    </div>
                  </center>
                </button>
                <button
                  type="button"
                  className={`btn col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 ${
                    selectedSubChart === "stacked_bar"
                      ? "sub-chart-box-2"
                      : "sub-chart-box-1"
                  }`}
                  onClick={(e) => {
                    captureSubChartSelection(e, "stacked_bar");
                    props({
                      chartType: "bar",
                      subChartType: "stacked_bar",
                    });
                  }}
                >
                  <center>
                    <div className="">
                      <img
                        src="/icons/stacked_bar_chart_black_24dp.svg"
                        alt="Stacked bar chart"
                      />
                    </div>
                    <div className="">
                      <label>Stacked bar chart</label>
                    </div>
                  </center>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Pie chart */}
        <button
          type="button"
          className={`btn mx-2 ${
            selectedChart === "pie" ? "custom-btn-selected-1" : "custom-btn-1"
          }`}
          title="Pie chart"
          onClick={(e) => {
            captureChartSelection(e, "pie");
            captureSubChartSelection(e, "pie");
            props({ chartType: "pie", subChartType: "pie" });
          }}
        >
          <img
            src="/icons/viz-pie-chart.svg"
            alt="Pie chart"
            className="chart-icon-1"
          />
        </button>

        {/* Line chart */}
        <button
          type="button"
          className={`btn mx-2 ${
            selectedChart === "line" ? "custom-btn-selected-1" : "custom-btn-1"
          }`}
          title="Line chart"
          onClick={(e) => {
            captureChartSelection(e, "line");
            captureSubChartSelection(e, "line");
            props({ chartType: "line", subChartType: "line" });
          }}
        >
          <img
            src="/icons/viz-line-chart.svg"
            alt="Line chart"
            className="chart-icon-1"
          />
        </button>

        {/* Area chart */}
        <button
          type="button"
          className={`btn mx-2 ${
            selectedChart === "area" ? "custom-btn-selected-1" : "custom-btn-1"
          }`}
          title="Area chart"
          onClick={(e) => {
            captureChartSelection(e, "area");
            captureSubChartSelection(e, "area");
            props({ chartType: "area", subChartType: "area" });
          }}
        >
          <img
            src="/icons/viz-area-chart.svg"
            alt="Area chart"
            className="chart-icon-1"
          />
        </button>

        {/* Table chart */}
        <button
          type="button"
          className={`btn mx-2 ${
            selectedChart === "table" ? "custom-btn-selected-1" : "custom-btn-1"
          }`}
          title="Table chart"
          onClick={(e) => {
            captureChartSelection(e, "table");
            captureSubChartSelection(e, "table");
            props({ chartType: "table", subChartType: "table" });
          }}
        >
          <img
            src="/icons/viz-table-chart.svg"
            alt="Table chart"
            className="chart-icon-1"
          />
        </button>
      </div>

      {/* Row 3 */}
      <div className="config-area-1 mt-5">
        {/* Empty state */}
        {!selectedChart && (
          <center>
            <div className="">
              <img
                className="empty-state-1"
                src="/icons/Empty_Data.svg"
                alt="empty data"
              />
            </div>
            <div className="">
              <label className="label-style-4 empty-state-2">
                Select chart type to enter data
              </label>
            </div>
          </center>
        )}

        {/* Horizontal bar chart */}
        {selectedChart &&
          selectedChart === "horizontal_bar" &&
          selectedSubChart &&
          selectedSubChart === "horizontal_bar" && (
            <HorizontalBarView
              isStacked={false}
              passChartData={passChartData}
              passHeaderData={passHeaderData}
              showLegend={captureLegends}
              showInsights={captureInsights}
              showGrid={captureGrid}
            />
          )}

        {/* Horizontal stacked bar chart */}
        {selectedChart &&
          selectedChart === "horizontal_bar" &&
          selectedSubChart &&
          selectedSubChart === "horizontal_stacked_bar" && (
            <HorizontalBarView
              isStacked={true}
              passChartData={passChartData}
              passHeaderData={passHeaderData}
              showLegend={captureLegends}
              showInsights={captureInsights}
              showGrid={captureGrid}
            />
          )}

        {/* Bar chart */}
        {selectedChart &&
          selectedChart === "bar" &&
          selectedSubChart &&
          selectedSubChart === "bar" && (
            <BarView
              isStacked={false}
              passChartData={passChartData}
              passHeaderData={passHeaderData}
              showLegend={captureLegends}
              showInsights={captureInsights}
              showGrid={captureGrid}
            />
          )}

        {/* Stacked bar chart */}
        {selectedChart &&
          selectedChart === "bar" &&
          selectedSubChart &&
          selectedSubChart === "stacked_bar" && (
            <BarView
              isStacked={true}
              passChartData={passChartData}
              passHeaderData={passHeaderData}
              showLegend={captureLegends}
              showInsights={captureInsights}
              showGrid={captureGrid}
            />
          )}

        {/* Pie chart */}
        {selectedChart &&
          selectedChart === "pie" &&
          selectedSubChart === "pie" && (
            <PieView
              passChartData={passChartData}
              passHeaderData={passHeaderData}
              showLegend={captureLegends}
              showInsights={captureInsights}
            />
          )}

        {/* Line chart */}
        {selectedChart &&
          selectedChart === "line" &&
          selectedSubChart === "line" && (
            <LineView
              passChartData={passChartData}
              passHeaderData={passHeaderData}
              showLegend={captureLegends}
              showInsights={captureInsights}
              showGrid={captureGrid}
            />
          )}

        {/* Area chart */}
        {selectedChart &&
          selectedChart === "area" &&
          selectedSubChart === "area" && (
            <AreaView
              passChartData={passChartData}
              passHeaderData={passHeaderData}
              showLegend={captureLegends}
              showInsights={captureInsights}
              showGrid={captureGrid}
            />
          )}

        {/* Table chart */}
        {selectedChart &&
          selectedChart === "table" &&
          selectedSubChart === "table" && (
            <TableView
              passChartData={passChartData}
              passHeaderData={passHeaderData}
              showInsights={captureInsights}
            />
          )}
      </div>
    </div>
  );
};

export default LeftSideView;
