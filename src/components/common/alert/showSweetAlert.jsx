import Swal from "sweetalert2";

const showSweetAlert = (icon, message) => {
  Swal.fire({
    title: "Alert",
    text: message,
    icon: icon,
    confirmButtonText: "OK",
  });
};

export default showSweetAlert;
