const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

const fetchApi = async (url) => {
  const response = await fetch(url, {
    method: "GET",
    headers: headers,
  });
  return await response.json();
};

export const GetWorldData = async () => {
  const worldData = await fetchApi("http://127.0.0.1:5000/getcoviddataworld");
  return await worldData;
};

export const GetCountryData = async (country) => {
  console.log(country);
  const countryData = await fetchApi(
    `http://127.0.0.1:5000/getcoviddatabycountry/${country}`
  );
  return await countryData;
};

export const GetAllTimeCountryStatus = async (country) => {
  const allTimeData = await fetchApi(
    `https://api.covid19api.com/total/dayone/country/${country}`
  );
  return allTimeData;
};
