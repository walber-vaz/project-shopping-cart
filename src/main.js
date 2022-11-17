import { searchCep } from './helpers/cepFunctions';
import { saveCartID, getSavedCartIDs } from './helpers/cartFunctions';
import { fetchProductsList, fetchProduct } from './helpers/fetchFunctions';
import { createProductElement, createCartProductElement } from './helpers/shopFunctions';

import './style.css';

const fragment = new DocumentFragment();
const cardProduct = globalThis.document.querySelector('section .products');
const cartListProduct = document.querySelector('.cart__products');

const createElementLoad = (param = 'elError') => {
  const elError = globalThis.document.createElement('h1');

  if (param === 'error') {
    elError.innerText = 'Algum erro ocorreu, recarregue a página e tente novamente';
    elError.className = 'error';
  } else {
    elError.innerText = 'carregando...';
    elError.className = 'loading';
  }

  fragment.appendChild(elError);
  cardProduct.appendChild(fragment);
};

const removeElementLoad = () => {
  const loading = document.querySelector('.loading');
  return loading.remove();
};

const addCart = async (window) => {
  const id = window.target.parentNode.firstChild.innerText;
  const getCartClass = globalThis.document.querySelector('.cart__products');

  saveCartID(id);
  const fetchIdProduct = await fetchProduct(id);
  const cartProduct = createCartProductElement(fetchIdProduct);
  fragment.appendChild(cartProduct);
  getCartClass.appendChild(fragment);
};

const addProductInCart = () => {
  const btns = globalThis.document.querySelectorAll('.product__add');

  [...btns].map((btn) => btn.addEventListener('click', addCart));
};

const saveListCartProductInLocalStorage = async () => {
  const idsProducts = await getSavedCartIDs();

  const awesomeIds = await idsProducts.map((id) => {
    const idProductFetch = fetchProduct(id);
    return idProductFetch;
  });

  Promise.all(awesomeIds)
    .then((res) => res.map((product) => {
      const addProduct = createCartProductElement(product);
      fragment.appendChild(addProduct);
      return cartListProduct.appendChild(fragment);
    }));
};

const getApi = async () => {
  createElementLoad();
  try {
    const listProductInDOM = await fetchProductsList('computador');
    removeElementLoad();
    listProductInDOM.map((el) => fragment.appendChild(createProductElement(el)));
    cardProduct.appendChild(fragment);
    addProductInCart();
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
