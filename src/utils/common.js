export function sleep(T, cb = null) {
  return new Promise((r) => {
    setTimeout(async () => {
      // eslint-disable-next-line no-unused-expressions
      let res = null;
      if (cb) {
        res = await cb();
      }
      r(res);
    }, T);
  });
}

export const isDot = (num) => {
  if (!num) {
    return 0;
  }
  return num.toString()?.indexOf('.') > -1 ? 2 : 0;
};
