import React, { useEffect, useState } from "react";
import ChartType from "./ChartType";
import "file-saver";
import domtoimage from "dom-to-image";
import Modal from "react-modal";
import * as clipboard from "clipboard-polyfill";
import _ from "lodash";
import ExportChart from "../../../helpers/exportJsonToExcel";

/**
 * GenericChart component to display the
 * generated charttypes in the page layout
 */

Modal.setAppElement("#root");

const GenericCharts = ({ props }) => {
  const [modalData, setModalData] = useState({
    name: "",
    data: [],
    chartDataName: "",
    dimensions: "",
  });

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [imageBlob, setImageBlob] = useState();
  // eslint-disable-next-line no-unused-vars
  const [telegramURL, setTelegramURL] = useState();

  const filterImage = (node) => {
    return (
      node.id !== "dropdownMenuButton" &&
      node.id !== "zoomIn" &&
      node.id !== "zoomOut" &&
      node.id !== "zoomInBtn" &&
      node.id !== "zoomOutBtn"
    );
  };

  const filterImageTwo = (node) => {
    return (
      node.id !== "exit" &&
      node.id !== "downloadAsData" &&
      node.id !== "downloadAsImage" &&
      node.id !== "dropdownMenuButtonShare"
    );
  };

  const afterOpenModal = () => {
    setTimeout(() => {
      domtoimage
        .toBlob(document.getElementById("modalView"), {
          filter: filterImageTwo,
        })
        .then((blob) => {
          setImageBlob(blob);
          const item = new clipboard.ClipboardItem({
            "image/png": blob,
          });
          clipboard.write([item]);
        });
    }, 800);
  };

  const getModalData = (name, data, cdName, dimensions) => {
    let tempArr = {
      name: name,
      data: data,
      chartDataName: cdName,
      dimensions: dimensions,
    };

    setModalData((state) => [...state, tempArr]);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    openModal();
  }, [modalData]);

  useEffect(() => {
    let reader = new FileReader();
    reader.readAsDataURL(imageBlob);

    reader.onload = function () {
      this.image = reader.result;
    };
    window.saveAs(imageBlob, modalData.name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageBlob]);

  const renderCharts = (d, chartData, index) => {
    let chartCode = _.chain(d.charts).first().get("id").value();
    let chartType = _.chain(d.charts)
      .first()
      .get("chartType")
      .toUpper()
      .value();

    switch (d.vizType.toUpperCase()) {
      case "CHART":
        return (
          <div
            key={index}
            className={`col-sm-12 col-md-${d.dimensions.width} col-lg-${d.dimensions.width} mt-2 mb-3`}
          >
            <div
              className="chart-wrapper h-100 cardChart chartWrapperPadding"
              id={d.name.replace(/\s/g, "")}
            >
              <div className="row">
                <h5 className="pb-5 pt-2 pl-3">{d.name}</h5>
                <span
                  className="material-icons cursorStyleOne mt-3 full-screen-button ml-3"
                  onClick={() => {
                    getModalData(
                      d.name,
                      d.charts,
                      chartData.name,
                      d.dimensions
                    );
                  }}
                >
                  fullscreen
                </span>

                <Modal
                  id="modalView"
                  isOpen={modalIsOpen}
                  onAfterOpen={afterOpenModal}
                  onRequestClose={closeModal}
                  contentLabel={modalData.name}
                  className="custom-modal"
                  bodyOpenClassName="afterOpen"
                  overlayClassName="custom-modal-overlay"
                >
                  <div className="col-xs-12 col-sm-12 col-md-11 col-lg-8 col-xl-8 float-right custom-modal-font-2">
                    <div
                      className="cursorStyleOne"
                      onClick={closeModal}
                      id="exit"
                    >
                      <span className="float-right">Exit</span>
                      <span className="material-icons float-right mr-1">
                        fullscreen_exit
                      </span>
                    </div>
                    <div className="cursorStyleOne" id="downloadAsData">
                      <span
                        className="float-right mr-3"
                        onClick={() =>
                          chartType === "TABLE"
                            ? ExportChart.tableToCsv(d.name)
                            : ExportChart.toCsv(d.name, chartCode)
                        }
                      >
                        Download data
                      </span>
                    </div>

                    <div
                      className="cursorStyleOne custom-dd-1 float-right"
                      id="dropdownMenuButtonShare"
                    >
                      <span className="float-right mr-3">Share</span>
                      <span className="material-icons float-right mr-1">
                        share
                      </span>

                      <div className="custom-modal-dropdown-1">
                        <a
                          className="dropdown-item email-button"
                          href="mailto:?subject=Message%20from%20RAIN&amp;body=http%3A%2F%2Frain.idc.tarento.com%2F"
                          target="_self"
                          rel="noopener noreferrer"
                          aria-label="Share by E-Mail"
                        >
                          Share via Email
                        </a>
                        <a
                          className="dropdown-item whatsapp-button"
                          href="whatsapp://send?text=Message%20from%20RAIN%20http%3A%2F%2Frain.idc.tarento.com%2F"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Share on WhatsApp"
                        >
                          Share via WhatsApp
                        </a>

                        <a
                          className="dropdown-item telegram-button"
                          href={telegramURL}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Share on Telegram"
                        >
                          Share via Telegram
                        </a>
                      </div>
                    </div>
                    <div
                      id="downloadAsImage"
                      className="cursorStyleOne"
                      onClick={() =>
                        domtoimage
                          .toBlob(document.getElementById("modalView"), {
                            filter: filterImageTwo,
                          })
                          .then((blob) => {
                            setImageBlob(blob);
                          })
                      }
                    >
                      <span className="float-right  mr-3">
                        Download as image
                      </span>
                      <span className="material-icons float-right mr-2">
                        cloud_download
                      </span>
                    </div>
                  </div>
                  <div>
                    <h2>{modalData.name}</h2>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-9 col-lg-8 col-xl-8 centerAlign">
                    <ChartType
                      key={index}
                      chartData={modalData.data}
                      label={modalData.name}
                      section={modalData.chartDataName}
                      pathName={props}
                      dimensions={modalData.dimensions}
                    />
                  </div>
                </Modal>

                <img
                  className="cursorStyleOne mt-3 downloadBtn ml-3 downloadIcon"
                  src="data:image/png;base64,R0lGODlhFAAUAIAAAP///wAAACH5BAEAAAAALAAAAAAUABQAAAIRhI+py+0Po5y02ouz3rz7rxUAOw=="
                  title="Download as PNG"
                  alt="download chart"
                  width="13"
                  height="13"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                ></img>
                <div
                  className="dropdown-menu dropdown-menu-custom"
                  aria-labelledby="dropdownMenuButton"
                  style={{ marginLeft: "-18em" }}
                >
                  <p
                    className="dropdown-item cursorStyleOne metricTextColor"
                    onClick={() =>
                      domtoimage
                        .toBlob(
                          document.getElementById(d.name.replace(/\s/g, "")),
                          {
                            filter: filterImage,
                          }
                        )
                        .then((blob) => window.saveAs(blob, d.name))
                    }
                  >
                    Download as PNG
                  </p>
                  <p
                    className="dropdown-item cursorStyleOne metricTextColor"
                    onClick={() =>
                      chartType === "TABLE"
                        ? ExportChart.tableToCsv(d.name)
                        : ExportChart.toCsv(d.name, chartCode)
                    }
                  >
                    Download as CSV
                  </p>
                </div>
              </div>
              <ChartType
                key={index}
                chartData={d.charts}
                label={d.name}
                section={chartData.name}
                pathName={props}
                dimensions={d.dimensions}
              />
            </div>
          </div>
        );
      case "METRICCOLLECTION":
        return (
          <div
            key={index}
            className={`col-sm-12 col-md-${d.dimensions.width} col-lg-${d.dimensions.width} mt-2 mb-3`}
          >
            <div
              className="chart-wrapper h-100 cardChart chartWrapperPadding"
              id={d.name.replace(/\s/g, "")}
            >
              <div className="row">
                <h5 className="pb-5 pt-2 pl-3">{d.name}</h5>
                <img
                  className="cursorStyleOne mt-3 downloadBtn ml-3 downloadIcon"
                  src="data:image/png;base64,R0lGODlhFAAUAIAAAP///wAAACH5BAEAAAAALAAAAAAUABQAAAIRhI+py+0Po5y02ouz3rz7rxUAOw=="
                  title="Download as PNG"
                  alt="download chart"
                  width="13"
                  height="13"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                ></img>
                <div
                  className="dropdown-menu dropdown-menu-custom"
                  aria-labelledby="dropdownMenuButton"
                  style={{ marginLeft: "-18em" }}
                >
                  <p
                    className="dropdown-item cursorStyleOne metricTextColor"
                    onClick={() =>
                      domtoimage
                        .toBlob(
                          document.getElementById(d.name.replace(/\s/g, "")),
                          {
                            filter: filterImage,
                          }
                        )
                        .then((blob) => window.saveAs(blob, d.name))
                    }
                  >
                    Download as PNG
                  </p>
                </div>
              </div>
              <ChartType
                key={index}
                chartData={d.charts}
                label={d.name}
                section={chartData.name}
              />
            </div>
          </div>
        );
      default:
        return <div></div>;
    }
  };

  let { chartData, row } = props;

  return (
    <div key={row} className="row">
      {chartData.vizArray.map((d, i) => renderCharts(d, chartData, i))}
    </div>
  );
};

export default GenericCharts;
