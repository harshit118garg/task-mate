export const wait = (ms: number, callback: () => void): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      callback();
      resolve();
    }, ms);
  });
};
