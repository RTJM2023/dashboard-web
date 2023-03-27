import { APP, LANG } from "./../constants";
import { authHeader } from "../helpers/authHeader";

export const UserService = {
  login,
  logout
};

function login(username, password) {
  const requestOptions = {
    method: APP.REQUEST.POST,
    headers: authHeader(),
    body: JSON.stringify({ username, password })
  };

  return fetch(window.env.REACT_APP_PMDASH_API_URL + "login", requestOptions).then(
    handleResponse
  );
}

function logout() {
  localStorage.clear();
  localStorage.removeItem("user");
  localStorage.removeItem("startDate");
  localStorage.removeItem("endDate");
  localStorage.removeItem("chartData");
  localStorage.removeItem("widgetArray");
  localStorage.removeItem("dashboardName");
  localStorage.removeItem("currentDashboard");
  localStorage.removeItem("currentTheme");
  localStorage.removeItem("currentDashId");
  localStorage.removeItem("selectedFilter");
  localStorage.removeItem("selectedDate");
  localStorage.removeItem("label");
  localStorage.removeItem("filterKey");
  localStorage.removeItem("customFilters");
  localStorage.removeItem("customFiltersConfigUnitKey");
  localStorage.removeItem("customFiltersConfigFirstFilter");
  localStorage.removeItem("customFiltersConfigCountryKey");
  localStorage.removeItem("customFiltersConfigSecondFilter");
  localStorage.removeItem("customFiltersConfigThirdKey");
  localStorage.removeItem("customFiltersConfigThirdFilter");
  localStorage.removeItem("language");
  localStorage.removeItem("selectedState");
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        logout();
        // location.reload(true);
      }
      const error =
        LANG.APIERROR || (data && data.message) || response.statusText; //Ignoring server side error and using end user readable message
      return Promise.reject(new Error(error));
    }
    return data;
  });
}
