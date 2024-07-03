import React from "react";
import "../styles/_pagination.scss";

interface PaginationProps {
  totalBooks: number;
  booksPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalBooks,
  booksPerPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalBooks / booksPerPage);

  return (
    <div className="pagination">
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => onPageChange(index + 1)}
          className={currentPage === index + 1 ? "active" : ""}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
