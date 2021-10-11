export const debounce = (fn, delay = 0) => {
    let cooldown = false;
    return function func(...args) {
      if (cooldown) return;
      cooldown = true;
      setTimeout(() => {
        cooldown = false;
        fn.call(this, ...args);
      }, delay);
    };
  }


