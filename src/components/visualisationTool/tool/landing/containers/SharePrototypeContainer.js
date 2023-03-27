import React from "react";
import SharePrototypeView from "../views/SharePrototypeView";
import { useLocation } from "react-router-dom";

const SharePrototypeContainer = () => {
  let location = useLocation();
  return (
    <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
      {/* Share prototype view */}
      <div className="mt-4 pt-1">
        <SharePrototypeView location={location} />
      </div>
    </div>
  );
};

export default SharePrototypeContainer;
