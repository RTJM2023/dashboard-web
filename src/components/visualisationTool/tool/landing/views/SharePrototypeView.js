import React, { useEffect, useState } from "react";
import { PrototypeService } from "../../../../../services/prototype.service";
import Notify from "../../../../../helpers/notify";
import ChartRenderer from "../../../visualizations/ChartRenderer";

const SharePrototypeView = ({ location }) => {
  const [path, setPath] = useState();
  const [dashboard, setDashboard] = useState();

  useEffect(() => {
    if (location && location.pathname) {
      setPath(location.pathname.split("/")[2]);
    }
  }, [location]);

  useEffect(() => {
    getDashboardById(path);
  }, [path]);

  const getDashboardById = (id) => {
    if (id) {
      PrototypeService.getDashboardById(id).then((response) => {
        if (
          response.data.statusInfo &&
          response.data.statusInfo.statusCode === 200
        ) {
          setDashboard(response.data.responseData);
        } else {
          if (response) {
            Notify.error(
              response.data.statusInfo && response.data.statusInfo.errorMessage
            );
          } else {
            Notify.error("Sorry, something went wrong");
          }
        }
      });
    }
  };

  return (
    <div className="dashboard-save-1 mb-4 ms-4 me-4 mt-5">
      {dashboard && (
        <React.Fragment>
          <h1 className="ms-3 mt-4">
            {dashboard.title ? dashboard.title : "Untitled"}
          </h1>
          <label className="ms-3">
            {dashboard.description
              ? dashboard.description
              : "Short description"}
          </label>
        </React.Fragment>
      )}

      {dashboard &&
        dashboard.layout[0].rowDetails[0].data.length !== 0 &&
        dashboard.layout.map((k, l) => {
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

export default SharePrototypeView;
