import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useLocation } from "react-router-dom";
import Notify from "../../../../../helpers/notify";
import DashboardPrototypeEditView from "./DashboardPrototypeEditView";
import { NavLink } from "react-router-dom";
import { PrototypeService } from "../../../../../services/prototype.service";
import * as moment from "moment";
import { withRouter } from "react-router";

const DashboardPrototypeView = ({
  dropZone,
  allowDropZone,
  chartData,
  positionDetails,
  history,
}) => {
  const [rowLayout, setRowLayout] = useState([]);
  const [selectedCol, setSelectedCol] = useState(2);
  const [dashboards, setDashboards] = useState([]);
  const [dashHeaders, setDashHeaders] = useState();
  const [dashboardList, setDashboardList] = useState();
  const [editView, setEditView] = useState(false);
  const [shareURL, setShareURL] = useState();
  let location = useLocation();

  useEffect(() => {
    getDashboardById(location.state);

    if (document.getElementById("dashboardTitle")) {
      document.getElementById("dashboardTitle").select();
    }

    if (location && location.state) {
      if (location.state.dashId !== 0) {
        let shareURL =
          window.env.REACT_APP_PMDASH_PROTOTYPE_URL + location.state.dashId;
        setShareURL(shareURL);
      } else if (dashboards && dashboards.id) {
        let shareURL =
          window.env.REACT_APP_PMDASH_PROTOTYPE_URL + dashboards.id;
        setShareURL(shareURL);
      } else {
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let layoutOptions = [
      {
        id: 0,
        rowDetails: [
          {
            id: 0,
            title: "",
            description: "",
            data: [],
          },
          {
            id: 1,
            title: "",
            description: "",
            data: [],
          },
        ],
      },
    ];

    let dashboards;

    if (location.state && location.state.isNew) {
      let data = {
        id: moment().valueOf(),
        title: "",
        description: "",
        layout: layoutOptions,
      };

      dashboards = data;
    } else {
      dashboards = dashboardList;
    }

    if (dashboards) {
      setDashboards(dashboards);
      let headers = {
        title: dashboards.title,
        description: dashboards.description,
      };
      setDashHeaders(headers);
      setRowLayout(dashboards.layout ? dashboards.layout : layoutOptions);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dashboardList]);

  const getDashboardById = (idDetails) => {
    if (idDetails && idDetails.dashId) {
      PrototypeService.getDashboardById(idDetails.dashId).then((response) => {
        if (
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
    }
  };

  const addNewRow = (e) => {
    e.preventDefault();

    let tempArr = [...rowLayout];

    let rowDetails = {
      id: rowLayout[rowLayout.length - 1].id + 1,
      rowDetails: [
        {
          id: 0,
          title: "",
          description: "",
          data: [],
        },
        {
          id: 1,
          title: "",
          description: "",
          data: [],
        },
      ],
    };

    tempArr.push(rowDetails);

    setRowLayout(tempArr);
  };

  useEffect(() => {
    let tempArr = [...rowLayout];
    if (positionDetails !== null && positionDetails) {
      tempArr.map((i, j) => {
        if (i.rowDetails.length === 3) {
          if (i.rowDetails[0].id !== 0) {
            i.rowDetails[0].id = 0;
          }

          if (i.rowDetails[1].id !== 1) {
            i.rowDetails[1].id = 1;
          }

          if (i.rowDetails[2].id !== 2) {
            i.rowDetails[2].id = 2;
          }
        }

        if (i.rowDetails.length === 2) {
          if (i.rowDetails[0].id !== 0) {
            i.rowDetails[0].id = 0;
          }

          if (i.rowDetails[1].id !== 1) {
            i.rowDetails[1].id = 1;
          }
        }

        if (i.rowDetails.length === 1) {
          if (i.rowDetails[0].id !== 0) {
            i.rowDetails[0].id = 0;
          }
        }

        if (
          i.id === positionDetails.row &&
          i.rowDetails[positionDetails.position]
        ) {
          i.rowDetails[positionDetails.position].id = positionDetails.position;
          i.rowDetails[positionDetails.position].title = "";
          i.rowDetails[positionDetails.position].description = "";
          i.rowDetails[positionDetails.position].data = chartData;
        }

        return null;
      });

      setRowLayout(tempArr);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [positionDetails]);

  const deleteChartArea = (e, data) => {
    e.preventDefault();

    let tempArr = [...rowLayout];

    tempArr.map((i, j) => {
      if (i.id === data.row) {
        i.rowDetails.map((m, n) => {
          if (m.id === data.id) {
            i.rowDetails.splice(n, 1);
          }
          return null;
        });
      }
      return null;
    });

    setRowLayout(tempArr);
  };

  const deleteChartRow = (e, data) => {
    e.preventDefault();

    let tempArr = [...rowLayout];

    tempArr.map((i, j) => {
      if (i.id === data.row) {
        tempArr.splice(j, 1);
      }
      return null;
    });

    setRowLayout(tempArr);
  };

  const changeLayout = (e, col, rowId) => {
    e.preventDefault();
    setSelectedCol(col);

    let tempArr = [...rowLayout];

    let chartArea = {
      id: "",
      title: "",
      description: "",
      data: [],
    };

    let chartArea2 = {
      id: "",
      title: "",
      description: "",
      data: [],
    };

    tempArr.map((i, j) => {
      if (i.id === rowId && i.rowDetails.length !== col) {
        if (col === 3) {
          if (i.rowDetails.length === 2) {
            if (i.rowDetails[0].id !== 0) {
              i.rowDetails[0].id = 0;
            }

            if (i.rowDetails[1].id !== 1) {
              i.rowDetails[1].id = 1;
            }

            chartArea.id = i.rowDetails[i.rowDetails.length - 1].id + 1;
            i.rowDetails.push(chartArea);
          } else {
            if (i.rowDetails.length === 1) {
              chartArea.id = i.rowDetails[i.rowDetails.length - 1].id + 1;
              i.rowDetails.push(chartArea);

              chartArea2.id = chartArea.id + 1;
              i.rowDetails.push(chartArea2);
            }

            if (i.rowDetails[0] && i.rowDetails[0].id !== 0) {
              i.rowDetails[0].id = 0;
            }

            if (i.rowDetails[1] && i.rowDetails[1].id !== 1) {
              i.rowDetails[1].id = 1;
            }

            if (i.rowDetails[2] && i.rowDetails[2].id !== 2) {
              i.rowDetails[2].id = 2;
            }
          }
        } else if (col === 2) {
          if (i.rowDetails.length < 2) {
            if (i.rowDetails[0] && i.rowDetails[0].id !== 0) {
              i.rowDetails[0].id = 0;
            }

            if (i.rowDetails[1] && i.rowDetails[1].id !== 1) {
              i.rowDetails[1].id = 1;
            }

            chartArea.id = i.rowDetails[i.rowDetails.length - 1].id + 1;
            i.rowDetails.push(chartArea);
          } else {
            if (i.rowDetails[0] && i.rowDetails[0].id !== 0) {
              i.rowDetails[0].id = 0;
            }

            if (i.rowDetails[1] && i.rowDetails[1].id !== 1) {
              i.rowDetails[1].id = 1;
            }

            i.rowDetails.pop();
          }
        } else {
          if (i.rowDetails[0] && i.rowDetails[0].id !== 0) {
            i.rowDetails[0].id = 0;
          }

          i.rowDetails.splice(1, 2);
        }
      }
      return null;
    });

    setRowLayout(tempArr);
  };

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const dragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const items = reorder(
      rowLayout,
      result.source.index,
      result.destination.index
    );
    setRowLayout(items);
  };

  const horizontalDragEnd = (result, rowId) => {
    if (!result.destination) {
      return;
    }

    let tempArr = [...rowLayout];

    let arryToOrder = [];

    tempArr.map((i, j) => {
      if (i.id === rowId) {
        arryToOrder.push(i);
      }
      return null;
    });

    const items = reorder(
      arryToOrder[0].rowDetails,
      result.source.index,
      result.destination.index
    );

    tempArr.map((i, j) => {
      if (i.id === rowId) {
        i.rowDetails = items;
      }
      return null;
    });

    setRowLayout(tempArr);
  };

  const updateDashboardDetails = (e) => {
    e.preventDefault();

    let tempData = dashboards;

    if (location.state && tempData && e.target.name === "dashboardTitle") {
      tempData.title = e.target.value;
    }

    if (location.state && tempData && e.target.name === "dashboardSubTitle") {
      tempData.description = e.target.value;
    }

    setDashboards(tempData);
  };

  const saveDashboard = (e) => {
    e.preventDefault();

    let tempArr = dashboards;
    let count = 0;

    tempArr &&
      tempArr.layout.map((m, n) => {
        count = count + m.rowDetails.length;
        return null;
      });
    tempArr["chartCount"] = count;

    setDashboards(tempArr);

    PrototypeService.saveUserDashboard(tempArr).then((response) => {
      if (
        response &&
        response.data.statusInfo &&
        response.data.statusInfo.statusCode === 200
      ) {
        Notify.dark("!Dashboard saved");
        if (!editView) {
          setEditView(true);
        }
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

  const editConfig = (e) => {
    e.preventDefault();

    if (dashHeaders) {
      if (dashHeaders.title === "" && dashHeaders.description === "") {
        let headers = {
          title: dashboards.title,
          description: dashboards.description,
        };
        setDashHeaders(headers);
      }
    }

    setEditView(false);
  };

  useEffect(() => {
    if (location.state) {
      let tempData = dashboards;

      if (tempData && tempData.length !== 0) {
        tempData.layout = rowLayout;
        setDashboards(tempData);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowLayout, location.state]);

  const sharePrototype = (e) => {
    e.preventDefault();
    if (location && location.state) {
      if (location.state.dashId !== 0) {
        let shareURL =
          window.env.REACT_APP_PMDASH_PROTOTYPE_URL + location.state.dashId;
        navigator.clipboard.writeText(shareURL);
        Notify.dark("!Shareable link copied");
      } else if (dashboards && dashboards.id) {
        let shareURL =
          window.env.REACT_APP_PMDASH_PROTOTYPE_URL + dashboards.id;
        navigator.clipboard.writeText(shareURL);
        Notify.dark("!Shareable link copied");
      } else {
        Notify.info("Kindly save this dashboard");
      }
    }
  };

  const deleteDashboard = (e) => {
    e.preventDefault();

    if (dashboards.id) {
      PrototypeService.deleteDashboardById(dashboards.id).then((response) => {
        if (
          response &&
          response.data.statusInfo &&
          response.data.statusInfo.statusCode === 200
        ) {
          setTimeout(() => {
            Notify.dark("!Dashboard deleted");
            history.push("/prototypeHome");
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
    }
  };

  return (
    <div className="ms-2 me-2 pt-5">
      {/* Dashboard navigations and controls */}
      <div className="clearfix mt-4 me-3 pb-1">
        <div className="float-start">
          <NavLink to="/prototypeHome">
            <div className="navigation-style-1 mt-2">
              <span className="material-icons cursor-style-1">arrow_back</span>
              <label className="ms-2 cursor-style-1">Back to dashboards</label>
            </div>
          </NavLink>
        </div>
        <div className="float-end">
          <button
            type="button"
            className="btn del-btn-1 me-4"
            title="Share dashboard prototype"
            onClick={(e) => deleteDashboard(e)}
          >
            <span className="material-icons">delete</span>
            Delete
          </button>
          <button
            type="button"
            className="btn secondary-btn-2 me-4"
            title="Share dashboard prototype"
            id="shareDD1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Share
          </button>

          <div className="dropdown-menu w-25" aria-labelledby="shareDD1">
            <div className="container pt-2 pb-2">
              <div className="row me-1">
                <div className="col-sm-10 col-md-9 col-lg-10 col-xl-11 col-xxl-11">
                  <input
                    type="text"
                    className="share-view-dd-1 w-100"
                    defaultValue={shareURL}
                    readOnly
                  />
                </div>
                <div className="col-sm-2 col-md-3 col-lg-2 col-xl-1 col-xxl-1">
                  <span
                    className="material-icons copy-icon-1"
                    onClick={sharePrototype}
                  >
                    content_copy
                  </span>
                </div>
              </div>
            </div>
          </div>

          {!editView && (
            <button
              type="button"
              className="btn primary-btn-4"
              title="Save dashboard"
              onClick={saveDashboard}
            >
              Save
            </button>
          )}
          {editView && (
            <button
              type="button"
              className="btn primary-btn-4"
              title="Edit dashboard"
              onClick={editConfig}
            >
              Edit
            </button>
          )}
        </div>
      </div>

      <div className="curated-height-2">
        {/* Editor */}
        {/* Input headers */}
        {!editView && (
          <div className="row mt-4">
            <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 col-xxl-3">
              <label className="label-style-2 pb-2">Dashboard title</label>
              <input
                type="text"
                className="custom-input-type-1"
                id="dashboardTitle"
                name="dashboardTitle"
                placeholder="Untitled"
                onChange={updateDashboardDetails}
                defaultValue={dashHeaders && dashHeaders.title}
                autoComplete="off"
              />
            </div>
            <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 col-xxl-3">
              <label className="label-style-2 pb-2">Subtitle</label>
              <input
                type="text"
                className="custom-input-type-1"
                name="dashboardSubTitle"
                onChange={updateDashboardDetails}
                defaultValue={dashHeaders && dashHeaders.description}
                placeholder="Short description"
                autoComplete="off"
              />
            </div>
          </div>
        )}

        {/* Row layout - Create*/}
        {!editView && (
          <DragDropContext onDragEnd={dragEnd}>
            {rowLayout &&
              rowLayout.map((i, j) => (
                <Droppable droppableId={`droppable-${i.id}`}>
                  {(provided, snapshot) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      <Draggable
                        key={i.id}
                        draggableId={i.id.toString()}
                        index={j}
                      >
                        {(provided, snapshot) => (
                          <div
                            className="row-layout-1 mt-4"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                          >
                            {/* Layout controls */}
                            <div className="clearfix">
                              <div className="float-start mt-3 ms-4">
                                <button
                                  type="button"
                                  className={`btn ${
                                    (selectedCol && i.rowDetails.length) === 1
                                      ? "layout-ctl-active-1 one-col-active-1"
                                      : "layout-ctl-1 one-col-1"
                                  }`}
                                  onClick={(e) => {
                                    changeLayout(e, 1, i.id);
                                  }}
                                ></button>
                                <button
                                  type="button"
                                  className={`btn ${
                                    (selectedCol && i.rowDetails.length) === 2
                                      ? "layout-ctl-active-1 two-col-active-1"
                                      : "layout-ctl-1 two-col-1"
                                  }`}
                                  onClick={(e) => {
                                    changeLayout(e, 2, i.id);
                                  }}
                                ></button>
                                <button
                                  type="button"
                                  className={`btn ${
                                    (selectedCol && i.rowDetails.length) === 3
                                      ? "layout-ctl-active-1 three-col-active-1"
                                      : "layout-ctl-1 three-col-1"
                                  }`}
                                  onClick={(e) => {
                                    changeLayout(e, 3, i.id);
                                  }}
                                ></button>
                              </div>
                              <div className="float-end mt-2">
                                {rowLayout && rowLayout.length <= 1 && (
                                  <React.Fragment>
                                    <div className="material-icons layout-ctl-disabled-2 cursor-style-1 mt-3 me-3">
                                      delete
                                    </div>
                                    <div
                                      className="material-icons layout-ctl-disabled-2 cursor-style-2 mt-3 me-3"
                                      {...provided.dragHandleProps}
                                    >
                                      drag_indicator
                                    </div>
                                  </React.Fragment>
                                )}
                                {rowLayout && rowLayout.length > 1 && (
                                  <React.Fragment>
                                    <div
                                      className="material-icons layout-ctl-2 cursor-style-1 mt-3"
                                      onClick={(e) => {
                                        deleteChartRow(e, { row: i.id });
                                      }}
                                    >
                                      delete
                                    </div>
                                    <div
                                      className="material-icons layout-ctl-2 cursor-style-2 mt-3"
                                      {...provided.dragHandleProps}
                                    >
                                      drag_indicator
                                    </div>
                                  </React.Fragment>
                                )}
                              </div>
                            </div>
                            {/* Chart area */}
                            <DragDropContext
                              onDragEnd={(e) => horizontalDragEnd(e, i.id)}
                            >
                              <Droppable
                                droppableId="colDroppable"
                                direction="horizontal"
                              >
                                {(provided, snapshot) => (
                                  <div
                                    className="row"
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                  >
                                    {i.rowDetails.map((m, n) => (
                                      <Draggable
                                        key={m.id}
                                        draggableId={m.id.toString()}
                                        index={n}
                                      >
                                        {(provided, snapshot) => (
                                          <React.Fragment>
                                            {i.rowDetails.length === 1 && (
                                              <div
                                                className="col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12"
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                              >
                                                <div className="chart-drop-area-1 mt-4 ms-4 me-4">
                                                  <span
                                                    className="material-icons d-flex justify-content-end me-3 mt-3 mb-3 chart-area-btn-1 cursor-style-2"
                                                    title="Drag chart area"
                                                    {...provided.dragHandleProps}
                                                  >
                                                    drag_indicator
                                                  </span>
                                                  {m.data.length !== 0 &&
                                                    m.data.chartType !== "" &&
                                                    m.data.image && (
                                                      <center>
                                                        <img
                                                          src={m.data.image}
                                                          alt="chart thumbnail"
                                                          className="img-fluid img-tb-preview-2"
                                                        />
                                                      </center>
                                                    )}
                                                  {m.data.length === 0 && (
                                                    <div className="empty-style-1 pt-2">
                                                      <center>
                                                        <img
                                                          src="/icons/Empty_icon.svg"
                                                          alt="no visualisations"
                                                          className="pb-3"
                                                          onDrop={dropZone}
                                                          onDragOver={
                                                            allowDropZone
                                                          }
                                                          id={`row-${i.id}-col-${n}`}
                                                        />
                                                      </center>
                                                      <center>
                                                        <label>
                                                          Drag a chart here
                                                        </label>
                                                      </center>
                                                    </div>
                                                  )}
                                                </div>
                                              </div>
                                            )}
                                            {i.rowDetails.length === 2 && (
                                              <div
                                                className="col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6"
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                              >
                                                <div
                                                  className={`chart-drop-area-1 mt-4 ${
                                                    n ===
                                                    i.rowDetails.length - 1
                                                      ? "me-4"
                                                      : "ms-4"
                                                  }`}
                                                >
                                                  <span
                                                    className="material-icons d-flex justify-content-end me-3 mt-3 mb-3 chart-area-btn-1 cursor-style-2"
                                                    title="Drag chart area"
                                                    {...provided.dragHandleProps}
                                                  >
                                                    drag_indicator
                                                  </span>
                                                  <span
                                                    className="material-icons d-flex justify-content-end me-3 mt-3 mb-3 chart-area-btn-1 cursor-style-1"
                                                    title="Delete"
                                                    onClick={(e) =>
                                                      deleteChartArea(e, {
                                                        row: i.id,
                                                        id: m.id,
                                                      })
                                                    }
                                                    {...provided.dragHandleProps}
                                                  >
                                                    delete
                                                  </span>
                                                  {m.data.length !== 0 &&
                                                    m.data.chartType !== "" &&
                                                    m.data.image && (
                                                      <center>
                                                        <img
                                                          src={m.data.image}
                                                          alt="chart thumbnail"
                                                          className="img-fluid img-tb-preview-1"
                                                        />
                                                      </center>
                                                    )}
                                                  {m.data.length === 0 && (
                                                    <div className="empty-style-1 pull-up-3">
                                                      <center>
                                                        <img
                                                          onDrop={dropZone}
                                                          onDragOver={
                                                            allowDropZone
                                                          }
                                                          id={`row-${i.id}-col-${n}`}
                                                          src="/icons/Empty_icon.svg"
                                                          alt="no visualisations"
                                                          className="pb-3"
                                                        />
                                                      </center>
                                                      <center>
                                                        <label>
                                                          Drag a chart here
                                                        </label>
                                                      </center>
                                                    </div>
                                                  )}
                                                </div>
                                              </div>
                                            )}
                                            {i.rowDetails.length === 3 && (
                                              <div
                                                className="col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4"
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                              >
                                                <div
                                                  className={`chart-drop-area-1 mt-4 ${
                                                    n ===
                                                    i.rowDetails.length - 1
                                                      ? "me-4"
                                                      : n === 1
                                                      ? "ms-2"
                                                      : "ms-4"
                                                  }`}
                                                >
                                                  <span
                                                    className="material-icons d-flex justify-content-end me-3 mt-3 mb-3 chart-area-btn-1 cursor-style-2"
                                                    title="Drag chart area"
                                                    {...provided.dragHandleProps}
                                                  >
                                                    drag_indicator
                                                  </span>
                                                  <span
                                                    className="material-icons d-flex justify-content-end me-3 mt-3 mb-3 chart-area-btn-1 cursor-style-1"
                                                    title="Delete"
                                                    onClick={(e) =>
                                                      deleteChartArea(e, {
                                                        row: i.id,
                                                        id: m.id,
                                                      })
                                                    }
                                                    {...provided.dragHandleProps}
                                                  >
                                                    delete
                                                  </span>
                                                  {m.data.length !== 0 &&
                                                    m.data.chartType !== "" &&
                                                    m.data.image && (
                                                      <center>
                                                        <img
                                                          src={m.data.image}
                                                          alt="chart thumbnail"
                                                          className="img-fluid img-tb-preview-1"
                                                        />
                                                      </center>
                                                    )}
                                                  {m.data.length === 0 && (
                                                    <div className="empty-style-1 pull-up-3">
                                                      <center>
                                                        <img
                                                          onDrop={dropZone}
                                                          onDragOver={
                                                            allowDropZone
                                                          }
                                                          id={`row-${i.id}-col-${n}`}
                                                          src="/icons/Empty_icon.svg"
                                                          alt="no visualisations"
                                                          className="pb-3"
                                                        />
                                                      </center>
                                                      <center>
                                                        <label>
                                                          Drag a chart here
                                                        </label>
                                                      </center>
                                                    </div>
                                                  )}
                                                </div>
                                              </div>
                                            )}
                                          </React.Fragment>
                                        )}
                                      </Draggable>
                                    ))}
                                    {provided.placeholder}
                                  </div>
                                )}
                              </Droppable>
                            </DragDropContext>
                          </div>
                        )}
                      </Draggable>
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              ))}
          </DragDropContext>
        )}

        {/* Add new row */}
        {!editView && (
          <button
            type="button"
            className="btn row-btn-1 w-100 mt-4 mb-3"
            onClick={(e) => {
              addNewRow(e);
            }}
          >
            <span className="material-icons me-2">add</span>
            New row
          </button>
        )}

        {/* Editview */}
        {editView && (
          <DashboardPrototypeEditView currenDashboard={dashboards} />
        )}
      </div>
    </div>
  );
};

export default withRouter(DashboardPrototypeView);
