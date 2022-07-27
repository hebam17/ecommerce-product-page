// get elements
const menuBtn = document.getElementById("menu");
const menu = document.getElementsByClassName("menu-outer")[0];
const closeMenu = document.getElementById("close");
const cartnum = document.getElementById("item-num");
const minus = document.getElementById("minus");
const plus = document.getElementById("plus");
const amountElem = document.getElementById("amount");
const addBtn = document.getElementById("add-btn");
const itemCardNum = document.getElementById("item-num");
const cartIcon = document.getElementById("cart");
const cart = document.getElementById("cart-state");
const trash = document.getElementById("delete");
const priceElem = document.getElementById("price");
const qty = document.getElementById("qty");
const total = document.getElementById("total");
const cartContainer = document.getElementById("cart-container");
const emptyCart = document.getElementById("empty-cart");

// the model and thumb
const leftThumbPics = document.getElementsByClassName("left-thumb");
const mainLeftPic = document.getElementById("left-main");
const leftMain = document.getElementById("left-main-pic");

const modelThumbPics = document.getElementsByClassName("modal-thumb");
const mainModalPic = document.getElementById("modal-pic");
const modal = document.getElementById("modal-outer");
const closeModal = document.getElementById("close-modal");
// arrow
const leftRightArow = document.getElementById("left-right-arow");
const leftLeftArow = document.getElementById("left-left-arow");
const modalLeftArow = document.getElementById("modal-left-arow");
const modalrightArow = document.getElementById("modal-right-arow");

const leftThumbPicsArray = [...leftThumbPics];
const modalThumbPicsArray = [...modelThumbPics];
// functions
// toggle sidebar
let openMenu = false;
const toggleSideBar = (action) => {
  if (!openMenu && action === "open") {
    menu.setAttribute("id", "menu-outer");
    openMenu = true;
  } else if (openMenu && action === "close") {
    menu.setAttribute("id", "");
    openMenu = false;
  }
};

// add the product to the localstorage and display it in the cart small badget
const addToCartHandler = () => {
  localStorage.setItem("cart", JSON.stringify({ amount, price: 125 }));
  if (amount > 0) {
    itemCardNum.style.display = "block";
    itemCardNum.innerText = amount;
  } else {
    itemCardNum.style.display = "none";
  }
};

// get the data from the localstorage and initialize the amount variable
const initiatAmount = () => {
  const { amount: prodAmount } = JSON.parse(localStorage.getItem("cart"));
  amount = prodAmount;
  addToCartHandler();
  amountElem.innerText = prodAmount;
};

// open and close the cart
let cartOpen = false;
const cartOpenHandle = () => {
  if (!cartOpen) {
    const { amount: prodAmount, price } = JSON.parse(
      localStorage.getItem("cart")
    );
    if (prodAmount === 0) {
      cartContainer.style.display = "none";
      emptyCart.style.display = "block";
    } else {
      cartContainer.style.display = "block";
      emptyCart.style.display = "none";
      priceElem.innerText = price;
      qty.innerText = prodAmount;
      total.innerText = `${prodAmount * price}$`;
    }

    cart.style.display = "block";
    cartOpen = true;
  } else {
    cart.style.display = "none";
    cartOpen = false;
  }
};

let amount = 0;
// Increase and decrease the amount and display it on screen
const productAmount = (action) => {
  if (action === "plus") {
    amount += 1;
    console.log(amount);
  } else if (action === "minus") {
    if (amount !== 0) {
      amount -= 1;
      console.log(amount);
    }
  }
  amountElem.innerText = amount;
};

// models and thumbs functions
// when click the thumb image display the pig image coresponding
const displayFromThumb = (e, targetElem, picsArray) => {
  const newSrc = e.target.src.split("-thumbnail").join("");
  targetElem.src = newSrc;

  console.log(e);
  picsArray.forEach((pic) => {
    if (pic === e.target) {
      pic.parentElement.classList.add("active");
    } else {
      pic.parentElement.classList.remove("active");
    }
  });
};

//toggle open and close model
let openModal = false;
const toggleModal = () => {
  if (window.innerWidth > 480) {
    if (!openModal) {
      openModal = true;
      console.log(modal.style.display);
      modal.style.display = "block";
      console.log(modal);
      console.log(modal.style.display);
    } else {
      openModal = false;
      modal.style.display = "none";
    }
  } else {
    openModal = false;
  }
};

// move left and right in the image gallery using side arrows
let picNum = 0;
const galleryHandler = (action, targetElem) => {
  let pic;
  if (action === "forward") {
    if (picNum < 3) {
      picNum++;
    }
  } else if (action === "back") {
    if (picNum > 0) {
      console.log("first");
      picNum--;
    }
  }
  console.log(picNum);
  pic = leftThumbPicsArray[picNum];
  const newSrc = pic.src.split("-thumbnail").join("");
  targetElem.src = newSrc;
};

const empytCartHandler = () => {
  localStorage.setItem("cart", JSON.stringify({ amount: 0, price: 0 }));
  cartOpenHandle();
  amount = 0;
  amountElem.innerText = amount;
  itemCardNum.style.display = "none";
};

// event listeners
minus.addEventListener("click", () => {
  productAmount("minus");
});
plus.addEventListener(
  "click",
  () => {
    productAmount("plus");
  },
  "plus"
);

cartIcon.addEventListener("click", cartOpenHandle);
addBtn.addEventListener("click", addToCartHandler);

// model and thumbs eventlisteners
leftThumbPicsArray.forEach((pic) => {
  pic.addEventListener("click", (e) => {
    displayFromThumb(e, mainLeftPic, leftThumbPicsArray);
  });
});

modalThumbPicsArray.forEach((pic) => {
  pic.addEventListener("click", (e) => {
    displayFromThumb(e, mainModalPic, modalThumbPicsArray);
  });
});

mainLeftPic.addEventListener("click", toggleModal);
// close modal when click the close button
closeModal.addEventListener("click", () => {
  toggleModal();
});
// close modal when click any where on screen except for the modal itself
modal.addEventListener("click", (e) => {
  if (e.target === modal) toggleModal();
  console.log(e.target);
});

// Arrows to change image in the gallery
leftRightArow.addEventListener("click", () => {
  galleryHandler("forward", mainLeftPic);
});
leftLeftArow.addEventListener("click", () => {
  galleryHandler("back", mainLeftPic);
});

modalrightArow.addEventListener("click", () => {
  galleryHandler("forward", mainModalPic);
});
modalLeftArow.addEventListener("click", () => {
  galleryHandler("back", mainModalPic);
});

// toggle sidebar
// open sidebar
menuBtn.addEventListener("click", () => {
  toggleSideBar("open");
});
// close sidebar
closeMenu.addEventListener("click", () => {
  toggleSideBar("close");
});

// empty the cart by clicking the trash icon
trash.addEventListener("click", empytCartHandler);
// /////////////
initiatAmount();
