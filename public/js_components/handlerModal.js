const modal = document.querySelector(".modal");
const handlerModal = () => {
  return modal.addEventListener("click", (e) => {
    const confirmDiv = document.querySelector(".confirmation");
    const confirmTarget = e.target.closest(".confirmation");
    if (confirmTarget) {
      return;
    } else {
      confirmDiv.remove();
      document.body.classList.remove("overflow-hidden");
      modal.classList.add("hidden");
    }
  });
};

export default handlerModal;
