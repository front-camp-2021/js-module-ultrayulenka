export const debounce = (fn, delay = 0) => {
    let cooldown = false;
    return function func(...args) {
      if (cooldown) return;
      cooldown = true;
      setTimeout(() => {
        cooldown = false;
      }, delay);
      return fn.call(this, ...args);
    };
  }


