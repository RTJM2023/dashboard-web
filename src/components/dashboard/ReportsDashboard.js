import React, { Component } from "react";
import { ReportService } from "../../services/report.service";
import BrandNavBar from "./components/common/BrandNavBar";
import HeaderNavBar from "./components/common/HeaderNavBar";
import FilterNavBar from "./components/common/FilterNavBar";

/**
 * Reports Dashboard component
 */

class ReportsDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reportsList: [],
      showReportDetail: "false",
      toggle: "false",
      reportId: "",
      reportName: "",
    };
    this.getReportsForProfile = this.getReportsForProfile.bind(this);
    this.getToggleReports = this.getToggleReports.bind(this);
    this.getToggleData = this.getToggleData.bind(this);
  }

  componentDidMount() {
    this.getReportsForProfile();
  }

  // Get list of reports
  getReportsForProfile = () => {
    ReportService.getConfig().then((response) => {
      if (response && response.responseData) {
        this.setState({
          reportsList: response.responseData,
        });
      }
    });
  };

  getToggleReports = (value) => {
    if (this.state.showReportDetail === "false" && !value) {
      this.setState(
        {
          showReportDetail: "true",
        },
        () => {
          this.props.history.push({
            pathname: "/reportDetail",
            state: {
              trigger: this.state.trigger,
              toggle: this.state.toggle,
              id: this.state.reportId,
              name: this.state.reportName,
            },
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
            filterState={this.state.showReportDetail}
            toggleDataTwo={this.getToggleReports}
          />
        </div>
        <div className="col-md-12 mt-3">
          <center>
            <div className="row">
              {this.state.showReportDetail === "false" &&
                this.state.reportsList &&
                this.state.reportsList.map((i, j) => (
                  <div
                    className="col-xs-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 mt-4"
                    key={j}
                  >
                    <div
                      className="report-card p-4"
                      onClick={() => {
                        this.setState(
                          { reportId: i.id, reportName: i.name },
                          () => {
                            this.getToggleReports();
                            localStorage.setItem("reportName", this.state.reportName);
                          }
                        );
                      }}
                    >
                      <h4>{i.name}</h4>
                      <p>{i.description}</p>
                    </div>
                  </div>
                ))}
            </div>
          </center>
          {/* {this.state.showReportDetail === "true" && (
            <ReportDetail
              id={this.state.reportId}
              name={this.state.reportName}
              toggleFilter={this.getToggleReports}
            />
          )} */}
        </div>
      </div>
    );
  }
}

export default ReportsDashboard;
