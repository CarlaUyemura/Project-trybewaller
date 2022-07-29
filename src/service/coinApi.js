const coinApi = async () => {
  const url = 'https://economia.awesomeapi.com.br/json/all';
  const response = await fetch(url);
  const obj = await response.json();
  return obj;
};

export default coinApi;
