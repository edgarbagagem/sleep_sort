/**
 * This function sorts an array using timeouts.
 * @param {Array<T>} array - The array to sort.
 * @param {function(T): number} [delayFunction] - Optional callback to determine the delay for each item.
 * By default, numbers use their value in milliseconds, and strings use their length in milliseconds.
 * @returns {Promise<Array<T>>} - A promise that resolves with the sorted array.
 * @throws If a custom type is provided and no custom delay function is given, the promise will reject with an error.
 */
function sleep_sort<T>(
  array: Array<T>,
  delayFunction?: (item: T) => number
): Promise<Array<T>> {
  if (!array || array.length == 0) return Promise.resolve(array);

  const getDelay = delayFunction || defaultDelayFunction;

  return new Promise((resolve, reject) => {
    try {
      let result = new Array<T>();
      let count = 0;
      for (let i = 0; i < array.length; i++) {
        const delay = getDelay(array[i]);
        setTimeout(() => {
          result.push(array[i]);
          count++;
          if (count === array.length) {
            resolve(result);
          }
        }, delay);
      }
    } catch (error) {
      reject(error);
    }
  });
}

const defaultDelayFunction = <T>(item: T): number => {
  if (typeof item === "number") return item;
  if (typeof item === "string") return item.length;
  throw new Error(
    "Default delay function only supports numbers and strings. Provide a custom delayFunction for other types."
  );
};

export { sleep_sort };
