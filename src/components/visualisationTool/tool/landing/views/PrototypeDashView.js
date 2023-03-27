import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { PrototypeService } from "../../../../../services/prototype.service";
import Notify from "../../../../../helpers/notify";

/**
 * PrototypeDashView renders the
 * list of dashboards which are saved
 */

const PrototypeDashView = () => {
  const [dashboardList, setDashboardList] = useState();

  useEffect(() => {
    getAllDashboards();
  }, []);

  const getAllDashboards = () => {
    PrototypeService.getAllDashboards().then((response) => {
      if (
        response &&
        response.data.statusInfo &&
        response.data.statusInfo.statusCode === 200
      ) {
        setDashboardList(response.data.responseData);
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

  const deleteDashboard = (e, id) => {
    e.preventDefault();

    PrototypeService.deleteDashboardById(id).then((response) => {
      if (
        response &&
        response.data.statusInfo &&
        response.data.statusInfo.statusCode === 200
      ) {
        setTimeout(() => {
          getAllDashboards();
          Notify.dark("!Dashboard deleted");
        }, 450);
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

  const searchDash = () => {
    var input, filter, ul, li, i, txtValue, a;
    input = document.getElementById("dashSearch");
    filter = input.value.toUpperCase();
    ul = document.getElementById("dashList");
    li = ul.getElementsByTagName("a");

    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("h1")[0];

      if (a && a.innerText) {
        txtValue = a.innerText;
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
          <h1 className="pt-5 ms-4">Dashboards</h1>
        </div>
        {dashboardList && dashboardList !== null && dashboardList.length !== 0 && (
          <div className="float-end pt-4 mt-3 me-3">
            <NavLink
              to={{
                pathname: "/creator",
                state: { dashId: 0, isNew: true },
              }}
            >
              <button type="button" className="btn primary-btn-3">
                New dashboard
              </button>
            </NavLink>
          </div>
        )}
      </div>
      {/* Empty state */}
      {(!dashboardList ||
        dashboardList === null ||
        dashboardList.length === 0) && (
        <div className="vertical-center-1 empty-style-1">
          <center>
            <img
              src="/icons/undraw_Dashboard_re_3b76.svg"
              alt="no dashboards"
              className="pb-3"
            />
            <p>No data found</p>
            <label>Please create dashboard</label>
            <br />

            <NavLink
              to={{
                pathname: "/creator",
                state: { dashId: 0, isNew: true },
              }}
            >
              <button type="button" className="btn primary-btn-2 mt-3">
                New dashboard
              </button>
            </NavLink>
          </center>
        </div>
      )}
      {/* Dashboard list */}
      {dashboardList && dashboardList !== null && dashboardList.length !== 0 && (
        <React.Fragment>
          <div className="">
            <input
              type="text"
              className="custom-input-type-1 col-4 mt-4 ms-4 input-field-max-width-1 custom-input-search-1"
              placeholder="Search"
              id="dashSearch"
              onKeyUp={searchDash}
              autoComplete="off"
            />
          </div>
          <div id="dashList">
            <div className="row p-0 m-0 ms-4 mt-5">
              {dashboardList.map((i, j) => {
                return (
                  <NavLink
                    className="col-sm-12 col-md-6 col-lg-5 col-xl-5 col-xxl-5 dashboard-list-card-1 mb-4 p-4 me-5"
                    to={{
                      pathname: "/creator",
                      state: { dashId: i.id, isNew: false },
                    }}
                  >
                    <div className="">
                      <div className="clearfix">
                        <div className="float-start">
                          <h1>{i.title}</h1>
                        </div>
                        <div className="float-end">
                          <span
                            className="material-icons"
                            id="dashViewDD1"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            more_vert
                          </span>
                          <div
                            className="dropdown-menu dash-view-dd-1"
                            aria-labelledby="dashViewDD1"
                          >
                            <NavLink to={`/prototype/${i.id}`}>
                              <li className="ms-3 me-3 mt-2">
                                <span className="material-icons">preview</span>
                                View
                              </li>
                            </NavLink>
                            <li
                              onClick={(e) => deleteDashboard(e, i.id)}
                              className="ms-3 me-3 mt-3 mb-2"
                            >
                              <span className="material-icons">delete</span>
                              Delete
                            </li>
                          </div>
                        </div>
                      </div>
                      {i.chartCount && (
                        <label>{`Total chart: ${i.chartCount}`}</label>
                      )}
                    </div>
                  </NavLink>
                );
              })}
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default PrototypeDashView;
