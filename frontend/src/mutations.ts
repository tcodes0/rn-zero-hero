import gql from "graphql-tag";

export const addBook = gql`
  mutation($title: String, $name: String, $age: Int, $token: String) {
    addBook(title: $title, author: { name: $name, age: $age }, token: $token) {
      title
      author {
        name
        age
      }
    }
  }
`;

export const addUser = gql`
  mutation($name: String, $password: String) {
    addUser(name: $name, password: $password) {
      token
    }
  }
`;
