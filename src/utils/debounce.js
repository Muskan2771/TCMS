// utils/debounce.js

let timeoutId;

function debounce(func, wait) {
  return function (...args) {
    const context = this;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(context, args), wait);
  };
}

export { debounce };
