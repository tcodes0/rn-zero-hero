import gql from "graphql-tag";

export const ADDBOOK = gql`
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
