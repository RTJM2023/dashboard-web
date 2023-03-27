import React, { Component } from "react";

/**
 * Brand Navbar Component
 * Holds the brand logo
 */

class BrandNavBar extends Component {
  render() {
    return (
      <nav className="navbar header-navbar-1 col-sm-12 col-md-2 col-lg-2 col-xl-2 col-xxl-2 p-0">
        <div className="" style={{ margin: "0 auto" }}>
          <img src="/img/iGOT_logo_light.svg" alt="brand" />
        </div>
      </nav>
    );
  }
}

export default BrandNavBar;
