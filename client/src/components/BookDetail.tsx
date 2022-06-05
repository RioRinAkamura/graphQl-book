import { useQuery } from "@apollo/client";
import React from "react";
import { Card } from "react-bootstrap";
import { getBookDetail } from "../graphqlClient/queries";

interface BookDetailProps {
  bookId?: string;
}

const BookDetail = ({ bookId }: BookDetailProps) => {
  const { loading, error, data } = useQuery(getBookDetail, {
    variables: {
      id: bookId,
    },
    skip: bookId === null,
  });
  if (loading) return <p>Loading book detail....</p>;
  if (error) return <p>Select book!</p>;
  const book = data.book;

  return (
    <Card bg="info" text="white" className="shadow">
      <Card.Body>
        <Card.Title>{book.name}</Card.Title>
        <Card.Subtitle>{book.genre}</Card.Subtitle>
        <p></p>
        <p>Author: {book.author.name}</p>
        <p>Age: {book.author.age}</p>

        <br />
        <p>All books by {book.author.name}</p>
        <ul>
          {book.author.books.map((book: any) => (
            <li key={book.id}>{book.name}</li>
          ))}
        </ul>
      </Card.Body>
    </Card>
  );
};

export default BookDetail;
