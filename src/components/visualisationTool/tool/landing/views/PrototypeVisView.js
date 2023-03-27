import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Notify from "../../../../../helpers/notify";
import { ChartService } from "../../../../../services/chart.service";

/**
 * PrototypeVisView renders the
 * list of visualisations which are saved
 */

const PrototypeVisView = () => {
  const [savedCharts, setSavedCharts] = useState();
  const [latestId, setLatestId] = useState();

  useEffect(() => {
    getAllCharts();
  }, []);

  const getAllCharts = () => {
    ChartService.getAllCharts().then((response) => {
      if (
        response &&
        response.data.statusInfo &&
        response.data.statusInfo.statusCode === 200
      ) {
        let latId = Math.max(...response.data.responseData.map((e) => e.id));
        setLatestId(latId);
        setSavedCharts(response.data.responseData);
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
  };

  const deleteSavedChart = (e, id) => {
    e.preventDefault();
    ChartService.deleteChartById(id).then((response) => {
      if (
        response &&
        response.data.statusInfo &&
        response.data.statusInfo.statusCode === 200
      ) {
        setTimeout(() => {
          getAllCharts();
          Notify.dark("!Chart deleted");
        }, 500);
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
  };

  const searchVis = () => {
    var input, filter, ul, li, i, txtValue;
    input = document.getElementById("visSearch");
    filter = input.value.toUpperCase();
    ul = document.getElementById("visList");
    li = ul.getElementsByTagName("div");

    for (i = 0; i < li.length; i++) {
      if (li[i].ariaLabel) {
        txtValue = li[i].ariaLabel;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          li[i].style.display = "";
        } else {
          li[i].style.display = "none";
        }
      }
    }
  };

  return (
    <div className="">
      <div className="clearfix">
        <div className="float-start">
          <h1 className="pt-5 ms-4">Visualisations</h1>
        </div>
        {savedCharts && savedCharts !== null && savedCharts.length > 0 && (
          <div className="float-end pt-4 mt-3 me-3">
            <NavLink to="/tool">
              <button type="button" className="btn primary-btn-3">
                New visualization
              </button>
            </NavLink>
          </div>
        )}
      </div>

      {/* Empty state */}
      {(!savedCharts || savedCharts === null || savedCharts.length === 0) && (
        <div className="vertical-center-1 empty-style-1">
          <center>
            <img
              src="/icons/Empty_icon.svg"
              alt="no visualisations"
              className="pb-3"
            />
            <p>No data found</p>
            <label>Please create visualisation and save</label>
            <br />
            <NavLink to="/tool">
              <button type="button" className="btn primary-btn-2 mt-3">
                New visualization
              </button>
            </NavLink>
          </center>
        </div>
      )}
      {/* Chart lists */}
      {savedCharts && savedCharts !== null && savedCharts.length > 0 && (
        <React.Fragment>
          <div className="">
            <input
              type="text"
              className="custom-input-type-1 col-4 mt-4 ms-4 input-field-max-width-1 custom-input-search-1"
              placeholder="Search"
              id="visSearch"
              onKeyUp={searchVis}
              autoComplete="off"
            />
          </div>
          <div id="visList">
            <div className="row p-0 m-0 ms-3 mt-5">
              {savedCharts.map((i, j) => {
                return (
                  <div
                    className="col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-4"
                    aria-label={i.title !== "" ? i.title : "Untitled"}
                  >
                    <div className="">
                      <div className="clearfix d-flex flex-row img-thumbnail">
                        <div className="float-start">
                          <div className="d-flex flex-row">
                            <img
                              src={i.image}
                              alt="chart thumbnail"
                              className="img-fluid"
                            />
                            {i.id === latestId && (
                              <div className="" id="hideBadge">
                                <span className="badge new-tag-1">
                                  Newly added
                                </span>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="float-end">
                          <div
                            className="material-icons"
                            id="dashViewDD2"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            more_vert
                          </div>
                          <div
                            className="dropdown-menu dash-view-dd-1"
                            aria-labelledby="dashViewDD2"
                          >
                            <li className="ms-3 me-3 mt-2">
                              <span className="material-icons">edit</span>
                              Edit
                            </li>
                            <li
                              onClick={(e) => deleteSavedChart(e, i.id)}
                              className="ms-3 me-3 mt-3 mb-2"
                            >
                              <span className="material-icons">delete</span>
                              Delete
                            </li>
                          </div>
                        </div>
                      </div>
                    </div>

                    <center className="preview-title-1 pt-3 mb-3">
                      {i.title !== "" ? i.title : "Untitled"}
                    </center>
                  </div>
                );
              })}
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default PrototypeVisView;
