import React, { useState } from "react";
import ChartsListView from "../views/ChartsListView";
import DashboardPrototypeView from "../views/DashboardPrototypeView";

const PrototypeContainer = () => {
  const [data, setData] = useState();
  const [positionDetails, setPositionDetails] = useState();

  const dragZone = (e, data) => {
    setData(data);
    e.dataTransfer.setData(data, e.target.id);
  };

  const allowDropZone = (e) => {
    e.preventDefault();
  };

  const dropZone = (e) => {
    e.preventDefault();

    let details = {
      row: parseInt(e.target.id.split("-")[1]),
      position: parseInt(e.target.id.split("-")[3]),
    };
  
    setPositionDetails(details);
  };

  return (
    <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
      {/* Prototype view */}
      <div className="row p-0 m-0">
        <div
          className="col-sm-12 col-md-2 col-lg-2 col-xl-2 col-xxl-2"
          id="leftSide"
        >
          <ChartsListView dragZone={dragZone} />
        </div>
        <div
          className="col-sm-12 col-md-10 col-lg-10 col-xl-10 col-xxl-10 prot-style-1"
          id=""
        >
          <DashboardPrototypeView
            dropZone={dropZone}
            allowDropZone={allowDropZone}
            chartData={data}
            positionDetails={positionDetails}
          />
        </div>
      </div>
    </div>
  );
};

export default PrototypeContainer;
