import gql from "graphql-tag";

export const booksWithAuthors = gql`
  {
    books {
      title
      author {
        name
        age
      }
    }
  }
`;

export const login = gql`
  query($name: String, $password: String) {
    login(name: $name, password: $password) {
      token
    }
  }
`;
