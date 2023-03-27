import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure({
  autoClose: 3000,
  draggable: false,
  position: toast.POSITION.TOP_CENTER,
  rtl: true,
  hideProgressBar: true,
  closeButton: false
});

class Notify {
  static success(message) {
    toast.success(message);
  }

  static warning(message) {
    toast.warning(message);
  }

  static error(message) {
    toast.error(message);
  }

  static dark(message) {
    toast.dark(message);
  }

  static info(message) {
    toast.info(message, { onClose: "" });
  }
}

export default Notify;
