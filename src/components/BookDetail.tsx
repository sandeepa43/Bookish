import React, { useEffect, useState } from "react";
import { fetchBookDetail } from "../services/api";
import { TBook } from "../interfaces/Book";
import "../styles/_bookDetail.scss";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
interface BookDetailProps {
  bookId: number;
  onClose: () => void;
}

const BookDetail: React.FC<BookDetailProps> = ({ bookId, onClose }) => {
  const [book, setBook] = useState<TBook | null>(null);
  const { additionalBooks } = useSelector((state: RootState) => state.books);
  const getData = async () => {
    const fetchData = async () => {
      const result = await fetchBookDetail(bookId);
      setBook(result);
      if (result?.id == undefined) {
        const findBook = await additionalBooks.find(
          (item: TBook) => item.id == bookId
        );
        if (findBook !== undefined) {
          setBook(findBook);
        }
      }
    };

    fetchData();
  };
  useEffect(() => {
    getData();
  }, [bookId, additionalBooks]);

  if (!book) return <div>Loading...</div>;

  const getDate = () => {
    const publicationDate =
      book && book.publicationDate ? book?.publicationDate : "";
    return new Date(publicationDate);
  };

  return (
    <div className="book-detail-container">
      <img src={book.cover} alt={book.title} className="book-image" />
      <div className="book-detail">
        <h2>{book.title}</h2>
        <h3> By ~ {book.author}</h3>
        <p className="book-description">{book.description}</p>
        <p className="publish-date"> Published on ~ {getDate()?.toString()}</p>
      </div>
    </div>
  );
};

export default BookDetail;
