import gql from "graphql-tag";

export const GET_BOOKS_WITH_AUTHORS = gql`
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
