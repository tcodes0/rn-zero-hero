import * as UserLoader from "./UserLoader";

const { addUser, newUser } = UserLoader;

export const typeDefs = `
  type User {
    name: String
  }
`;

export const resolvers = {
  users: () => UserLoader.loadAllUsers()
};

export const mutations = {
  addUser: (root, args, context) => {
    const user = newUser(args.name);
    return addUser(user);
  }
};
