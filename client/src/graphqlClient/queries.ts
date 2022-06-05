import { gql } from "@apollo/client";

export const getBooks = gql`
  query getBooksQuery {
    books {
      id
      name
    }
  }
`;

export const getBookDetail = gql`
  query getBookDetailQuery($id: ID!) {
    book(id: $id) {
      id
      name
      genre
      author {
        id
        name
        age
        books {
          id
          name
        }
      }
    }
  }
`;

export const getAuthors = gql`
  query getAllAuthors {
    authors {
      id
      name
    }
  }
`;
