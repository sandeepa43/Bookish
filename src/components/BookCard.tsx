import React, { useState } from "react";
import { TBook } from "../interfaces/Book";
import FavoritesIcon from "./FavoritesIcon";
import "../styles/_bookCard.scss";
import EditBookForm from "./EditBookForm";

interface BookCardProps {
  book: TBook;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
  onViewDetail: (id: number) => void;
  handleDelete: (id: number) => void;
}

const BookCard: React.FC<BookCardProps> = ({
  book,
  isFavorite,
  onToggleFavorite,
  onViewDetail,
  handleDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCloseEditForm = () => {
    setIsEditing(false);
  };

  return (
    <div className="book-card">
      {isEditing ? (
        <EditBookForm book={book} onClose={handleCloseEditForm} />
      ) : (
        <>
          {book?.createdBy == "user" ? (
            <img
              className="delete-icon"
              onClick={() => {
                handleDelete(book.id);
              }}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqdV_TgwjyVgB6KDmAJGN3oT9XTME0sflargbMBwODuYwJA19RDXRS0aDEtDkXmZdL2aU&usqp=CAU"
            />
          ) : null}

          <img src={book.cover} className="book-cover" alt={book.title} />
          <h3 className="book-title">
            {book.title} <br />~{book.author}
            <FavoritesIcon
              isFavorite={isFavorite}
              onToggleFavorite={() => onToggleFavorite(book.id)}
            />
          </h3>
        </>
      )}
      {book?.createdBy == "user" && (
        <button className="edit-button" onClick={handleEditClick}>
          <img src="https://cdn.iconscout.com/icon/free/png-256/free-edit-2653317-2202989.png" />
        </button>
      )}
      <button className="details-button" onClick={() => onViewDetail(book.id)}>
        View Details
      </button>
    </div>
  );
};

export default BookCard;
