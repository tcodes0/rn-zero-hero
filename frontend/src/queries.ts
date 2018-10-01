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

export const isUser = gql`
  query($name: String){
    isUser(name: $name)
  }
`;
