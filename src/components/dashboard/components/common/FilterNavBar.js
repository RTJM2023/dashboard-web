import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { DashboardService } from "../../../../services/dashboard.service";
import DateFilter from "./DateFilter";
import { MultipleDash } from "../../../../services/multipleDash.service";
// import { local } from "d3";

/* global $ */

/**
 * Filter Navbar Component
 * Holds all filters and multiple dashboards selections
 */

class FilterNavBar extends Component {
  _isMounted = false;
  container = React.createRef();

  constructor(props) {
    super(props);

    this.state = {
      dashboardConfigData: [],
      dashCount: "",
      dashboardList: [],
      searchList: [],
      searchFilterListOne: [],
      searchFilterListTwo: [],
      searchFilterListThree: [],
      showDropDownOne: false,
      showCustomFilterDD: false,
      filterFirstList: [],
      filterSecondList: [],
      filterThirdList: [],
      filterFirstName: "",
      filterSecondName: "",
      filterThirdName: "",
      selectedSecondFilter: "",
      selectedFirstFilter: "",
      selectedThirdFilter: "",
      customFilterFirstKey: [],
      customFilterSecondKey: [],
      customFilterThirdKey: [],
      // showDropDownTwo: false,
      showOne: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeOne = this.handleChangeOne.bind(this);
    this.handleChangeTwo = this.handleChangeTwo.bind(this);
    this.handleChangeThree = this.handleChangeThree.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
    this._isMounted = true;

    setTimeout(() => {
      let filterData = localStorage.getItem("customFilters");
      filterData = JSON.parse(filterData);

      // let name = filterData[0].values;
      if (filterData && filterData[0] !== undefined) {
        if (filterData.length === 3) {
          this.setState(
            {
              filterFirstName: filterData[0].name,
              filterSecondName: filterData[1].name,
              filterThirdName: filterData[2].name,
              filterFirstList: filterData[0].values,
              filterSecondList: filterData[1].values,
              filterThirdList: filterData[2].values,
              customFilterFirstKey: filterData[0].key,
              customFilterSecondKey: filterData[1].key,
              customFilterThirdKey: filterData[2].key,
            },
            () => {
              if (!localStorage.getItem("selectedState")) {
                localStorage.setItem(
                  "customFiltersConfigSecondFilter",
                  this.state.filterSecondList[0]
                );
                localStorage.setItem(
                  "customFiltersConfigFirstFilter",
                  this.state.filterFirstList[0]
                );
                localStorage.setItem(
                  "customFiltersConfigThirdFilter",
                  this.state.filterThirdList[0]
                );
                localStorage.setItem("customFiltersConfigCountryKey", "state");
                localStorage.setItem("flag", "On");
                localStorage.setItem(
                  "selectedState",
                  this.state.filterSecondList[0]
                );
              }
            }
          );
        } else if (filterData.length === 2) {
          this.setState(
            {
              filterFirstName: filterData[0].name,
              filterSecondName: filterData[1].name,
              filterFirstList: filterData[0].values,
              filterSecondList: filterData[1].values,
              customFilterFirstKey: filterData[0].key,
              customFilterSecondKey: filterData[1].key,
            },
            () => {
              if (!localStorage.getItem("selectedState")) {
                localStorage.setItem(
                  "customFiltersConfigSecondFilter",
                  this.state.filterSecondList[0]
                );
                localStorage.setItem(
                  "customFiltersConfigFirstFilter",
                  this.state.filterFirstList[0]
                );
                localStorage.setItem("customFiltersConfigCountryKey", "state");
                localStorage.setItem("flag", "On");
                localStorage.setItem(
                  "selectedState",
                  this.state.filterSecondList[0]
                );
              }
            }
          );
        } else {
          this.setState({
            filterFirstName: filterData[0].name,
            filterFirstList: filterData[0].values,
            customFilterFirstKey: filterData[0].key,
          });
        }
      }
    }, 1200);

    MultipleDash.getConfig().then(
      (response) => {
        this.setState(
          {
            dashCount: Object.keys(response.responseData).length,
            dashboardList: response.responseData,
          },
          () => {
            if (!localStorage.getItem("currentDashId")) {
              localStorage.setItem(
                "currentDashId",
                this.state.dashboardList[0].id
              );
              localStorage.setItem(
                "currentDashboard",
                this.state.dashboardList[0].name
              );

              DashboardService.getConfig().then(
                (response) => {
                  this.setState((prevState) => ({
                    ...prevState,
                    dashboardConfigData: response.responseData,
                  }));
                },
                (error) => {}
              );
            }
          }
        );
      },
      (error) => {}
    );
  }

  componentWillUnmount() {
    this._isMounted = false;
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleChange = (e) => {
    let currentList = [];
    let newList = [];
    if (e.target.value !== "") {
      this.state.dashboardList.map((list) => currentList.push(list));
      newList = currentList.filter((item) => {
        const lc = item.name.toLowerCase();
        const filter = e.target.value.toLowerCase();
        return lc.includes(filter);
      });
    } else {
      this.state.dashboardList.map((list) => newList.push(list));
    }

    this.setState({
      searchList: newList,
    });
  };

  handleChangeOne = (e) => {
    let currentList = [];
    let newList = [];
    if (e.target.value !== "") {
      this.state.filterFirstList.map((list) => currentList.push(list));
      newList = currentList.filter((item) => {
        const lc = item.toLowerCase();
        const filter = e.target.value.toLowerCase();
        return lc.includes(filter);
      });
    } else {
      this.state.filterFirstList.map((list) => newList.push(list));
    }

    this.setState({
      searchFilterListOne: newList,
    });
  };

  handleChangeTwo = (e) => {
    let currentList = [];
    let newList = [];
    if (e.target.value !== "") {
      this.state.filterSecondList.map((list) => currentList.push(list));
      newList = currentList.filter((item) => {
        const lc = item.toLowerCase();
        const filter = e.target.value.toLowerCase();
        return lc.includes(filter);
      });
    } else {
      this.state.filterSecondList.map((list) => newList.push(list));
    }

    this.setState({
      searchFilterListTwo: newList,
    });
  };

  handleChangeThree = (e) => {
    let currentList = [];
    let newList = [];
    if (e.target.value !== "") {
      this.state.filterThirdList.map((list) => currentList.push(list));
      newList = currentList.filter((item) => {
        const lc = item.toLowerCase();
        const filter = e.target.value.toLowerCase();
        return lc.includes(filter);
      });
    } else {
      this.state.filterThirdList.map((list) => newList.push(list));
    }

    this.setState({
      searchFilterListThree: newList,
    });
  };

  /**
   * Toggle function to show/hide the custom first filter
   */
  showFilterOne = () => {
    this.setState({
      showDropDownOne: true,
    });
  };

  /**
   * Toggle function to show/hide the custom second filter
   */
  showFilterTwo = () => {
    this.setState({
      showDropDownTwo: true,
    });
  };

  /**
   * Toggle function to show/hide the custom thrid filter
   */
  showFilterThree = () => {
    this.setState({
      showDropDownThree: true,
    });
  };

  /**
   * Toggle function to show/hide the custom date filters
   */
  showCustomFilters = () => {
    this.setState({
      showCustomFilterDD: true,
    });
  };

  /**
   * Function to close date dropdown
   * when the user clicks outside it
   */
  handleClickOutside = (event) => {
    if (
      this.container.current &&
      !this.container.current.contains(event.target)
    ) {
      this.setState({
        showDropDownOne: false,
        showDropDownTwo: false,
        showDropDownThree: false,
        showCustomFilterDD: false,
      });
    }
  };

  updateVisuals() {
    localStorage.removeItem("selectedState");
    this.setState({
      trigger: true,
      searchFilterListOne: [],
      searchFilterListTwo: [],
      searchFilterListThree: [],
    });
    setTimeout(() => {
      this.props.pathName.history.push({
        pathName: "/dashboards",
        state: { trigger: this.state.trigger },
      });
    }, 1000);
    // this.setState({
    //   trigger: false
    // })
    // setTimeout(() => {this.props.pathName.history.push({pathName: "/dashboards", state: {trigger: this.state.trigger}})}, 1500);
  }

  getFirstFilter(value) {
    this.setState(
      {
        selectedFirstFilter: value,
      },
      () => {
        this.setState(
          {
            showDropDownOne: false,
            showCustomFilterDD: false,
          },
          localStorage.setItem(
            "customFiltersConfigUnitKey",
            this.state.customFilterFirstKey
          ),
          localStorage.setItem(
            "customFiltersConfigFirstFilter",
            this.state.selectedFirstFilter
          )
        );
      }
    );
    this.updateVisuals();
  }

  getSecondFilter(value) {
    this.setState(
      {
        selectedSecondFilter: value,
      },
      () =>
        this.setState(
          {
            showDropDownTwo: false,
            showCustomFilterDD: false,
          },
          localStorage.setItem(
            "customFiltersConfigCountryKey",
            this.state.customFilterSecondKey
          ),
          localStorage.setItem(
            "customFiltersConfigSecondFilter",
            this.state.selectedSecondFilter
          )
        )
    );
    this.updateVisuals();
  }

  getThirdFilter(value) {
    this.setState(
      {
        selectedThirdFilter: value,
      },
      () =>
        this.setState(
          {
            showDropDownThree: false,
            showCustomFilterDD: false,
          },
          localStorage.setItem(
            "customFiltersConfigThirdKey",
            this.state.customFilterThirdKey
          ),
          localStorage.setItem(
            "customFiltersConfigThirdFilter",
            this.state.selectedThirdFilter
          )
        )
    );
    this.updateVisuals();
  }

  render() {
    $(document).ready(function () {
      $("#dashboardDropdown").on("show.bs.dropdown", function () {
        $(".dropdown-menu input").focus();
      });

      $("#dashboardDropdown").on("shown.bs.dropdown", function () {
        $(".dropdown-menu input").focus();
      });

      $("#dashboardDropdown").on("hide.bs.dropdown", function () {
        $(".dropdown-menu input").focus();
      });

      $("#dashboardDropdown").on("hidden.bs.dropdown", function () {
        $(".dropdown-menu input").focus();
      });
    });

    return (
      <div className="col-12 h-5-5 filter-bar" id="filterBar">
        <div className="row pl-3 pr-3 mt-2">
          {/* Dashboard selector */}
          <div className="dashboard-selector mt-2 pt-1 col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4">
            <div className="toggle-button ms-4">
              <div className="flex d-flex">
                <div
                  className="toggle-bg-left ms-3"
                  onClick={() => {
                    this.props.toggleData("true");
                    this.props.toggleDataTwo("false");
                  }}
                >
                  <span className="material-icons pt-2">insights</span>
                </div>
                <div
                  className="toggle-bg-right me-4 "
                  onClick={() => {
                    this.props.toggleData("false");
                    this.props.toggleDataTwo("false");
                  }}
                >
                  <span className="material-icons pt-2">article</span>
                </div>
              </div>

              <div
                className={`toggle-trigger-button ${
                  this.props.toggleState === "true" ? "" : "toggle-background-1"
                }`}
              >
                {this.props.toggleState === "true" ? (
                  <div className="btn-group custom-width-2">
                    <button
                      type="button"
                      className="btn custom-dropdown-button-2"
                    >
                      Reports
                    </button>
                  </div>
                ) : (
                  <div className="btn-group" style={{ marginTop: "-0.45rem" }}>
                    <button
                      type="button"
                      className="btn custom-dropdown-button custom-width-1-left"
                    >
                      {localStorage.getItem("currentDashboard") ||
                        "Select a dashboard"}
                    </button>
                    <button
                      type="button"
                      className="btn dropdown-toggle dropdown-toggle-split custom-dropdown-toggle custom-width-1-right"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <span className="sr-only">Toggle Dropdown</span>
                      <span className="me-3 custom-font-style-1">
                        {this.state.dashCount}
                      </span>
                    </button>

                    <div
                      className="dropdown-menu custom-dropdown-menu"
                      role="menu"
                    >
                      <input
                        type="text"
                        className="searchBox mb-4"
                        placeholder="Search..."
                        onChange={this.handleChange}
                      />
                      {this.state.searchList.map((list, index) => (
                        <NavLink
                          key={index}
                          exact
                          activeClassName=""
                          className="cursorStyleOne"
                          to=""
                          onClick={() => {
                            localStorage.setItem("currentDashId", list.id);
                            localStorage.setItem("currentDashboard", list.name);
                          }}
                        >
                          <ul
                            className={`${
                              localStorage.getItem("currentDashboard") ===
                              list.name
                                ? "active-dashboard"
                                : ""
                            }`}
                          >
                            {list.name}
                          </ul>
                        </NavLink>
                      ))}
                      {this.state.searchList.length < 1 &&
                        this.state.dashboardList.map((list, index) => (
                          <NavLink
                            key={index}
                            exact
                            activeClassName=""
                            className="cursorStyleOne"
                            to=""
                            onClick={() => {
                              localStorage.setItem("currentDashId", list.id);
                              localStorage.setItem(
                                "currentDashboard",
                                list.name
                              );
                            }}
                          >
                            <ul
                              className={`${
                                localStorage.getItem("currentDashboard") ===
                                list.name
                                  ? "active-dashboard"
                                  : ""
                              }`}
                            >
                              {list.name}
                            </ul>
                          </NavLink>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Custom filters */}
          {(this.props.toggleState === "false" ||
            this.props.filterState === "true") && (
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-8 col-xl-8 pb-3 pb-xs-0 pb-sm-0 pb-md-3 pb-lg-0 pb-xl-0">
              <div className="d-md-flex flex-row float-end me-1">
                {/* First filter */}
                {this.state.filterFirstName && !this.state.filterThirdName && (
                  <div className="mt-3">
                    <div className="btn-group custom-filter me-3">
                      <button type="button" className="btn">
                        <label
                          className="custom-font-style-3"
                          style={{ lineHeight: "0" }}
                        >
                          {this.state.filterFirstName}
                        </label>
                        <div className="vertical-separator"></div>
                      </button>
                      <button
                        type="button"
                        className="btn dropdown-toggle dropdown-toggle-split pe-3"
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <span className="sr-only">Toggle Dropdown</span>
                        <span className="custom-font-style-2">
                          {this.state.selectedFirstFilter ||
                            localStorage.getItem(
                              "customFiltersConfigFirstFilter"
                            ) ||
                            "All"}
                        </span>
                      </button>
                      <div className="dropdown-menu custom-dropdown-menu-sm">
                        <input
                          type="text"
                          id="inputToFocusThree"
                          className="searchBox mb-4"
                          placeholder="Search..."
                          onChange={this.handleChangeOne}
                          autoFocus
                        />
                        {this.state.searchFilterListOne.map((list, index) => (
                          <ul
                            key={index}
                            className={`cursorStyleOne ${
                              localStorage.getItem(
                                "customFiltersConfigFirstFilter"
                              ) === list
                                ? "active-dashboard"
                                : ""
                            }`}
                            onClick={() => this.getFirstFilter(list)}
                          >
                            {list}
                          </ul>
                        ))}
                        {this.state.searchFilterListOne.length < 1 &&
                          this.state.filterFirstList.map((list, index) => (
                            <ul
                              key={index}
                              className={` cursorStyleOne ${
                                localStorage.getItem(
                                  "customFiltersConfigFirstFilter"
                                ) === list
                                  ? "active-dashboard"
                                  : ""
                              }`}
                              onClick={() => this.getFirstFilter(list)}
                            >
                              {list}
                            </ul>
                          ))}
                      </div>

                      <div className="dropdown-menu custom-dropdown-menu-sm">
                        <input
                          type="text"
                          id="inputToFocusTwo"
                          className="searchBox mb-4"
                          placeholder="Search..."
                          onChange={this.handleChangeOne}
                          autoFocus
                        />
                        {this.state.searchFilterListOne.map((list, index) => (
                          <ul
                            key={index}
                            className={` cursorStyleOne ${
                              localStorage.getItem(
                                "customFiltersConfigFirstFilter"
                              ) === list
                                ? "active-dashboard"
                                : ""
                            }`}
                            onClick={() => this.getFirstFilter(list)}
                          >
                            {list}
                          </ul>
                        ))}
                        {this.state.searchFilterListOne.length < 1 &&
                          this.state.filterFirstList.map((list, index) => (
                            <ul
                              key={index}
                              className={` cursorStyleOne ${
                                localStorage.getItem(
                                  "customFiltersConfigFirstFilter"
                                ) === list
                                  ? "active-dashboard"
                                  : ""
                              }`}
                              onClick={() => this.getFirstFilter(list)}
                            >
                              {list}
                            </ul>
                          ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Second Filter */}
                {this.state.filterSecondName && !this.state.filterThirdName && (
                  <div className="mt-3">
                    <div className="btn-group custom-filter me-3">
                      <button type="button" className="btn">
                        <label
                          className="custom-font-style-3"
                          style={{ lineHeight: "0" }}
                        >
                          {this.state.filterSecondName}
                        </label>
                        <div className="vertical-separator"></div>
                      </button>
                      <button
                        type="button"
                        className="btn dropdown-toggle dropdown-toggle-split pe-3"
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <span className="sr-only">Toggle Dropdown</span>
                        <span className="custom-font-style-2">
                          {this.state.selectedSecondFilter ||
                            localStorage.getItem(
                              "customFiltersConfigSecondFilter"
                            ) ||
                            "All"}
                        </span>
                      </button>
                      <div className="dropdown-menu custom-dropdown-menu-sm">
                        <input
                          type="text"
                          id="inputToFocusOne"
                          className="searchBox mb-4"
                          placeholder="Search..."
                          onChange={this.handleChangeTwo}
                          autoFocus
                        />
                        {this.state.searchFilterListTwo.map((list, index) => (
                          <ul
                            key={index}
                            className={`cursorStyleOne ${
                              localStorage.getItem(
                                "customFiltersConfigSecondFilter"
                              ) === list
                                ? "active-dashboard"
                                : ""
                            }`}
                            onClick={() => this.getSecondFilter(list)}
                          >
                            {list}
                          </ul>
                        ))}
                        {this.state.searchFilterListTwo.length < 1 &&
                          this.state.filterSecondList.map((list, index) => (
                            <ul
                              key={index}
                              className={` cursorStyleOne ${
                                localStorage.getItem(
                                  "customFiltersConfigSecondFilter"
                                ) === list
                                  ? "active-dashboard"
                                  : ""
                              }`}
                              onClick={() => this.getSecondFilter(list)}
                            >
                              {list}
                            </ul>
                          ))}
                      </div>

                      <div className="dropdown-menu custom-dropdown-menu-sm">
                        <input
                          type="text"
                          id="inputToFocusT"
                          className="searchBox mb-4"
                          placeholder="Search..."
                          onChange={this.handleChangeTwo}
                          autoFocus
                        />
                        {this.state.searchFilterListTwo.map((list, index) => (
                          <ul
                            key={index}
                            className={` cursorStyleOne ${
                              localStorage.getItem(
                                "customFiltersConfigSecondFilter"
                              ) === list
                                ? "active-dashboard"
                                : ""
                            }`}
                            onClick={() => this.getSecondFilter(list)}
                          >
                            {list}
                          </ul>
                        ))}
                        {this.state.searchFilterListTwo.length < 1 &&
                          this.state.filterSecondList.map((list, index) => (
                            <ul
                              key={index}
                              className={` cursorStyleOne ${
                                localStorage.getItem(
                                  "customFiltersConfigSecondFilter"
                                ) === list
                                  ? "active-dashboard"
                                  : ""
                              }`}
                              onClick={() => this.getSecondFilter(list)}
                            >
                              {list}
                            </ul>
                          ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Third Filter */}
                {this.state.filterThirdName && (
                  <div className="mt-3">
                    <div className="btn-group custom-filter me-3">
                      <button type="button" className="btn">
                        <label
                          className="custom-font-style-3"
                          style={{ lineHeight: "0" }}
                        >
                          {this.state.filterThirdName}
                        </label>
                        <div className="vertical-separator"></div>
                      </button>
                      <button
                        type="button"
                        className="btn dropdown-toggle dropdown-toggle-split pe-3"
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <span className="sr-only">Toggle Dropdown</span>
                        <span className="custom-font-style-2">
                          {this.state.selectedThirdFilter ||
                            localStorage.getItem(
                              "customFiltersConfigThirdFilter"
                            ) ||
                            "All"}
                        </span>
                      </button>
                      <div className="dropdown-menu custom-dropdown-menu-sm">
                        <input
                          type="text"
                          id="inputToFocusOne"
                          className="searchBox mb-4"
                          placeholder="Search..."
                          onChange={this.handleChangeThree}
                          autoFocus
                        />
                        {this.state.searchFilterListThree.map((list, index) => (
                          <ul
                            key={index}
                            className={`cursorStyleOne ${
                              localStorage.getItem(
                                "customFiltersConfigThirdFilter"
                              ) === list
                                ? "active-dashboard"
                                : ""
                            }`}
                            onClick={() => this.getThirdFilter(list)}
                          >
                            {list}
                          </ul>
                        ))}
                        {this.state.searchFilterListThree.length < 1 &&
                          this.state.filterThirdList.map((list, index) => (
                            <ul
                              key={index}
                              className={` cursorStyleOne ${
                                localStorage.getItem(
                                  "customFiltersConfigThirdFilter"
                                ) === list
                                  ? "active-dashboard"
                                  : ""
                              }`}
                              onClick={() => this.getThirdFilter(list)}
                            >
                              {list}
                            </ul>
                          ))}
                      </div>

                      <div className="dropdown-menu custom-dropdown-menu-sm">
                        <input
                          type="text"
                          id="inputToFocusT"
                          className="searchBox mb-4"
                          placeholder="Search..."
                          onChange={this.handleChangeThree}
                          autoFocus
                        />
                        {this.state.searchFilterListThree.map((list, index) => (
                          <ul
                            key={index}
                            className={` cursorStyleOne ${
                              localStorage.getItem(
                                "customFiltersConfigThirdFilter"
                              ) === list
                                ? "active-dashboard"
                                : ""
                            }`}
                            onClick={() => this.getThirdFilter(list)}
                          >
                            {list}
                          </ul>
                        ))}
                        {this.state.searchFilterListThree.length < 1 &&
                          this.state.filterThirdList.map((list, index) => (
                            <ul
                              key={index}
                              className={` cursorStyleOne ${
                                localStorage.getItem(
                                  "customFiltersConfigThirdFilter"
                                ) === list
                                  ? "active-dashboard"
                                  : ""
                              }`}
                              onClick={() => this.getThirdFilter(list)}
                            >
                              {list}
                            </ul>
                          ))}
                      </div>
                    </div>
                  </div>
                )}
                <div className="">
                  <DateFilter
                    pathName={this.props}
                    history={this.props.history}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default FilterNavBar;
