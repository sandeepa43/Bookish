import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm, SubmitHandler } from "react-hook-form";
import { addBook } from "../store/slice/bookSlice";
import { TBook } from "../interfaces/Book";
import "../styles/_addForm.scss";

const AddForm: React.FC = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm<TBook>();
  const [showForm, setShowForm] = useState<boolean>(false);
  const onSubmit: SubmitHandler<TBook> = (data) => {
    const newBook = {
      ...data,
      id: Date.now(),
      createdBy: "user",
    };
    dispatch(addBook(newBook));
    reset();
    setShowForm(false);
  };

  return (
    <div className="formContainer">
      {!showForm ? (
        <button onClick={() => setShowForm(true)} className="question-button">
          Want to add a Book???
        </button>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="add-book-form">
          <input
            {...register("title", { required: true })}
            placeholder="Enter Title"
          />
          <input
            {...register("author", { required: true })}
            placeholder="Enter Author"
          />
          <textarea
            {...register("description", { required: true })}
            placeholder="Enter Book's Description"
          />
          <input
            {...register("cover", { required: true })}
            placeholder="Enter Cover URL"
          />
          <input
            {...register("publicationDate", { required: true })}
            placeholder="Enter Publication Date"
          />
          <button type="submit">Add Book</button>
        </form>
      )}
    </div>
  );
};

export default AddForm;
