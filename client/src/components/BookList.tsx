import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { getBooks } from "../graphqlClient/queries";
import BookDetail from "./BookDetail";

interface Book {
  id: string;
  name: string;
  genre: string;
  authorId: string[];
}

const BookList = () => {
  const { loading, error, data } = useQuery(getBooks);
  const [bookId, setBookId] = useState<string>();

  if (loading) return <p>Loading books....</p>;
  if (error) return <p>Error!</p>;

  const onBookClick = (id: string) => {
    setBookId(id);
  };

  return (
    <Row>
      <Col xs={8} style={{ display: "flex", flexWrap: "wrap", height: "100%" }}>
        {data &&
          data.books.map((book: Book) => (
            <Card
              style={{ width: "33%", height: 70 }}
              key={book.id}
              border="info"
              text="info"
              className="text-center shadow mb-3"
              onClick={() => onBookClick(book.id)}
            >
              <Card.Body>{book.name}</Card.Body>
            </Card>
          ))}
      </Col>
      <Col>
        <BookDetail bookId={bookId} />
      </Col>
    </Row>
  );
};

export default BookList;
