import gql from "graphql-tag";

export const addBook = gql`
  mutation($title: String, $name: String, $age: Int) {
    addBook(title: $title, author: { name: $name, age: $age }) {
      title
      author {
        name
        age
      }
    }
  }
`;

export const addUser = gql`
  mutation($name: String) {
    addUser(name: $name) {
      name
    }
  }
`;
