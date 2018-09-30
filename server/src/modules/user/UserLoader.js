const users = [
  { name: "jabur" },
  { name: "guilherme jabur" },
  { name: "guilherme" },
  { name: "foton" },
  { name: "thomazella" },
  { name: "raphael thomazella" },
  { name: "raphael" }
];

/**
 * Pushes a user to database. Returns the user.
 * @param {User} user User type, see schema
 */
export const addUser = user => {
  if (!users.some(({name}) => name === user.name)) users.push(user)
  return user;
};

/**
 * Create a user object. Returns the user.
 * @param {String} name User name
 */
export const newUser = name => ({ name });

export const loadAllUsers = (root, args, context) => {
  return users;
};
