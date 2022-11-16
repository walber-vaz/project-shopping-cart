
export const fetchProduct = () => {
  // seu código aqui
};

export const fetchProductsList = async (product) => {
  if (!product) throw new Error('Termo de busca não informado');

  const res = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${product}`);
  const data = await res.json();

  return data.results;
};
