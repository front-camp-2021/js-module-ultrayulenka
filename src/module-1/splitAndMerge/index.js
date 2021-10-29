export const splitAndMerge = (str = "", separator = "") => {
    if(!str) return "";
    if(!separator) return str;
    const wordsArr = str.split(" ").map(word => word.split(""));
    return wordsArr.map(letters => letters.join(separator)).join(" ");
};
