import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { deleteBook, setBooks } from "../store/slice/bookSlice";
import { toggleFavorite } from "../store/slice/favoriteSlice";
import BookCard from "./BookCard";
import Pagination from "./Pagination";
import "../styles/_list.scss";
import { fetchBooks } from "../services/api";
import { TBook } from "../interfaces/Book";
interface ListProps {
  onBookClick: (id: number) => void;
}

const List: React.FC<ListProps> = ({ onBookClick }) => {
  const dispatch = useDispatch();
  const { books, additionalBooks, loading, error } = useSelector(
    (state: RootState) => state.books
  );
  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites
  );
  const [currentPage, setCurrentPage] = React.useState(1);
  const getBooks = async () => {
    const result = await fetchBooks();
    dispatch(setBooks(result));
  };

  useEffect(() => {
    getBooks();
  }, [dispatch]);

  const handleDelete = (id: number) => {
    dispatch(deleteBook(id));
  };
  const allBooks = [...books, ...additionalBooks];
  const booksPerPage = 5;
  const paginatedBooks = allBooks.slice(
    (currentPage - 1) * booksPerPage,
    currentPage * booksPerPage
  );

  return (
    <div className="list-container">
      <div className="book-list">
        {paginatedBooks.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            isFavorite={favorites.includes(book.id)}
            onToggleFavorite={() => dispatch(toggleFavorite(book.id))}
            onViewDetail={(id: number | any) => {
              onBookClick(id);
            }}
            handleDelete={(id: number) => {
              handleDelete(id);
            }}
          />
        ))}
      </div>
      <Pagination
        totalBooks={allBooks.length}
        booksPerPage={booksPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default List;
