import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const users = [
  { name: "jabur", hash: "jabur" },
  { name: "guilherme jabur", hash: "guilherme jabur" },
  { name: "guilherme", hash: "guilherme" },
  { name: "foton", hash: "foton" },
  { name: "thomazella", hash: "thomazella" },
  { name: "raphael thomazella", hash: "raphael thomazella" },
  { name: "raphael", hash: "raphael" }
];

const secret = "ABB15D42-3BCD-498B-9095-416F24C4E821";

/**
 * Get a new JWT token.
 * @param {User} user object to get token for.
 * @returns {String} Token.
 */
export const newToken = user => jwt.sign(user, secret, { expiresIn: "1800s" });

/**
 * Pushes a user to database.
 * @param {User} user User type, see schema
 * @returns {String} Token.
 */
export const addUser = user => {
  if (!users.some(({ name }) => name === user.name)) users.push(user);
  return { token: newToken(user) };
};

/**
 * Checks if a provided password matches a user's hash.
 * @param {String} password Plain text string to be validated.
 * @param {User} user User object to validate against.
 * @returns {Promise} Promise to be fulfilled with the user argument.
 */
export const validatePassword = (password, user) =>
  new Promise((res, rej) => {
    bcrypt
      .compare(password, user.hash)
      .then(success => {
        if (!success) {
          return rej(Error("Incorrect password"));
        }
        return res(user);
      })
      .catch(e => rej(Error(`Server Error: ${JSON.stringify(e)}`)));
  });

/**
 * Verify a token isn't expired
 * @param {String} token Token to verify.
 * @returns {Promise} Promise to be fulfilled with token argument.
 */
export const validateToken = token =>
  new Promise((res, rej) => {
    jwt.verify(token, secret, (e, decoded) => {
      if (e) rej(Error("Invalid Token"));
      console.log(decoded);
      res(token);
    });
  });

export const loadAllUsers = () => users;
