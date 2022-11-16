import './mocks/fetchSimulator';
import { fetchProductsList } from '../helpers/fetchFunctions';
import computadorSearch from './mocks/search';

// implemente seus testes aqui
describe('Teste a função fetchProductsList', () => {
  it('1 - Teste se fetchProductsList é uma função;', () => {
    expect(typeof fetchProductsList).toBe('function');
  });

  it('2 - Execute a função fetchProductsList com o argumento \'computador\' e teste se fetch foi chamada;', async () => {
    await fetchProductsList('computador');
    expect(fetch).toHaveBeenCalled();
  });

  it('3 - Teste se, ao chamar a função fetchProductsList com o argumento \'computador\', a função fetch utiliza o endpoint \'https://api.mercadolibre.com/sites/MLB/search?q=computador\'', async () => {
    await fetchProductsList('computador');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  });
  
  it('4 - Teste se o retorno da função fetchProductsList com o argumento \'computador\' é uma estrutura de dados igual ao objeto computadorSearch, que já está importado no arquivo', async () => {
    const obj = await fetchProductsList('computador');
    expect(obj).toEqual(computadorSearch);
  });
  
  it('5 - Teste se, ao chamar a função fetchProductsList sem argumento, retorna um erro com a mensagem: \'Termo de busca não informado\'', async () => {
    expect(() => fetchProductsList()).rejects.toThrowError('Termo de busca não informado');
  });
});
