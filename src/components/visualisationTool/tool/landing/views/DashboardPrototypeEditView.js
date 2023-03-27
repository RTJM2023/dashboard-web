import React from "react";
import ChartRenderer from "../../../visualizations/ChartRenderer";

const DashboardPrototypeEditView = ({ currenDashboard }) => {
  return (
    <div className="dashboard-save-1 mb-4">
      <h1 className="ms-3 mt-4">
        {currenDashboard.title ? currenDashboard.title : "Untitled"}
      </h1>
      <label className="ms-3">
        {currenDashboard.description
          ? currenDashboard.description
          : "Short description"}
      </label>
      {currenDashboard &&
        currenDashboard.layout[0].rowDetails[0].data.length !== 0 &&
        currenDashboard.layout.map((k, l) => {
          return (
            <div className="row p-0 m-0 mt-4">
              {k.rowDetails.length === 1 &&
                k.rowDetails.map((m, n) => {
                  return (
                    <div className="col-12">
                      {m.data.length !== 0 && m.data.chartType !== "" && (
                        <div className="preview-card-1 pt-4 pb-4">
                          <ChartRenderer
                            data={m.data}
                            chartData={m.data.data}
                            headerData={{
                              chartTitle: m.data.title,
                              subTitle: m.data.description,
                              data: m.data.insightsData,
                            }}
                            showInsights={m.data.showInsights}
                            showGrid={m.data.showGrid}
                            showLegend={m.data.showLegend}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              {k.rowDetails.length === 2 &&
                k.rowDetails.map((m, n) => {
                  return (
                    <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                      {m.data.length !== 0 && m.data.chartType !== "" && (
                        <div className="preview-card-1 pt-4 pb-4">
                          <ChartRenderer
                            data={m.data}
                            chartData={m.data.data}
                            headerData={{
                              chartTitle: m.data.title,
                              subTitle: m.data.description,
                              data: m.data.insightsData,
                            }}
                            showInsights={m.data.showInsights}
                            showGrid={m.data.showGrid}
                            showLegend={m.data.showLegend}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              {k.rowDetails.length === 3 &&
                k.rowDetails.map((m, n) => {
                  return (
                    <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
                      {m.data.length !== 0 && m.data.chartType !== "" && (
                        <div className="preview-card-1 pt-4 pb-4">
                          <ChartRenderer
                            data={m.data}
                            chartData={m.data.data}
                            headerData={{
                              chartTitle: m.data.title,
                              subTitle: m.data.description,
                              data: m.data.insightsData,
                            }}
                            showInsights={m.data.showInsights}
                            showGrid={m.data.showGrid}
                            showLegend={m.data.showLegend}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          );
        })}
    </div>
  );
};

export default DashboardPrototypeEditView;
