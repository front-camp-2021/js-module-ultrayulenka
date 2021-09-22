import '@testing-library/jest-dom';
import fetchMock from 'jest-fetch-mock';
import prettyFormat from 'pretty-format';

fetchMock.enableMocks();

const { DOMElement, DOMCollection } = prettyFormat.plugins;

const prettyDOM = (htmlElement, maxLength = 7000) => {
  const debugContent = prettyFormat(htmlElement, {
    plugins: [DOMElement, DOMCollection],
    printFunctionName: false,
    highlight: true,
    min: true
  });

  return htmlElement.outerHTML.length > maxLength
    ? `${debugContent.slice(0, maxLength)}...`
    : debugContent;
};

console.log = (...args) => {
  console.trace(...args.map(item => {
    if (item instanceof HTMLElement) {
      return prettyDOM(item);
    }

    return item;
  }));
};

