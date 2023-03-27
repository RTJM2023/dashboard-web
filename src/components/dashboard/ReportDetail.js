import React, { Component } from "react";
import PropTypes from "prop-types";
import { ReportService } from "../../services/report.service";
import PageLayout from "./components/common/PageLayout";
import _ from "lodash";
import BrandNavBar from "./components/common/BrandNavBar";
import HeaderNavBar from "./components/common/HeaderNavBar";
import FilterNavBar from "./components/common/FilterNavBar";

/**
 * Report Detail component
 */

class ReportDetail extends Component {
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
      showReportDetail: "false",
    };
  }

  componentDidMount() {
    this._isMounted = true;
    window.addEventListener("scroll", this.handleScroll);

    if (this.props.location && this.props.location.state) {
      ReportService.getConfigByID(this.props.location.state.id).then(
        (response) => {
          this.setState(
            (prevState) => ({
              ...prevState,
              dashboardConfigData: response.responseData,
            }),
            () =>
              localStorage.setItem(
                "customFilters",
                JSON.stringify(this.state.dashboardConfigData[0].filters)
              )
          );
        },
        (error) => {}
      );
    } else {
      setTimeout(
        () =>
          ReportService.getConfig().then(
            (response) => {
              this.setState(
                (prevState) => ({
                  ...prevState,
                  dashboardConfigData: response.responseData,
                }),
                () =>
                  localStorage.setItem(
                    "customFilters",
                    JSON.stringify(this.state.dashboardConfigData[0].filters)
                  )
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
    if (prevProps.history && prevProps.history.location.state) {
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

  getToggleData = (value) => {
    if (this.state.toggle === "false" && !value) {
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

  getToggleReports = () => {
    if (this.state.showReportDetail === "false") {
      this.setState(
        {
          showReportDetail: "true",
        },
        () => {
          this.props.history.push({
            pathname: "/dashboards",
            state: { trigger: this.state.trigger, toggle: this.state.toggle },
          });
          // this.props.toggleData(this.state.showReportDetail);
          // console.log("Report Toggle Data: " + this.state.showReportDetail);
        }
      );
    } else {
      this.setState(
        {
          showReportDetail: "false",
        },
        () => {
          // this.props.toggleData(this.state.showReportDetail);
          // console.log("Report Toggle Data: " + this.state.showReportDetail);
        }
      );
    }
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
            toggleState={"true"}
            filterState={"true"}
            toggleDataTwo={this.getToggleReports}
          />
        </div>

        <div className="d-flex flex-row ms-4 mt-4">
          <p
            className="breadcrumb underline-bc"
            onClick={() => {
              this.props.history.push({
                pathname: "/reportsDashboard",
                state: {
                  trigger: this.state.trigger,
                  toggle: this.state.toggle,
                },
              });
            }}
          >
            Reports
          </p>

          <p className="breadcrumb ms-0 me-0">
            <span className="material-icons navigate-icon">navigate_next</span>
          </p>
          <p className="breadcrumb">
            {this.props.location.state.name ||
              localStorage.getItem("reportName")}
          </p>
        </div>

        <div className="tabText visualization-layout">
          <div className="mt-2 ps-3 pe-3">
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

export default ReportDetail;
