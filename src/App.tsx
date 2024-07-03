import React, { useState } from "react";
import "./styles/global.scss";
import List from "./components/List";
import AddForm from "./components/AddForm";
import BookDetail from "./components/BookDetail";
import { TBook } from "./interfaces/Book";
import Modal from "./CommonComponents/Modal";

const App: React.FC = () => {
  const [books, setBooks] = useState<TBook[]>([]);
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);
  const [showDetailModal, setShowDetailModal] = useState<boolean>(false);
  const handleAddBook = (book: TBook) => {
    setBooks([...books, book]);
  };

  const handleViewDetail = (id: number) => {
    setSelectedBookId(id);
    setShowDetailModal(true);
  };

  const handleCloseDetail = () => {
    setSelectedBookId(null);
    setShowDetailModal(false);
  };

  return (
    <div className="app">
      <div className="inner-app-container">
        <div className="app-title-container">
          <div className="app-title">
            Bookish
            <img
              className="app-subTitle"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Book_font_awesome.svg/1200px-Book_font_awesome.svg.png"
            />
          </div>
        </div>
        <AddForm />
        <List onBookClick={handleViewDetail} />
        {selectedBookId !== null && (
          <Modal show={showDetailModal} handleClose={handleCloseDetail}>
            <BookDetail bookId={selectedBookId} onClose={handleCloseDetail} />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default App;
