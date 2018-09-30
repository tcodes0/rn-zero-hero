import gql from "graphql-tag";

export const BOOKS_WITH_AUTHORS = gql`
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
