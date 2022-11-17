export const getAddress = async (cep) => {
  const firstApi = `https://cep.awesomeapi.com.br/json/${cep}`;
  const secondApi = `https://brasilapi.com.br/api/cep/v2/${cep}`;

  const allPromises = await Promise.any([
    fetch(firstApi),
    fetch(secondApi),
  ])
    .then((res) => res.json())
    .catch(() => {
      throw new Error('CEP não encontrado');
    });

  return allPromises;
};

export const searchCep = async () => {
  const classCep = document.querySelector('.cart__address');

  try {
    const inputCep = document.querySelector('.cep-input').value;
    const fetchApi = await getAddress(inputCep);

    if (fetchApi.code !== 'NotFound') {
      const { address, district, city, state } = fetchApi;
      const insertIntoDOM = `${address} - ${district} - ${city} - ${state}`;

      classCep.innerHTML = insertIntoDOM;
      return;
    }
    const { street, neighborhood, city, state } = fetchApi;
    const insertIntoDOM = `${street} - ${neighborhood} - ${city} - ${state}`;

    classCep.innerHTML = insertIntoDOM;
    return;
  } catch (error) {
    classCep.innerHTML = error.message;
  }
};
