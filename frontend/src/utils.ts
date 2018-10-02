export const log = (x: any) => console.log(x);

let id = -1;
/**
 * Produces unique number each call, starting from 0. E.g. 2.
 * @param prefix Lodash-like prefix for the id. E.g. "art".
 * @returns Number "2" or String "art2".
 */
export const getNumericId = (prefix?: string) => {
  id += 1;
  return prefix ? `${prefix}${id}` : id;
};

export const formatMessage = (message: string) =>
  message
    .split(" ")
    .slice(2)
    .join(" ");
