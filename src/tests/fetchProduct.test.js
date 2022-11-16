import './mocks/fetchSimulator';
import { fetchProduct } from '../helpers/fetchFunctions';
import product from './mocks/product';

// implemente seus testes aqui
describe('Teste a função fetchProduct', () => {
  it('1 - Teste se fetchProductsList é uma função;', () => {
    expect(typeof fetchProduct).toBe('function');
  });

  it('2 - Execute a função fetchProductsList com o argumento \'computador\' e teste se fetch foi chamada;', async () => {
    await fetchProduct('computador');
    expect(fetch).toHaveBeenCalled();
  });

  it('3 - Teste se, ao chamar a função fetchProductsList com o argumento \'computador\', a função fetch utiliza o endpoint \'https://api.mercadolibre.com/sites/MLB/search?q=computador\'', async () => {
    await fetchProduct('computador');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  });

  it('4 - Teste se o retorno da função fetchProductsList com o argumento \'computador\' é uma estrutura de dados igual ao objeto computadorSearch, que já está importado no arquivo', async () => {
    await fetchProduct('computador');
    expect(fetch).toBe(product);
  });

  it('5 - Teste se, ao chamar a função fetchProductsList sem argumento, retorna um erro com a mensagem: \'Termo de busca não informado\'', async () => {
    await fetchProduct();
    expect(fetch).toBe('Termo de busca não informado');
  });
});
