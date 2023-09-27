type Product = {
  id: number;
  title: string;
  image: string;
  price: number;
  amount: number;
};

export const handleCartFunctionality = () => {
  const cart = document.querySelector("[data-cart]");
  const cartItemsContainer = document.querySelector("[data-cartItems]");
  const cartEmptyElement = document.querySelector("[data-emptyCart]");
  const openCartButton = document.querySelector("[data-openCart]");
  const decreaseAmountButton = document.querySelector("[data-decrease]");
  const increaseAmountButton = document.querySelector("[data-increase]");
  const addToCartButton = document.querySelector("[data-addToCart]");
  const amountElement = document.querySelector("[data-amount]");
  let products: Product[] = [];
  let amount = 0;

  const toggleCart = () => {
    cart?.classList.toggle("hidden");
  };

  const hancleAmountCalculation = (value: number) => {
    if (!(amountElement instanceof HTMLSpanElement)) return;
    amount += value;
    amountElement.textContent = String(amount);
  };

  const clearAmount = () => {
    if (!(amountElement instanceof HTMLSpanElement)) return;
    amount = 0;
    amountElement.textContent = "0";
  };

  const addElementToCart = () => {
    if (!amount) return;

    const newProduct = {
      id: Math.random(),
      title: "Fall Limited Edition Sneakers",
      image: "images/image-product-1-thumbnail.jpg",
      price: 125,
      amount,
    };

    const isProductInCart = products.find(
      (product) => product.title === newProduct.title
    );

    if (!isProductInCart) {
      products.push(newProduct);
    } else {
      products = products.map((product) =>
        product.title === newProduct.title
          ? { ...product, amount: product.amount + newProduct.amount }
          : { ...product }
      );
    }
    clearAmount();
    renderProductsInsideCart();
  };

  const renderProductsInsideCart = () => {
    if (!cartItemsContainer) return;

    if (!products.length) {
      cartEmptyElement?.classList.remove("hidden");
    } else {
      cartEmptyElement?.classList.add("hidden");
    }

    cartItemsContainer.innerHTML = "";
    products.forEach((product) => {
      cartItemsContainer.insertAdjacentHTML(
        "beforeend",
        renderCartItem(product)
      );
    });
  };

  const deleteProduct = (id: number) => {
    if (!id) return;

    products = products.filter((product) => product.id !== id);

    renderProductsInsideCart();
  };

  const renderCartItem = ({ id, title, image, price, amount }: Product) => {
    return `
      <li class="cart__item">
              <img
                src=${image}
                alt=${title}
                class="cart__image"
              />
              <div class="cart__item-description">
                <p class="cart__item-title">${title}</p>
                <div class="cart__item-summary">
                  <p class="cart__item-price">
                    $${price} <span class="cart__item-quantity">x ${amount}</span>
                  </p>
                  <p class="cart__item-totalPrice">$${price * amount}</p>
                </div>
              </div>
              <button
                class="button button--delete"
                aria-label="Delete cart item"
                data-id=${id}
              >
                <img
                  src="./src/images/icon-delete.svg"
                  alt=""
                  class="button__image"
                />
              </button>
            </li>
    `;
  };

  increaseAmountButton?.addEventListener("click", () => {
    hancleAmountCalculation(1);
  });

  decreaseAmountButton?.addEventListener("click", () => {
    if (amount === 0) return;
    hancleAmountCalculation(-1);
  });

  openCartButton?.addEventListener("click", toggleCart);
  addToCartButton?.addEventListener("click", addElementToCart);
  cartItemsContainer?.addEventListener("click", (ev) => {
    const target = ev.target;
    if (!(target instanceof HTMLButtonElement)) return;
    deleteProduct(Number(target.dataset.id));
  });
};
