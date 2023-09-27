import { createFocusTrap } from "focus-trap";

export const handleModalFunctionality = () => {
  const openModalButton = document.querySelector("[data-openModal]");
  const closeModalButton = document.querySelector("[data-closeModal]");
  const modal = document.querySelector("[data-modal]");
  const modalContent = document.querySelector("[data-modalContent]");
  const overlay = document.querySelector("[data-overlay]");
  const focusTrap = createFocusTrap(modal as HTMLElement);

  const MOBILE_SIZE = 448;

  const openModal = () => {
    if (!modal || !modalContent) return;
    modal.classList.remove("hidden");
    document.body.classList.add("modal-open");
    focusTrap.activate();
  };

  const closeModal = () => {
    if (!modal) return;
    modal.classList.add("hidden");
    document.body.classList.remove("modal-open");
    focusTrap.deactivate();
  };

  openModalButton?.addEventListener("click", () => {
    const windowWidth = window.innerWidth;
    if (windowWidth <= MOBILE_SIZE) return;
    openModal();
  });
  closeModalButton?.addEventListener("click", closeModal);
  overlay?.addEventListener("click", closeModal);

  window.addEventListener("resize", () => {
    const windowWidth = window.innerWidth;
    if (windowWidth <= MOBILE_SIZE) {
      closeModal();
    }
  });

  document.body.addEventListener("keyup", (ev) => {
    const key = ev.key;
    if (key === "Escape") {
      closeModal();
    }
  });
};
