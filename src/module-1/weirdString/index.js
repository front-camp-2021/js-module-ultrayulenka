export const weirdString = (str = "") => {
    if(!str.length) return "";
    const wordsArr = str.split(" ");
    const weirdWordsArr = wordsArr.map(word => {
        const lastLetter = word[word.length-1].toLowerCase();
        return word.slice(0, word.length-1).toUpperCase() + lastLetter;
    });
    return weirdWordsArr.join(" ");
};
