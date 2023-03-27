import { APP, LANG } from "../constants";
import axios from "axios";
import Notify from "../helpers/notify";
import { authHeader } from "../helpers/authHeader";

export const PrototypeService = {
  saveUserDashboard,
  getAllDashboards,
  getDashboardById,
  deleteDashboardById,
};

function saveUserDashboard(data) {
  const requestOptions = {
    url: window.env.REACT_APP_PMDASH_API_URL + "forms/saveUserDashboard",
    method: APP.REQUEST.POST,
    data: JSON.stringify(data),
    headers: authHeader(),
  };

  return axios(requestOptions)
    .then(handleResponse)
    .catch((err) => {
      if (err.message.includes(401)) {
        Notify.error(LANG.STATUSCODE.UNAUTHORIZED);
      } else {
        Notify.error(err.message);
      }
    });
}

function getAllDashboards() {
  const requestOptions = {
    url: window.env.REACT_APP_PMDASH_API_URL + "forms/getAllDashboards",
    method: APP.REQUEST.GET,
    headers: authHeader(),
  };

  return axios(requestOptions)
    .then(handleResponse)
    .catch((err) => {
      if (err.message.includes(401)) {
        Notify.error(LANG.STATUSCODE.UNAUTHORIZED);
      } else {
        Notify.error(err.message);
      }
    });
}

function getDashboardById(id) {
  const requestOptions = {
    url:
      window.env.REACT_APP_PMDASH_API_URL + "forms/getDashboardById?id=" + id,
    method: APP.REQUEST.GET,
    headers: authHeader(),
  };

  return axios(requestOptions)
    .then(handleResponse)
    .catch((err) => {
      if (err.message.includes(401)) {
        Notify.error(LANG.STATUSCODE.UNAUTHORIZED);
      } else {
        Notify.error(err.message);
      }
    });
}

function deleteDashboardById(id) {
  const requestOptions = {
    url:
      window.env.REACT_APP_PMDASH_API_URL +
      "forms/deleteDashboardById?id=" +
      id,
    method: APP.REQUEST.DELETE,
    headers: authHeader(),
  };

  return axios(requestOptions)
    .then(handleResponse)
    .catch((err) => {
      if (err.message.includes(401)) {
        Notify.error(LANG.STATUSCODE.UNAUTHORIZED);
      } else {
        Notify.error(err.message);
      }
    });
}

function handleResponse(response) {
  if (response.status === 401) {
    const error =
      LANG.APIERROR || (response && response.message) || response.statusText; //Ignoring server side error and using end user readable message
    return Promise.reject(new Error(error));
  }
  return response;
}
