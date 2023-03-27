import React from "react";

/**
 * Table chart component
 */

const TableChart = ({ chartData }) => {
  const manuplateData = (chartData) => {
    if (chartData) {
      var tempData = {
        row: [],
        columnHeader: [],
        rowValue: [],
      };

      chartData
        .filter(Boolean)
        .map((rowName) => tempData.row.push(rowName.headerName));

      chartData
        .filter(Boolean)
        .map((columnHeading) =>
          tempData.columnHeader.push(
            columnHeading.plots.map((label) => label.name)
          )
        );

      chartData.filter(Boolean).map((value) =>
        tempData.rowValue.push(
          value.plots.map((label, index) => {
            if (index > 1) {
              return { value: label.value, showBar: label.showBar };
            }
            return null;
          })
        )
      );

      return tempData;
    }
  };

  let data = manuplateData(chartData);

  if (data) {
    return (
      <div className="table-responsive" id="tableChart">
        {data.columnHeader.length && (
          <table className="table table-hover metricTextColor">
            <thead>
              <tr>
                {data.columnHeader[0].map((value, index) => (
                  <th key={index} scope="col">
                    {value}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.row.map((value, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{value}</td>
                  {data.rowValue[index]
                    .filter((i) => i !== null)
                    .map((text, id) => {
                      if (!text.showBar) {
                        return <td key={id}>{Math.round(text.value)}</td>;
                      } else {
                        return (
                          <td>
                            <td key={id} className="d-flex flex-row col-12">
                              {Math.round(text.value)}
                              <div className="progress custom-progress-bar-1 col-xs-9 col-sm-9 col-md-9 col-lg-9 col-xl-9">
                                <div
                                  className="progress-bar"
                                  role="progressbar"
                                  style={{
                                    width: `${Math.round(text.value)}%`,
                                  }}
                                  aria-valuenow="0"
                                  aria-valuemin="0"
                                  aria-valuemax="100"
                                ></div>
                              </div>
                            </td>
                          </td>
                        );
                      }
                    })}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  }

  return (
    <center>
      <div className="">
        <img
          className="empty-state-3"
          src="/icons/Empty_icon.svg"
          alt="empty visual"
        />
      </div>
      <div className="">
        <label className="label-style-4 mt-3">No data found</label>
      </div>
      <div className="w-50">
        <label className="label-style-5 mt-3">
          Please add data on the left side to view the corresponding
          visualisation here
        </label>
      </div>
    </center>
  );
};

export default TableChart;
