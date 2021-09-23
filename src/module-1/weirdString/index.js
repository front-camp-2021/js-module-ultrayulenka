export const weirdString = (str = "") => {
    if(!str.length) return "";
    const wordsArr = str.split(" ");
    const weirdWordsArr = wordsArr.map(word => word.slice(0, word.length-1).toUpperCase() + word[word.length-1]);
    return weirdWordsArr.join(" ");
};
