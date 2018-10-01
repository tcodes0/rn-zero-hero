import * as UserLoader from "./UserLoader";

const { addUser, newUser, newToken } = UserLoader;

const lowerCase = input => String.prototype.toLowerCase.call(input);

export const typeDefs = `
  type User {
    name: String
    hash: String
  }
`;

export const resolvers = {
  isUser: (root, args) => {
    const users = UserLoader.loadAllUsers();
    return args.name && users.some(({ name }) => name === lowerCase(args.name));
  }
};

export const mutations = {
  addUser: (root, args) => {
    const user = newUser(lowerCase(args.name));
    return addUser(user);
  }
};
