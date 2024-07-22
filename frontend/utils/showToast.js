import { toast } from "react-toastify";

export function showToast(message, options = {}) {
  toast.error(message, {
    position: "top-left",
    autoClose: 5000, // Close the toast after 5 seconds
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    ...options, // Merge with the provided options
  });
}
