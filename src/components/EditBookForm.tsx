import React from "react";
import { useDispatch } from "react-redux";
import { useForm, SubmitHandler } from "react-hook-form";
import { TBook } from "../interfaces/Book";
import { updateBook } from "../store/slice/bookSlice";
import "../styles/_editForm.scss";

interface EditBookFormProps {
  book: TBook;
  onClose: () => void;
}

const EditBookForm: React.FC<EditBookFormProps> = ({ book, onClose }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm<TBook>({
    defaultValues: book,
  });

  const onSubmit: SubmitHandler<TBook> = (data) => {
    dispatch(updateBook(data));
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="edit-book-form">
      <input {...register("title", { required: true })} placeholder="Title" />
      <input {...register("author", { required: true })} placeholder="Author" />
      <textarea
        {...register("description", { required: true })}
        placeholder="Description"
      />
      <input
        {...register("cover", { required: true })}
        placeholder="Cover URL"
      />
      <input
        {...register("publicationDate", { required: true })}
        placeholder="Publication Date"
      />
      <div className="button-container">
        <button type="submit">Update Book</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditBookForm;
