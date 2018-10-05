import bcrypt from "bcrypt";
import * as UserLoader from "./UserLoader";

const {
  addUser,
  loadAllUsers,
  newToken,
  validatePassword,
  getUserByName,
  lowerCase
} = UserLoader;

export const typeDefs = `
  type User {
    name: String!
    hash: String!
  }
`;

export const resolvers = {
  dev_users: () => loadAllUsers()
};

export const mutations = {
  addUser: (root, args) => {
    const { name, password } = args;
    if (getUserByName(name)) throw Error("User already registered");
    const user = {
      name: lowerCase(name),
      hash: bcrypt.hashSync(password, 8)
    };
    return addUser(user);
  },
  login: (root, args) => {
    const { name, password } = args;
    const user = getUserByName(name);
    if (!user) {
      throw Error("User not registered");
    }

    return validatePassword(password, user)
      .then(res => {
        if (res) {
          const token = newToken(user);
          // console.log(`login ${user.name} with token - ${token}\n\n`);
          return { token };
        }
        throw Error("Server Error");
      })
      .catch(e => {
        throw e;
      });
  }
};
