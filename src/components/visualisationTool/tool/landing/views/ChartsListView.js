import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { ChartService } from "../../../../../services/chart.service";
import Notify from "../../../../../helpers/notify";

const ChartsListView = ({ dragZone }) => {
  const [data, setData] = useState();

  useEffect(() => {
    getAllCharts();
  }, []);

  const getAllCharts = () => {
    ChartService.getAllCharts().then((response) => {
      if (
        response.data.statusInfo &&
        response.data.statusInfo.statusCode === 200
      ) {
        setData(response.data.responseData);
      } else {
        Notify.error(
          response.data.statusInfo && response.data.statusInfo.errorMessage
        );
      }
    });
  };

  const searchChartFromList = () => {
    var input, filter, ul, li, i, txtValue;
    input = document.getElementById("allChartsSearch");
    filter = input.value.toUpperCase();
    ul = document.getElementById("allCharts");
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
    <div className="p-2 pt-5">
      <div className="mt-4">
        <input
          type="text"
          className="custom-input-type-1 custom-input-search-1"
          placeholder="Search"
          id="allChartsSearch"
          onKeyUp={searchChartFromList}
          autoComplete="off"
        />
      </div>
      <div className="mt-2 curated-height-1">
        <div id="allCharts">
          {data &&
            data !== null &&
            data.map((i, j) => {
              if (i.chartType !== "") {
                return (
                  <div aria-label={i.title !== "" ? i.title : "Untitled"} className="mb-2">
                    <div className="preview-title-1 pt-3 mb-1">
                      {i.title !== "" ? i.title : "Untitled"}
                    </div>
                    <img
                      src={i.image}
                      alt="chart thumbnail"
                      className="img-fluid img-thumbnail"
                      draggable="true"
                      onDragStart={(e) => dragZone(e, i)}
                    />
                  </div>
                );
              }
              return null;
            })}
        </div>

        {/* Empty state */}
        {(!data || data === null || data.length === 0) && (
          <React.Fragment>
            <center className="empty-style-1">
              <img
                src="/icons/undraw_Pie_chart_re_bgs8.svg"
                alt="chart list empty"
                className="mt-5 me-5 mb-4"
              />
              <p>No data found</p>
              <label>Please create visualisation</label>
              <br />
              <NavLink to="/tool">
                <button type="button" className="btn primary-btn-3 mt-3">
                  New visualization
                </button>
              </NavLink>
            </center>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default ChartsListView;
