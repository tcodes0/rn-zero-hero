export const log = (x: any) => console.log(x);

let id = -1;
export const getNumericId = (prefix?: string) => {
  id += 1;
  return prefix ? `${prefix}${id}` : id;
};
