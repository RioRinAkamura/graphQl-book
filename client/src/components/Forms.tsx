import { useQuery, useMutation } from "@apollo/client";
import React, { FormEvent, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { getAuthors, getBooks } from "../graphqlClient/queries";
import {
  createAuthorMutation,
  createBookMutation,
} from "../graphqlClient/mutations";

export interface Author {
  id?: String;
  name: string;
  age: number;
}

export interface Book {
  name: string;
  genre: string;
  authorId: string;
}

const Forms = () => {
  const { loading, error, data } = useQuery(getAuthors);
  const [addBook] = useMutation(createBookMutation);
  const [addAuthor] = useMutation(createAuthorMutation);
  const [newBook, setNewBook] = useState<Book>({
    name: "",
    genre: "",
    authorId: "",
  });

  const [newAuthor, setNewAuthor] = useState<Author>({
    name: "",
    age: 0,
  });

  const onInputChange = (e: any) => {
    setNewBook({
      ...newBook,
      [e.target.name]: e.target.value,
    });
  };

  const onInputAuthorChange = (e: any) => {
    setNewAuthor({
      ...newAuthor,
      [e.target.name]: e.target.value,
    });
  };

  const onAddBook = (e: FormEvent) => {
    e.preventDefault();
    addBook({
      variables: {
        name: newBook.name,
        genre: newBook.genre,
        authorId: newBook.authorId,
      },
      refetchQueries: [{ query: getBooks }],
    });
    console.log("newBook", newBook);
    setNewBook({
      name: "",
      genre: "",
      authorId: "",
    });
  };

  const onAddAuthor = (e: FormEvent) => {
    e.preventDefault();
    console.log(newAuthor);
    addAuthor({
      variables: {
        name: newAuthor.name,
        age: Number(newAuthor.age),
      },
      refetchQueries: [{ query: getAuthors }],
    });
  };

  if (loading) return <p>Loading authors....</p>;
  if (error) return <p>Error!</p>;

  return (
    <Row>
      <Col xs={6}>
        <Form onSubmit={(e) => onAddBook(e)}>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Book name"
              name="name"
              value={newBook.name}
              onChange={onInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Book genre"
              name="genre"
              value={newBook.genre}
              onChange={onInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              as="select"
              name="authorId"
              value={newBook.authorId}
              onChange={onInputChange}
            >
              <option value="" disabled>
                Select author
              </option>
              {data &&
                data.authors.map((author: any) => (
                  <option key={author.id} value={author.id}>
                    {author.name}
                  </option>
                ))}
            </Form.Control>
          </Form.Group>
          <Button className="float-right" variant="info" type="submit">
            Add book
          </Button>
        </Form>
      </Col>
      <Col xs={6}>
        <Form onSubmit={(e) => onAddAuthor(e)}>
          <Form.Group className="mb-3 invisible">
            <Form.Control />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Author name"
              name="name"
              value={newAuthor.name}
              onChange={onInputAuthorChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="number"
              placeholder="Author age"
              name="age"
              value={newAuthor.age}
              onChange={onInputAuthorChange}
            />
          </Form.Group>
          <Button className="float-right" variant="info" type="submit">
            Add author
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default Forms;
