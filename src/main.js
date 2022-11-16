import { searchCep } from './helpers/cepFunctions';
import { saveCartID } from './helpers/cartFunctions';
import { fetchProductsList, fetchProduct } from './helpers/fetchFunctions';
import { createProductElement, createCartProductElement } from './helpers/shopFunctions';

import './style.css';

const cardProduct = globalThis.document.querySelector('section .products');

const createElementLoad = (param = 'elError') => {
  const elError = globalThis.document.createElement('h1');

  if (param === 'error') {
    elError.innerText = 'Algum erro ocorreu, recarregue a página e tente novamente';
    elError.className = 'error';
  } else {
    elError.innerText = 'carregando...';
    elError.className = 'loading';
  }

  cardProduct.appendChild(elError);
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
  getCartClass.appendChild(cartProduct);
};

const addProductInCart = () => {
  const btns = globalThis.document.querySelectorAll('.product__add');

  [...btns].map((btn) => btn.addEventListener('click', addCart));
};

const getApi = async () => {
  createElementLoad();
  try {
    const listProductInDOM = await fetchProductsList('computador');
    removeElementLoad();
    listProductInDOM.map((el) => cardProduct.appendChild(createProductElement(el)));
    addProductInCart();
  } catch (error) {
    removeElementLoad();
    createElementLoad('error');
  }
};

window.onload = () => {
  document.querySelector('.cep-button').addEventListener('click', searchCep);

  getApi();
};
