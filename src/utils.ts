export const createNonce = (length: number) => {
  let last: number | null = null,
    repeat = 0;

  if (typeof length == "undefined") length = 15;

  return function() {
    let now = Math.pow(10, 2) * +new Date();

    if (now === last) {
      repeat++;
    } else {
      repeat = 0;
      last = now;
    }

    let s = (now + repeat).toString();
    return +s.substr(s.length - length) + "";
  };
};
