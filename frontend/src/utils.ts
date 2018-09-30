export const log = (x: any) => console.log(x);

let id = -1;
/**
 * Returns a unique number on each call, e.g. 2
 * @param prefix Lodash-like prefix for the id, e.g. "art2"
 */
export const getNumericId = (prefix?: string) => {
  id += 1;
  return prefix ? `${prefix}${id}` : id;
};
