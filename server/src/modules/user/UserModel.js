import bcrypt from "bcrypt";

const users = [{ name: "foton", hash: bcrypt.hashSync("foton", 1) }];

export default users;
