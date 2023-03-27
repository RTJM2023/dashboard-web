import React, { Component } from "react";
import BrandNavBar from "./components/common/BrandNavBar";
import HeaderNavBar from "./components/common/HeaderNavBar";
import WidgetNavBar from "./components/common/WidgetNavBar";
import FilterNavBar from "./components/common/FilterNavBar";
import PropTypes from "prop-types";
import PageLayout from "./components/common/PageLayout";
import { DashboardService } from "../../services/dashboard.service";
import _ from "lodash";

/**
 * Dashboard component
 */

class Dashboard extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };

  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      dashboardConfigData: [],
      selectedTab: "",
      trigger: false,
      colorTrigger: true,
      toggle: "false",
      showFilters: "false",
    };
  }

  componentDidMount() {
    this._isMounted = true;
    window.addEventListener("scroll", this.handleScroll);

    if (localStorage.getItem("currentDashId")) {
      DashboardService.getConfig().then(
        (response) => {
          this.setState(
            (prevState) => ({
              ...prevState,
              dashboardConfigData: response.responseData,
            }),
            () => {
              if (this.state.dashboardConfigData[0]) {
                localStorage.setItem(
                  "customFilters",
                  JSON.stringify(this.state.dashboardConfigData[0].filters)
                );
              }
            }
          );
        },
        (error) => {}
      );
    } else {
      setTimeout(
        () =>
          DashboardService.getConfig().then(
            (response) => {
              this.setState(
                (prevState) => ({
                  ...prevState,
                  dashboardConfigData: response.responseData,
                }),
                () => {
                  if (
                    this.state.dashboardConfigData &&
                    this.state.dashboardConfigData[0]
                  ) {
                    localStorage.setItem(
                      "customFilters",
                      JSON.stringify(this.state.dashboardConfigData[0].filters)
                    );
                  }
                }
              );
            },
            (error) => {}
          ),
        500
      );
    }
  }

  componentWillUnmount() {
    localStorage.removeItem("label");
    localStorage.removeItem("filterKey");
    localStorage.removeItem("customFilters");
    localStorage.removeItem("customFiltersConfigUnitKey");
    localStorage.removeItem("customFiltersConfigFirstFilter");
    localStorage.removeItem("customFiltersConfigCountryKey");
    localStorage.removeItem("customFiltersConfigSecondFilter");
    localStorage.removeItem("customFiltersConfigThirdFilter");
    localStorage.removeItem("customFiltersConfigThirdKey");
    this._isMounted = false;
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    let item = document.getElementById("filterBar");
    let sticky = item.offsetTop;

    if (window.pageYOffset > sticky) {
      item.classList.add("sticky-bar");
    } else {
      item.classList.remove("sticky-bar");
    }
  };

  UNSAFE_componentWillReceiveProps(prevProps) {
    if (prevProps.history.location.state) {
      if (prevProps.history.location.state.trigger === true) {
        this.setState({
          trigger: true,
        });
        if (this.state.trigger) {
          this.setState({
            trigger: false,
          });
        }
      }
    }
  }

  renderCharts = () => {
    let { dashboardConfigData } = this.state;
    let tabsInitData = _.chain(dashboardConfigData)
      .first()
      .get("visualizations")
      .groupBy("name")
      .value();
    return (
      <div>
        {_.map(tabsInitData, (k, v) => {
          return (
            <PageLayout
              key={v}
              chartRowData={k}
              row={k.row}
              pathName={this.props}
            />
          );
        })}
      </div>
    );
  };

  getToggleData = () => {
    if (this.state.toggle === "false") {
      this.setState(
        {
          toggle: "true",
        },
        () => {
          this.props.history.push({
            pathname: "/reportsDashboard",
            state: { trigger: this.state.trigger, toggle: this.state.toggle },
          });
        }
      );
    } else {
      this.setState(
        {
          toggle: "false",
        },
        () => {
          this.props.history.push({
            pathname: "/dashboards",
            state: { trigger: this.state.trigger, toggle: this.state.toggle },
          });
        }
      );
    }
  };

  getToggleFilterData = (value) => {
    this.setState({
      showFilters: value,
    });
  };

  render() {
    return (
      <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12 body-background h-100 height-min">
        <div className="row p-0 m-0">
          <BrandNavBar />
          <HeaderNavBar pathName={this.props} history={this.props.history} />
          <FilterNavBar
            pathName={this.props}
            toggleData={this.getToggleData}
            toggleState={this.state.toggle}
            filterState={this.state.showFilters}
            toggleDataTwo={this.getToggleFilterData}
          />
          <WidgetNavBar history={this.props.history} pathName={this.props} />
        </div>
        <div className="tabText visualization-layout">
          <div className="mt-4 ps-3 pe-3">
            {!this.state.trigger &&
              this.state.dashboardConfigData &&
              this.state.dashboardConfigData.length &&
              this.renderCharts()}
            {this.state.trigger &&
              this.state.dashboardConfigData &&
              this.state.dashboardConfigData.length &&
              this.renderCharts()}
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
