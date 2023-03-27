import { APP, LANG } from "../constants";
import axios from "axios";
import Notify from "../helpers/notify";
import { authHeader } from "../helpers/authHeader";

export const ChartService = {
  saveUserChart,
  getAllCharts,
  getChartById,
  deleteChartById,
};

function saveUserChart(data) {
  const requestOptions = {
    url: window.env.REACT_APP_PMDASH_API_URL + "forms/saveUserChart",
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

function getAllCharts(data) {
  const requestOptions = {
    url: window.env.REACT_APP_PMDASH_API_URL + "forms/getAllCharts",
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

function getChartById(id) {
  const requestOptions = {
    url: window.env.REACT_APP_PMDASH_API_URL + "forms/getChartById?id=" + id,
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

function deleteChartById(id) {
  const requestOptions = {
    url: window.env.REACT_APP_PMDASH_API_URL + "forms/deleteChartById?id=" + id,
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
