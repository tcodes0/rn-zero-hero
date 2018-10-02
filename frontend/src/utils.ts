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

/**
 * Discards the first two words of an error message.
 * @param message Error.message
 * @returns sliced message.
 */
export const formatMessage = (message: string) =>
  message
    .split(" ")
    .slice(2)
    .join(" ");

/**
 * Safely get params from navigation.state
 * @param props Component props.
 * @param key Property to access in navigation state
 */
export const getNavParams = (props: any, key?: string) => {
  const params =
    props &&
    props.navigation &&
    props.navigation.state &&
    props.navigation.state.params;

  if (params == undefined) return undefined;
  if (!key) return params;

  const result = params[key];
  if (result == undefined) return undefined;
  return result.length ? result : undefined;
};

export const filterFactory = selector => (sections, query) =>
  sections.filter(section => selector(section, query));
