import { gql } from "@apollo/client";

export const createBookMutation = gql`
  mutation addSingleBookMutatiton(
    $name: String
    $genre: String
    $authorId: ID!
  ) {
    createBook(name: $name, genre: $genre, authorId: $authorId) {
      id
      name
    }
  }
`;

export const createAuthorMutation = gql`
  mutation addAuthor($name: String, $age: Int) {
    createAuthor(name: $name, age: $age) {
      id
      name
      age
    }
  }
`;
