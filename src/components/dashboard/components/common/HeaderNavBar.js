import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import * as moment from "moment";
import { UserService } from "../../../../services/user.service";
import { defaults } from "react-chartjs-2";
import LocalizedStrings from "react-localization";
import { translations } from "../../../../translations.js";

/**
 * Header Navbar Component
 * Holds menus and placed after BrandNavBar component
 */

let strings = new LocalizedStrings(translations);

class HeaderNavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: "en",
      active: false,
      currentDate: "",
      currentUser: "",
      theme: "",
      currentTheme: "",
      genAvatar: "",
      colorTrigger: "",
    };
    this.getCurrentDate = this.getCurrentDate.bind(this);
    this.logout = this.logout.bind(this);
    this.handleLanguageChange = this.handleLanguageChange.bind(this);
  }

  componentDidMount() {
    if (localStorage.getItem("language")) {
      this.setState({
        language: localStorage.getItem("language"),
      });
    }
    localStorage.getItem("currentTheme") === "Dark theme"
      ? this.setState(
          { theme: "dark", currentTheme: "Light theme", colorTrigger: true },
          () => {
            document.documentElement.setAttribute(
              "data-theme",
              this.state.theme
            );
          }
        )
      : this.setState(
          { theme: "light", currentTheme: "Dark theme", colorTrigger: false },
          () => {
            document.documentElement.setAttribute(
              "data-theme",
              this.state.theme
            );
          }
        );

    this.getCurrentDate();
  }

  /**
   * Function to get current date, year, month and
   * converting those into the required format
   * using moment.js
   */
  async getCurrentDate() {
    let date = new Date();
    await this.setState({
      currentDate: moment(date).format("dddd, Do MMMM YYYY"),
    });
    let userDetails = localStorage.getItem("user");
    userDetails = JSON.parse(userDetails);
    let userName = userDetails.username;
    let name = userName.split("@");
    this.setState(
      {
        currentUser: name[0],
      },
      () => this.nameAvatar()
    );
  }

  /**
   * Logout function
   */
  logout = () => {
    UserService.logout();
    localStorage.clear();
    this.props.history.go("/login");
  };

  nameAvatar = () => {
    let genAvat = this.state.currentUser
      .split(/\s/)
      .reduce((res, letter) => (res += letter.slice(0, 1)), "");
    this.setState({
      genAvatar: genAvat,
    });
  };

  handleLanguageChange(e) {
    e.preventDefault();
    let lang = e.target.innerHTML;
    lang = lang.toLowerCase();
    if (lang.length === 2) {
      this.setState(
        (prevState) => ({
          language: lang,
        }),
        () => {
          localStorage.setItem("language", this.state.language);
          this.props.pathName.history.push({
            pathName: "/reports",
            state: { language: this.state.language },
          });
          this.props.pathName.history.push({
            pathName: "/admin/dashboards",
            state: { language: this.state.language },
          });
        }
      );
    } else {
      this.setState(
        (prevState) => ({
          language: "en",
        }),
        () => {
          localStorage.setItem("language", this.state.language);
          this.props.pathName.history.push({
            pathName: "/reports",
            state: { language: this.state.language },
          });
          this.props.pathName.history.push({
            pathName: "/admin/dashboards",
            state: { language: this.state.language },
          });
        }
      );
    }
  }

  /**
   * Function to change theme from the dropdown
   */
  changeTheme = () => {
    this.state.currentTheme === "Dark theme"
      ? this.setState(
          { theme: "dark", currentTheme: "Light theme", colorTrigger: true },
          () => {
            document.documentElement.setAttribute(
              "data-theme",
              this.state.theme
            );
          }
        )
      : this.setState(
          { theme: "light", currentTheme: "Dark theme", colorTrigger: false },
          () => {
            document.documentElement.setAttribute(
              "data-theme",
              this.state.theme
            );
          }
        );
    localStorage.setItem("currentTheme", this.state.currentTheme);
    defaults.global.defaultFontColor = "grey";
    this.props.pathName.history.push({
      pathName: "/dashboards",
      state: { colorTrigger: this.state.colorTrigger },
    });
  };

  render() {
    strings.setLanguage(this.state.language);
    return (
      <nav className="navbar header-navbar-1 col-sm-12 col-md-10 col-lg-10 col-xl-10 col-xxl-10 p-0">
        <div className="col-12">
          <div className="clearfix">
            <div className="float-end">
              <div className="d-flex">
                {this.props.pathName &&
                  this.props.pathName.match &&
                  (this.props.pathName.match.path === "/dashboards" ||
                    this.props.pathName.match.path === "/home" ||
                    this.props.pathName.match.path === "/help") && (
                    <NavLink
                      to="/tool"
                      className="material-icons me-4 pt-1 cursor-style-one icons-1"
                    >
                      construction
                    </NavLink>
                  )}

                {this.props.pathName &&
                  this.props.pathName.match &&
                  this.props.pathName.match.path === "/tool" && (
                    <React.Fragment>
                      <NavLink to="/tool" className="me-4 pt-1">
                        <label className="label-style-1 cursor-style-one">
                          Tool
                        </label>
                      </NavLink>
                      <NavLink to="/prototypeHome" className="me-4 pt-1">
                        <label className="label-style-disabled label-style-1 cursor-style-one">
                          Prototypes
                        </label>
                      </NavLink>
                      <NavLink to="/dashboards" className="me-4 pt-1">
                        <label className="label-style-disabled label-style-1 cursor-style-one">
                          Dashboards
                        </label>
                      </NavLink>
                    </React.Fragment>
                  )}

                {this.props.pathName &&
                  this.props.pathName.match &&
                  (this.props.pathName.match.path === "/prototypeHome" ||
                    this.props.pathName.match.path === "/creator" ||
                    this.props.pathName.match.path.match("/prototype/")) && (
                    <React.Fragment>
                      <NavLink to="/tool" className="me-4 pt-1">
                        <label className="label-style-disabled label-style-1 cursor-style-one">
                          Tool
                        </label>
                      </NavLink>
                      <NavLink to="/prototypeHome" className="me-4 pt-1">
                        <label className="label-style-1 cursor-style-one">
                          Prototypes
                        </label>
                      </NavLink>
                      <NavLink to="/dashboards" className="me-4 pt-1">
                        <label className="label-style-disabled label-style-1 cursor-style-one">
                          Dashboards
                        </label>
                      </NavLink>
                    </React.Fragment>
                  )}
                <div className="dropdown">
                  <span
                    className="profile-circle me-4 text-uppercase cursor-style-one"
                    id="profileDD"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {this.state.genAvatar}
                  </span>
                  <span
                    className="dropdown-menu profile-dropdown cursor-style-one"
                    aria-labelledby="profileDD"
                  >
                    <p
                      className="dropdown-item custom-font-style-3 mt-3 cursor-style-one"
                      onClick={this.logout}
                    >
                      Logout
                    </p>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default HeaderNavBar;
