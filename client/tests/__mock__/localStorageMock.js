const localStorageMock = (() => {
  let store = {};

  return {
    getItem(key) {
      return store[key] || null;
    },
    setItem(key, value) {
      store[key] = value;
    },
    clear() {
      store = {};
    },
    removeItem(key) {
      store[key] = null;
    }
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

export default localStorageMock;
