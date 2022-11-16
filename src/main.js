import { searchCep } from './helpers/cepFunctions';
import { fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement } from './helpers/shopFunctions';

import './style.css';

const cardProduct = document.querySelector('section .products');

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

const removeElementLoad = () => document.querySelector('.loading').remove();

const getApi = async () => {
  createElementLoad();
  try {
    const listProductInDOM = await fetchProductsList('computador');
    listProductInDOM.map((el) => cardProduct.appendChild(createProductElement(el)));
    removeElementLoad();
  } catch (error) {
    removeElementLoad();
    createElementLoad('error');
  }
};

window.onload = () => {
  document.querySelector('.cep-button').addEventListener('click', searchCep);

  getApi();
};
