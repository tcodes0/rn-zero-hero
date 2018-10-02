import bcrypt from "bcrypt";
import * as UserLoader from "./UserLoader";

const { addUser, validatePassword, loadAllUsers, newToken } = UserLoader;

const lowerCase = input => String.prototype.toLowerCase.call(input);

const getUserByName = (providedName = "") =>
  loadAllUsers().find(({ name }) => name === lowerCase(providedName));

export const typeDefs = `
  type User {
    name: String
    hash: String
  }
`;

export const resolvers = {
  login: (root, args) => {
    const { name, password } = args;
    const user = getUserByName(name);
    if (!user) {
      throw Error("User not registered");
    }

    return validatePassword(password, user)
      .then(res => {
        if (res) return { token: newToken(user) };
        throw Error("Server Error");
      })
      .catch(e => {
        throw e;
      });
  }
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
  }
};
