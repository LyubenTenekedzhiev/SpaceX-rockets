export const fetchRocketData = async (url, fetching, rocketData) => {
  if (!url) return [];
  fetching(true);
  try {
    const dataResponse = await fetch(url);
    const dataJSON = await dataResponse.json();
    const data = dataJSON;
    rocketData(data);
    fetching(false);
  } catch (error) {
    console.log(error);
    fetching(true);
  }
};
