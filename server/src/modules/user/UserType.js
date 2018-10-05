import * as UserLoader from "./UserLoader";
import UserModel from "./UserModel";

const {
  addUser,
  loadAllUsers,
  newToken,
  validatePassword,
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
  addUser: (root, args) => addUser(args),
  login: (root, { name: inputName, password }) => {
    const name = lowerCase(inputName);
    return UserModel.find({ name }).then(result => {
      if (!result.length) {
        throw Error("User doesn't exist. Please register.");
      }

      const [user] = result;
      return validatePassword(password, user)
        .then(res => {
          if (res) {
            const token = newToken({ name });
            return { token };
          }
          throw Error("Server Error");
        })
        .catch(e => {
          throw e;
        });
    });
  }
};
