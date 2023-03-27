import React, { Component } from "react";
import LandingContainer from "../visualisationTool/tool/landing/containers/LandingContainer";
import BrandNavBar from "./components/common/BrandNavBar";
import HeaderNavBar from "./components/common/HeaderNavBar";

export default class ToolLanding extends Component {
  render() {
    return (
      <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12 body-background h-100 height-min">
        <div className="row p-0 m-0">
          <BrandNavBar />
          <HeaderNavBar pathName={this.props} history={this.props.history} />
        </div>
        <LandingContainer />
      </div>
    );
  }
}
