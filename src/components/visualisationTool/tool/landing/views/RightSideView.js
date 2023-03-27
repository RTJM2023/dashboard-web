import React, { useState } from "react";
import ChartRenderer from "../../../visualizations/ChartRenderer";
import "file-saver";
import domtoimage from "dom-to-image";
import Notify from "../../../../../helpers/notify";
import { ChartService } from "../../../../../services/chart.service";
import { withRouter } from "react-router";

const RightSideView = ({
  props,
  data,
  chartData,
  headerData,
  showLegend,
  showInsights,
  showGrid,
  match,
  location,
  history,
}) => {
  // eslint-disable-next-line no-unused-vars
  const [imageBlob, setImageBlob] = useState();

  const filterImage = (node) => {
    return (
      node.id !== "dropdownMenuButton" &&
      node.id !== "zoomIn" &&
      node.id !== "zoomOut" &&
      node.id !== "zoomInBtn" &&
      node.id !== "zoomOutBtn" &&
      node.id !== "fullScreenBtn"
    );
  };

  const downloadAsImage = (e) => {
    e.preventDefault();

    domtoimage
      .toPng(document.getElementById("preview"), {
        filter: filterImage,
        bgcolor: "#ffffff",
        quality: 1.0,
      })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `${
          headerData.chartTitle !== "" ? headerData.chartTitle : "Untitled"
        }`;
        link.href = dataUrl;
        link.click();
        setImageBlob(dataUrl);
      });
  };

  const saveCharts = (e, data, chartData, headerData) => {
    e.preventDefault();

    let finalChartDetails = {
      chartType: data.chartType,
      subChartType: data.subChartType,
      visualizationCode: camelCase(headerData.chartTitle),
      chartFormat: "",
      drillDownChartId: "",
      filterKeys: "",
      customData: "",
      dates: "",
      filter: "",
      data: chartData,
      title: headerData.chartTitle,
      description: headerData.subTitle,
      image: "",
      showGrid: showGrid,
      showInsights: showInsights,
      showLegend: showLegend,
      insightsData: headerData.data,
    };

    domtoimage
      .toPng(document.getElementById("preview"), {
        filter: filterImage,
        bgcolor: "#ffffff",
      })
      .then((dataUrl) => {
        finalChartDetails.image = dataUrl;

        ChartService.saveUserChart(finalChartDetails).then((response) => {
          if (
            response.data.statusInfo &&
            response.data.statusInfo.statusCode === 200
          ) {
            Notify.dark("!Chart details saved");
            setTimeout(() => {
              history.push("/prototypeHome");
            }, 350);
          } else {
            Notify.error(
              response.data.statusInfo && response.data.statusInfo.errorMessage
            );
          }
        });
      });
  };

  const camelCase = (string) => {
    return string
      .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
      })
      .replace(/\s+/g, "");
  };

  return (
    <div className="col-12 p-3">
      <div className="clearfix pt-3 pb-3 mx-5">
        <div className="float-end">
          {data && data.chartType !== "" && (
            <button
              type="button"
              className="btn secondary-btn-1 me-4"
              onClick={(e) => saveCharts(e, data, chartData, headerData)}
              title="Save"
            >
              Save
            </button>
          )}

          <button
            type="button"
            className="btn primary-btn-1"
            onClick={downloadAsImage}
            title="Download"
          >
            <span className="material-icons me-2 download-icon-1">
              cloud_download
            </span>
            Download
          </button>
        </div>
      </div>
      <label className="label-style-2 ms-3 pb-3">Visualisation preview</label>
      <div className="preview-1 shadow-1">
        <div className="config-area-1 mt-5">
          {(!data || data.chartType === "") && (
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
          )}
          {data && data.chartType !== "" && (
            <ChartRenderer
              data={data}
              chartData={chartData}
              headerData={headerData}
              showLegend={showLegend}
              showInsights={showInsights}
              showGrid={showGrid}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default withRouter(RightSideView);
