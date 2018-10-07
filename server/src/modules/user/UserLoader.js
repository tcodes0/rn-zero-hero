import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { AuthenticationError } from "apollo-server-express";
import UserModel from "./UserModel";

const { ObjectId } = mongoose.Types;
const secret = "ABB15D42-3BCD-498B-9095-416F24C4E821";

export const lowerCase = input => String.prototype.toLowerCase.call(input);

export const loadAllUsers = () => {
  return UserModel.find({}).then(result => {
    return result;
  });
};

/**
 * Verify token in request is not expired.
 * @param  req Request.
 * @returns {Promise} Promise to be fulfilled with { auth: String }.
 */
export const validateToken = ({ req }) => {
  const { token } = req.headers;
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
  }).catch(e => e && console.log(e));
};

/**
 * Get a new JWT token.
 * @param {User} user object to get token for.
 * @returns {String} Token.
 */
export const newToken = user =>
  jwt.sign(user, secret, {
    expiresIn: "43200s"
  }); // 12h

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

export const addUser = ({ name: inputName, password }) => {
  const name = lowerCase(inputName);
  return UserModel.find({ name }).then(found => {
    if (found.length) {
      throw Error("User already registered.");
    }
    const hash = bcrypt.hashSync(password, 4);
    const _id = new ObjectId();
    const user = new UserModel({ name, hash, _id });
    user.save();
    const token = newToken({ name });
    return { token };
  });
};
