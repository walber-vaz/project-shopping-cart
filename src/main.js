import { searchCep } from './helpers/cepFunctions';
import { fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement } from './helpers/shopFunctions';

import './style.css';

const cardProduct = document.querySelector('section .products');

const createElementLoad = () => {
  const h1 = globalThis.document.createElement('h1');

  h1.innerText = 'carregando...';
  h1.className = 'loading';
  cardProduct.appendChild(h1);
}

const listProductInDOM = await fetchProductsList('computador');
listProductInDOM.map((el) => cardProduct.appendChild(createProductElement(el)));

document.querySelector('.cep-button').addEventListener('click', searchCep);