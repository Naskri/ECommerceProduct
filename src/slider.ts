export const handleSliderFunctionality = () => {
  const mainImageContainers = document.querySelectorAll(
    "[data-mainImageContainer]"
  );

  const allPossibleImagesButtons = document.querySelectorAll(
    "[data-buttonImages]"
  );

  const previousSlideButtons = document.querySelectorAll(
    "[data-previousSlide]"
  );
  const nextSlideButtons = document.querySelectorAll("[data-nextSlide]");

  let currentSlide = 1;

  const setCurrentImageUI = () => {
    removeActiveClassFromImageContainers();
    const currentThumbnailImageContainers = document.querySelectorAll(
      `[data-buttonImages="${currentSlide}"]`
    );

    currentThumbnailImageContainers.forEach(
      (currentThumbnailImageContainer) => {
        currentThumbnailImageContainer?.classList.add("active");
      }
    );
    setNewMainImage(currentSlide);
  };

  const setNewSlide = (newImageID: number) => {
    currentSlide = newImageID;
  };

  const previousSlide = () => {
    if (currentSlide === 1) return;
    currentSlide--;
    setCurrentImageUI();
  };

  const nextSlide = () => {
    if (currentSlide === allPossibleImagesButtons.length / 2) return;
    currentSlide++;
    setCurrentImageUI();
  };

  const removeActiveClassFromImageContainers = () => {
    allPossibleImagesButtons.forEach((buttonContainer) =>
      buttonContainer?.classList.remove("active")
    );
  };

  const setNewMainImage = (id: number) => {
    const FOLDER_URL = "./../src/images";
    const newImageSource = `${FOLDER_URL}/image-product-${id}.jpg`;

    mainImageContainers.forEach((mainImageContainer) => {
      const mainImage = mainImageContainer?.querySelector(".gallery__image");
      mainImage?.setAttribute("src", newImageSource);
    });
  };

  allPossibleImagesButtons.forEach((buttonContainer) =>
    buttonContainer?.addEventListener("click", (ev) => {
      if (!(ev.target instanceof HTMLButtonElement)) return;

      const newMainImageID = Number(ev.target.dataset.buttonimages);

      if (!newMainImageID) return;

      setNewSlide(newMainImageID);
      setCurrentImageUI();
    })
  );

  previousSlideButtons.forEach((previousSlideButton) => {
    previousSlideButton?.addEventListener("click", previousSlide);
  });

  nextSlideButtons.forEach((nextSlideButton) => {
    nextSlideButton?.addEventListener("click", nextSlide);
  });

  setCurrentImageUI();
};
