export const cutStrings = (arr = []) => {
    if(!arr.length) return [];
    const wordsLength = arr.map(word => word.length);
    const shortestLength = Math.min(...wordsLength);
    return arr.map(word => word.slice(0, shortestLength));
};
