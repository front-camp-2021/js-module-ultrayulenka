export const request = async (url = '', props = {}) => {
  try {
    const response = await fetch(url.toString(), props);
    const data = await response.json();

    return [data, null];
  } catch (error) {
    return [null, error];
  }
};
