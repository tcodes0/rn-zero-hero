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

export const users = gql`
  {
    users {
      name
    }
  }
`;
