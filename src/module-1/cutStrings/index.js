export const cutStrings = (arr = []) => {
    if(!arr.length) return [];
    const wordsLength = arr.map(word => word.length);
    const shortestLength = Math.min(...wordsLength);
    const result = arr.map(word => word.slice(0, shortestLength));
    return result;
};
