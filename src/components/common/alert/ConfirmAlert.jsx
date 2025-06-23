export function ConfirmAlert({ confirmBtnText, text }) {
  return new Promise((resolve) => {
    import("sweetalert2").then((Swal) => {
      Swal.default
        .fire({
          title: "Are you sure?",
          text: text || "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: confirmBtnText,
          width: 400,
          customClass: {
            popup: "custom-swal-popup",
          },
        })
        .then((result) => {
          resolve(result);
        });
    });
  });
}
