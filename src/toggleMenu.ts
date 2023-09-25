export const handleMenuToggleFunctionality = () => {
  const hamburger = document.querySelector("[data-hamburger]");
  const navigation = document.querySelector(".navigation");
  const mobileNavigation = document.querySelector(".navigation--mobile");

  const toggleMenu = () => {
    navigation?.classList.toggle("mobile");
    mobileNavigation?.classList.toggle("active");

    const isExpanded = navigation?.classList.contains("mobile");

    hamburger?.setAttribute("aria-expanded", String(isExpanded));
  };

  hamburger?.addEventListener("click", toggleMenu);
};
