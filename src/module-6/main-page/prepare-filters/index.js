export const prepareFilters = (arr, prefix) => {
  return arr.map(item => {
    return {
      value: `${prefix}=` + item.toLowerCase().split(' ').join('_'),
      title: item
    }
  });
};
