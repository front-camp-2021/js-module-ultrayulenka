export const request = async (url = '', props = {}) => {
  try {
    const response = await fetch(url.toString(), props);
    if(!response.ok) throw new Error("Not 2xx response");
    const data = await response.json();
    const headers = response.headers;

    return [data, null, headers];
  } catch (error) {
    return [null, error, null];
  }
};
