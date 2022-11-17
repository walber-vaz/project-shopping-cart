import { searchCep } from './helpers/cepFunctions';
import { saveCartID, getSavedCartIDs } from './helpers/cartFunctions';
import { fetchProductsList, fetchProduct } from './helpers/fetchFunctions';
import { createProductElement, createCartProductElement } from './helpers/shopFunctions';

import './style.css';

const fragment = new DocumentFragment();
const cardProduct = document.querySelector('.products');
const cartListProduct = document.querySelector('.cart__products');
const classTotalPrice = document.querySelector('.total-price');

let sumTotalCartList = 0;

const sumTotal = (product) => {
  const { price } = product;
  sumTotalCartList += parseFloat(price);
  classTotalPrice.innerText = sumTotalCartList.toFixed(2);
};

const subTotal = (product) => {
  const { price } = product;
  sumTotalCartList -= parseFloat(price);
  classTotalPrice.innerText = sumTotalCartList.toFixed(2);
};

const createElementLoad = (param = 'elementError') => {
  const elementError = document.createElement('h1');

  if (param === 'error') {
    elementError.innerText = 'Algum erro ocorreu, recarregue a página e tente novamente';
    elementError.className = 'error';
  } else {
    elementError.innerText = 'carregando...';
    elementError.className = 'loading';
  }

  cardProduct.appendChild(elementError);
};

const removeElementLoad = () => {
  const loading = document.querySelector('.loading');
  return loading.remove();
};

const deletePriceTotalCart = (product) => {
  const btnDelProductCart = document.querySelectorAll('.cart__product');
  btnDelProductCart[btnDelProductCart.length - 1]
    .addEventListener('click', () => {
      subTotal(product);
    });
};

const createElementInCartProduct = async (id) => {
  const getCartClass = document.querySelector('.cart__products');

  const fetchIdProduct = await fetchProduct(id);
  const cartProduct = createCartProductElement(fetchIdProduct);

  fragment.appendChild(cartProduct);
  getCartClass.appendChild(fragment);

  sumTotal(fetchIdProduct);
  deletePriceTotalCart(fetchIdProduct);
};

const addCart = (window) => {
  const id = window.target.parentNode.firstChild.innerText;

  saveCartID(id);
  createElementInCartProduct(id);
};

const addProductInCart = () => {
  const btns = document.querySelectorAll('.product__add');

  [...btns].map((btn) => btn.addEventListener('click', addCart));
};

const getAsyncProductSaved = async () => {
  const idsProducts = await getSavedCartIDs();

  return idsProducts.map((id) => {
    const idProductFetch = fetchProduct(id);
    return idProductFetch;
  });
};

const createCardListCart = (products) => {
  products.forEach((product) => {
    const addProduct = createCartProductElement(product);
    fragment.appendChild(addProduct);
    cartListProduct.appendChild(fragment);
    sumTotal(product);
  });
};

const savedPriceCartlist = (products) => {
  const getClass = document.querySelectorAll('.cart__product');

  getClass.forEach((product, indice) => {
    product.addEventListener('click', () => {
      subTotal(products[indice]);
    });
  });
};

const saveListCartProductInLocalStorage = async () => {
  const awesomeIds = await getAsyncProductSaved();

  Promise.all(awesomeIds)
    .then((res) => {
      createCardListCart(res);
      savedPriceCartlist(res);
    });
};

const calcPricecart = () => {
  const btns = document.querySelectorAll('.product__add');
  btns.forEach((btn) => {
    btn.addEventListener('click', addCart);
  });
};

const getApi = async () => {
  createElementLoad();
  try {
    const listProductInDOM = await fetchProductsList('computador');
    removeElementLoad();
    listProductInDOM.map((el) => fragment.appendChild(createProductElement(el)));
    cardProduct.appendChild(fragment);
    addProductInCart();
    calcPricecart();
  } catch (error) {
    removeElementLoad();
    createElementLoad('error');
  }
};

window.onload = () => {
  document.querySelector('.cep-button').addEventListener('click', searchCep);
  getApi();
  saveListCartProductInLocalStorage();
};
