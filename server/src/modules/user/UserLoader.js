import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { AuthenticationError } from "apollo-server-express";
import users from "./UserModel";

const secret = "ABB15D42-3BCD-498B-9095-416F24C4E821";

export const lowerCase = input => String.prototype.toLowerCase.call(input);

export const loadAllUsers = () => users;

export const getUserByName = (providedName = "") =>
  loadAllUsers().find(({ name }) => name === lowerCase(providedName));

/**
 * Verify token in request is not expired. Uses graphQL variables.
 * @param  req Request.
 * @returns {Promise} Promise to be fulfilled with { auth: String }.
 */
export const validateToken = ({ req }) => {
  const token = req.body && req.body.variables && req.body.variables.token;
  if (!token) {
    return Promise.resolve();
  }

  return new Promise((res, rej) => {
    jwt.verify(token, secret, e => {
      if (e) {
        rej(new AuthenticationError("Please sign in again"));
      }
      res({ auth: token });
    });
  });
};

/**
 * Get a new JWT token.
 * @param {User} user object to get token for.
 * @returns {String} Token.
 */
export const newToken = user =>
  jwt.sign(user, secret, {
    expiresIn: "1800s"
  }); // 30min

/**
 * Checks if a provided password matches a user's hash.
 * @param {String} password Plain text string to be validated.
 * @param {User} user User object to validate against.
 * @returns {Promise} Promise to be fulfilled with bool true.
 */
export const validatePassword = (password, user) =>
  new Promise((res, rej) => {
    bcrypt
      .compare(password, user.hash)
      .then(success => {
        if (!success) {
          return rej(Error("Incorrect password"));
        }
        return res(true);
      })
      .catch(e => rej(Error(`Server Error: ${JSON.stringify(e)}`)));
  });

/**
 * Pushes a user to database.
 * @param {User} user User type, see schema
 * @returns {String} Token.
 */
export const addUser = user => {
  if (!users.some(({ name }) => name === user.name)) users.push(user);
  return { token: newToken(user) };
};
