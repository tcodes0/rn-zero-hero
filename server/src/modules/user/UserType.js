import * as UserLoader from "./UserLoader";

const { addUser, newUser } = UserLoader;

const lowerCase = input => String.prototype.toLowerCase.call(input);

export const typeDefs = `
  type User {
    name: String
  }
`;

export const resolvers = {
  isUser: (root, args, context) => {
    const users = UserLoader.loadAllUsers();
    return args.name && users.some(({ name }) => name === lowerCase(args.name));
  }
};

export const mutations = {
  addUser: (root, args, context) => {
    const user = newUser(lowerCase(args.name));
    return addUser(user);
  }
};
