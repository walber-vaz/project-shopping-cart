import { searchCep } from './helpers/cepFunctions';
import { fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement } from './helpers/shopFunctions'

import './style.css';

const cardProduct = document.querySelector('section .products');

const listProductInDOM = await fetchProductsList('computer');
listProductInDOM.map((el) => cardProduct.appendChild(createProductElement(el)));

document.querySelector('.cep-button').addEventListener('click', searchCep);