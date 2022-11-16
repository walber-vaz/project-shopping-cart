export const fetchProduct = async (id) => {
  if (!id) throw new Error('ID não informado');

  const res = await fetch(`https://api.mercadolibre.com/items/${id}`);
  const data = res.json();

  return data;
};

export const fetchProductsList = async (query) => {
  if (!query) throw new Error('Termo de busca não informado');

  const res = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${query}`);
  const data = await res.json();
  const obj = data.results;

  return obj;
};
