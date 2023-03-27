import React from "react";
import PrototypeDashView from "../views/PrototypeDashView";
import PrototypeVisView from "../views/PrototypeVisView";

const PrototypeHomeContainer = () => {
  return (
    <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
      {/* Prototype home */}
      <div className="row p-0 m-0">
        {/* Visualisations */}
        <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 vis-home-1 full-height-1">
          <PrototypeVisView />
        </div>
        {/* Dashboards */}
        <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 vis-home-2 full-height-1">
          <PrototypeDashView />
        </div>
      </div>
    </div>
  );
};

export default PrototypeHomeContainer;
