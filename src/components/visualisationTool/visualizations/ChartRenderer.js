import React from "react";
import AreaChart from "./AreaChart";
import BarChart from "./BarChart";
import HorizontalBarChart from "./HorizontalBarChart";
import HorizontalStackedBarChart from "./HorizontalStackedBarChart";
import LineChart from "./LineChart";
import PieChart from "./PieChart";
import StackedBarChart from "./StackedBarChart";
import TableChart from "./TableChart";

const ChartRenderer = ({
  data,
  chartData,
  headerData,
  showLegend,
  showInsights,
  showGrid,
}) => {
  switch (data.subChartType) {
    case "horizontal_bar":
      return (
        <div className="chart-area-1" id="preview">
          {chartData && headerData && (
            <div className="clearfix">
              <div className="float-start ms-5">
                <h1>
                  {headerData.chartTitle !== ""
                    ? headerData.chartTitle
                    : "Untitled"}
                </h1>
                <p>
                  {headerData.subTitle !== ""
                    ? headerData.subTitle
                    : "Description"}
                </p>
              </div>
              <div className="float-end me-5">
                <div className="d-flex flex-row">
                  <span
                    className="material-icons me-3 header-icons-1"
                    id="fullScreenBtn"
                  >
                    fullscreen
                  </span>
                  <span
                    className="material-icons header-icons-1"
                    id="dropdownMenuButton"
                  >
                    more_vert
                  </span>
                </div>
              </div>
            </div>
          )}

          {chartData && !headerData && (
            <div className="clearfix">
              <div className="float-start ms-5">
                <h1>Untitled</h1>
                <p>Description</p>
              </div>
              <div className="float-end me-5">
                <div className="d-flex flex-row">
                  <span
                    className="material-icons me-3 header-icons-1"
                    id="fullScreenBtn"
                  >
                    fullscreen
                  </span>
                  <span
                    className="material-icons header-icons-1"
                    id="dropdownMenuButton"
                  >
                    more_vert
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="ms-5 me-5">
            {showInsights && (
              <div className="row">
                {chartData &&
                  headerData &&
                  headerData.data.length > 0 &&
                  headerData.data.map((i, j) => {
                    return (
                      <div className="insights-box-1 ms-2 mb-4">
                        <label className="ms-1 pt-3">{i.label}</label>
                        <div className="d-flex flex-row pt-2 ms-1 pb-1">
                          <h3>{i.metric}</h3>
                          {/* {i.change !== "" && <p className="ms-2">4</p>} */}
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}

            {chartData &&
              chartData[0] &&
              chartData[0].vizType === "horizontal_bar" && (
                <HorizontalBarChart
                  chartData={chartData}
                  headerData={headerData}
                  showLegend={showLegend}
                  showGrid={showGrid}
                />
              )}
          </div>
        </div>
      );

    case "horizontal_stacked_bar":
      return (
        <div className="chart-area-1" id="preview">
          {chartData && headerData && (
            <div className="clearfix">
              <div className="float-start ms-5">
                <h1>
                  {headerData.chartTitle !== ""
                    ? headerData.chartTitle
                    : "Untitled"}
                </h1>
                <p>
                  {headerData.subTitle !== ""
                    ? headerData.subTitle
                    : "Description"}
                </p>
              </div>
              <div className="float-end me-5">
                <div className="d-flex flex-row">
                  <span
                    className="material-icons me-3 header-icons-1"
                    id="fullScreenBtn"
                  >
                    fullscreen
                  </span>
                  <span
                    className="material-icons header-icons-1"
                    id="dropdownMenuButton"
                  >
                    more_vert
                  </span>
                </div>
              </div>
            </div>
          )}

          {chartData && !headerData && (
            <div className="clearfix">
              <div className="float-start ms-5">
                <h1>Untitled</h1>
                <p>Description</p>
              </div>
              <div className="float-end me-5">
                <div className="d-flex flex-row">
                  <span
                    className="material-icons me-3 header-icons-1"
                    id="fullScreenBtn"
                  >
                    fullscreen
                  </span>
                  <span
                    className="material-icons header-icons-1"
                    id="dropdownMenuButton"
                  >
                    more_vert
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="ms-5 me-5">
            {showInsights && (
              <div className="row">
                {chartData &&
                  headerData &&
                  headerData.data.length > 0 &&
                  headerData.data.map((i, j) => {
                    return (
                      <div className="insights-box-1 ms-2 mb-4">
                        <label className="ms-1 pt-3">{i.label}</label>
                        <div className="d-flex flex-row pt-2 ms-1 pb-1">
                          <h3>{i.metric}</h3>
                          {/* {i.change !== "" && <p className="ms-2">4</p>} */}
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}

            {chartData &&
              chartData[0] &&
              chartData[0].vizType === "horizontal_bar" && (
                <HorizontalStackedBarChart
                  chartData={chartData}
                  headerData={headerData}
                  showLegend={showLegend}
                  showGrid={showGrid}
                />
              )}
          </div>
        </div>
      );

    case "bar":
      return (
        <div className="chart-area-1" id="preview">
          {chartData && headerData && (
            <div className="clearfix">
              <div className="float-start ms-5">
                <h1>
                  {headerData.chartTitle !== ""
                    ? headerData.chartTitle
                    : "Untitled"}
                </h1>
                <p>
                  {headerData.subTitle !== ""
                    ? headerData.subTitle
                    : "Description"}
                </p>
              </div>
              <div className="float-end me-5">
                <div className="d-flex flex-row">
                  <span
                    className="material-icons me-3 header-icons-1"
                    id="fullScreenBtn"
                  >
                    fullscreen
                  </span>
                  <span
                    className="material-icons header-icons-1"
                    id="dropdownMenuButton"
                  >
                    more_vert
                  </span>
                </div>
              </div>
            </div>
          )}

          {chartData && !headerData && (
            <div className="clearfix">
              <div className="float-start ms-5">
                <h1>Untitled</h1>
                <p>Description</p>
              </div>
              <div className="float-end me-5">
                <div className="d-flex flex-row">
                  <span
                    className="material-icons me-3 header-icons-1"
                    id="fullScreenBtn"
                  >
                    fullscreen
                  </span>
                  <span
                    className="material-icons header-icons-1"
                    id="dropdownMenuButton"
                  >
                    more_vert
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="ms-5 me-5">
            {showInsights && (
              <div className="row">
                {chartData &&
                  headerData &&
                  headerData.data.length > 0 &&
                  headerData.data.map((i, j) => {
                    return (
                      <div className="insights-box-1 ms-2 mb-4">
                        <label className="ms-1 pt-3">{i.label}</label>
                        <div className="d-flex flex-row pt-2 ms-1 pb-1">
                          <h3>{i.metric}</h3>
                          {/* {i.change !== "" && <p className="ms-2">4</p>} */}
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
            {chartData && chartData[0] && chartData[0].vizType === "bar" && (
              <BarChart
                chartData={chartData}
                headerData={headerData}
                showLegend={showLegend}
                showGrid={showGrid}
              />
            )}
          </div>
        </div>
      );

    case "stacked_bar":
      return (
        <div className="chart-area-1" id="preview">
          {chartData && headerData && (
            <div className="clearfix">
              <div className="float-start ms-5">
                <h1>
                  {headerData.chartTitle !== ""
                    ? headerData.chartTitle
                    : "Untitled"}
                </h1>
                <p>
                  {headerData.subTitle !== ""
                    ? headerData.subTitle
                    : "Description"}
                </p>
              </div>
              <div className="float-end me-5">
                <div className="d-flex flex-row">
                  <span
                    className="material-icons me-3 header-icons-1"
                    id="fullScreenBtn"
                  >
                    fullscreen
                  </span>
                  <span
                    className="material-icons header-icons-1"
                    id="dropdownMenuButton"
                  >
                    more_vert
                  </span>
                </div>
              </div>
            </div>
          )}

          {chartData && !headerData && (
            <div className="clearfix">
              <div className="float-start ms-5">
                <h1>Untitled</h1>
                <p>Description</p>
              </div>
              <div className="float-end me-5">
                <div className="d-flex flex-row">
                  <span
                    className="material-icons me-3 header-icons-1"
                    id="fullScreenBtn"
                  >
                    fullscreen
                  </span>
                  <span
                    className="material-icons header-icons-1"
                    id="dropdownMenuButton"
                  >
                    more_vert
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="ms-5 me-5">
            {showInsights && (
              <div className="row">
                {chartData &&
                  headerData &&
                  headerData.data.length > 0 &&
                  headerData.data.map((i, j) => {
                    return (
                      <div className="insights-box-1 ms-2 mb-4">
                        <label className="ms-1 pt-3">{i.label}</label>
                        <div className="d-flex flex-row pt-2 ms-1 pb-1">
                          <h3>{i.metric}</h3>
                          {/* {i.change !== "" && <p className="ms-2">4</p>} */}
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
            {chartData && chartData[0] && chartData[0].vizType === "bar" && (
              <StackedBarChart
                chartData={chartData}
                headerData={headerData}
                showLegend={showLegend}
                showGrid={showGrid}
              />
            )}
          </div>
        </div>
      );

    case "pie":
      return (
        <div className="chart-area-1" id="preview">
          {chartData && headerData && (
            <div className="clearfix">
              <div className="float-start ms-5">
                <h1>
                  {headerData.chartTitle !== ""
                    ? headerData.chartTitle
                    : "Untitled"}
                </h1>
                <p>
                  {headerData.subTitle !== ""
                    ? headerData.subTitle
                    : "Description"}
                </p>
              </div>
              <div className="float-end me-5">
                <div className="d-flex flex-row">
                  <span
                    className="material-icons me-3 header-icons-1"
                    id="fullScreenBtn"
                  >
                    fullscreen
                  </span>
                  <span
                    className="material-icons header-icons-1"
                    id="dropdownMenuButton"
                  >
                    more_vert
                  </span>
                </div>
              </div>
            </div>
          )}

          {chartData && !headerData && (
            <div className="clearfix">
              <div className="float-start ms-5">
                <h1>Untitled</h1>
                <p>Description</p>
              </div>
              <div className="float-end me-5">
                <div className="d-flex flex-row">
                  <span
                    className="material-icons me-3 header-icons-1"
                    id="fullScreenBtn"
                  >
                    fullscreen
                  </span>
                  <span
                    className="material-icons header-icons-1"
                    id="dropdownMenuButton"
                  >
                    more_vert
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="ms-5 me-5">
            {showInsights && (
              <div className="row">
                {chartData &&
                  headerData &&
                  headerData.data.length > 0 &&
                  headerData.data.map((i, j) => {
                    return (
                      <div className="insights-box-1 ms-2 mb-4">
                        <label className="ms-1 pt-3">{i.label}</label>
                        <div className="d-flex flex-row pt-2 ms-1 pb-1">
                          <h3>{i.metric}</h3>
                          {/* {i.change !== "" && <p className="ms-2">4</p>} */}
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
            {chartData && chartData[0] && chartData[0].vizType === "pie" && (
              <PieChart
                chartData={chartData}
                headerData={headerData}
                showLegend={showLegend}
              />
            )}
          </div>
        </div>
      );

    case "line":
      return (
        <div className="chart-area-1" id="preview">
          {chartData && headerData && (
            <div className="clearfix">
              <div className="float-start ms-5">
                <h1>
                  {headerData.chartTitle !== ""
                    ? headerData.chartTitle
                    : "Untitled"}
                </h1>
                <p>
                  {headerData.subTitle !== ""
                    ? headerData.subTitle
                    : "Description"}
                </p>
              </div>
              <div className="float-end me-5">
                <div className="d-flex flex-row">
                  <span
                    className="material-icons me-3 header-icons-1"
                    id="fullScreenBtn"
                  >
                    fullscreen
                  </span>
                  <span
                    className="material-icons header-icons-1"
                    id="dropdownMenuButton"
                  >
                    more_vert
                  </span>
                </div>
              </div>
            </div>
          )}

          {chartData && !headerData && (
            <div className="clearfix">
              <div className="float-start ms-5">
                <h1>Untitled</h1>
                <p>Description</p>
              </div>
              <div className="float-end me-5">
                <div className="d-flex flex-row">
                  <span
                    className="material-icons me-3 header-icons-1"
                    id="fullScreenBtn"
                  >
                    fullscreen
                  </span>
                  <span
                    className="material-icons header-icons-1"
                    id="dropdownMenuButton"
                  >
                    more_vert
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="ms-5 me-5">
            {showInsights && (
              <div className="row">
                {chartData &&
                  headerData &&
                  headerData.data.length > 0 &&
                  headerData.data.map((i, j) => {
                    return (
                      <div className="insights-box-1 ms-2 mb-4">
                        <label className="ms-1 pt-3">{i.label}</label>
                        <div className="d-flex flex-row pt-2 ms-1 pb-1">
                          <h3>{i.metric}</h3>
                          {/* {i.change !== "" && <p className="ms-2">4</p>} */}
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
            {chartData && chartData[0] && chartData[0].vizType === "line" && (
              <LineChart
                chartData={chartData}
                headerData={headerData}
                showLegend={showLegend}
                showGrid={showGrid}
              />
            )}
          </div>
        </div>
      );

    case "area":
      return (
        <div className="chart-area-1" id="preview">
          {chartData && headerData && (
            <div className="clearfix">
              <div className="float-start ms-5">
                <h1>
                  {headerData.chartTitle !== ""
                    ? headerData.chartTitle
                    : "Untitled"}
                </h1>
                <p>
                  {headerData.subTitle !== ""
                    ? headerData.subTitle
                    : "Description"}
                </p>
              </div>
              <div className="float-end me-5">
                <div className="d-flex flex-row">
                  <span
                    className="material-icons me-3 header-icons-1"
                    id="fullScreenBtn"
                  >
                    fullscreen
                  </span>
                  <span
                    className="material-icons header-icons-1"
                    id="dropdownMenuButton"
                  >
                    more_vert
                  </span>
                </div>
              </div>
            </div>
          )}

          {chartData && !headerData && (
            <div className="clearfix">
              <div className="float-start ms-5">
                <h1>Untitled</h1>
                <p>Description</p>
              </div>
              <div className="float-end me-5">
                <div className="d-flex flex-row">
                  <span
                    className="material-icons me-3 header-icons-1"
                    id="fullScreenBtn"
                  >
                    fullscreen
                  </span>
                  <span
                    className="material-icons header-icons-1"
                    id="dropdownMenuButton"
                  >
                    more_vert
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="ms-5 me-5">
            {showInsights && (
              <div className="row">
                {chartData &&
                  headerData &&
                  headerData.data.length > 0 &&
                  headerData.data.map((i, j) => {
                    return (
                      <div className="insights-box-1 ms-2 mb-4">
                        <label className="ms-1 pt-3">{i.label}</label>
                        <div className="d-flex flex-row pt-2 ms-1 pb-1">
                          <h3>{i.metric}</h3>
                          {/* {i.change !== "" && <p className="ms-2">4</p>} */}
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
            {chartData && chartData[0] && chartData[0].vizType === "area" && (
              <AreaChart
                chartData={chartData}
                headerData={headerData}
                showLegend={showLegend}
                showGrid={showGrid}
              />
            )}
          </div>
        </div>
      );

    case "table":
      return (
        <div className="chart-area-1" id="preview">
          {chartData && headerData && (
            <div className="clearfix">
              <div className="float-start ms-5">
                <h1>
                  {headerData.chartTitle !== ""
                    ? headerData.chartTitle
                    : "Untitled"}
                </h1>
                <p>
                  {headerData.subTitle !== ""
                    ? headerData.subTitle
                    : "Description"}
                </p>
              </div>
              <div className="float-end me-5">
                <div className="d-flex flex-row">
                  <span
                    className="material-icons me-3 header-icons-1"
                    id="fullScreenBtn"
                  >
                    fullscreen
                  </span>
                  <span
                    className="material-icons header-icons-1"
                    id="dropdownMenuButton"
                  >
                    more_vert
                  </span>
                </div>
              </div>
            </div>
          )}

          {chartData && !headerData && (
            <div className="clearfix">
              <div className="float-start ms-5">
                <h1>Untitled</h1>
                <p>Description</p>
              </div>
              <div className="float-end me-5">
                <div className="d-flex flex-row">
                  <span className="material-icons me-3 header-icons-1">
                    fullscreen
                  </span>
                  <span className="material-icons header-icons-1">
                    more_vert
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="ms-5 me-5">
            {showInsights && (
              <div className="row">
                {chartData &&
                  headerData &&
                  headerData.data.length > 0 &&
                  headerData.data.map((i, j) => {
                    return (
                      <div className="insights-box-1 ms-2 mb-4">
                        <label className="ms-1 pt-3">{i.label}</label>
                        <div className="d-flex flex-row pt-2 ms-1 pb-1">
                          <h3>{i.metric}</h3>
                          {/* {i.change !== "" && <p className="ms-2">4</p>} */}
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
            {chartData && chartData[0] && chartData[0].vizType === "table" && (
              <TableChart chartData={chartData} headerData={headerData} />
            )}
          </div>
        </div>
      );
    default:
      return (
        <center>
          <div className="" id="preview">
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
  }
};

export default ChartRenderer;
