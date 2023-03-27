import React, { useState } from "react";
import LeftSideView from "../views/LeftSideView";
import RightSideView from "../views/RightSideView";

const LandingContainer = () => {
  const [propsData, setPropsData] = useState();
  const [chartData, setChartData] = useState();
  const [headerData, setHeaderData] = useState();
  const [showLegend, setShowLegend] = useState(false);
  const [showInsights, setShowInsights] = useState(false);
  const [showGrid, setShowGrid] = useState(false);

  const getProps = (props) => {
    setPropsData(props);
  };

  const getChartData = (data) => {
    setChartData(data);
  };

  const getHeaderData = (data) => {
    setHeaderData(data);
  };

  const getShowLegend = (data) => {
    setShowLegend(data);
  };

  const getShowInsights = (data) => {
    setShowInsights(data);
  };

  const getShowGrid = (data) => {
    setShowGrid(data);
  };

  return (
    <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
      {/* Landing view */}
      <div className="row p-0 m-0">
        <div
          className="col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6"
          id="leftSide"
        >
          <LeftSideView
            props={getProps}
            chartData={getChartData}
            headerData={getHeaderData}
            showLegend={getShowLegend}
            showInsights={getShowInsights}
            showGrid={getShowGrid}
          />
        </div>
        <div
          className="col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6"
          id="rightSide"
        >
          <RightSideView
            props={getProps}
            data={propsData}
            chartData={chartData}
            headerData={headerData}
            showLegend={showLegend}
            showInsights={showInsights}
            showGrid={showGrid}
          />
        </div>
      </div>
    </div>
  );
};

export default LandingContainer;
