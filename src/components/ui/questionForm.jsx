import React from "react";
import TextAreaField from "../common/form/textAreaField";
import MultiSelectField from "../common/form/multiSelectField";
import useForm from "../../hooks/useForm";

const QuestionForm = ({ data, onSubmit, categories, onRedirect }) => {
  const { form, handleChange, handleSubmit, isValid, errors } = useForm(
    data,
    onSubmit
  );
  return (
    <form onSubmit={handleSubmit}>
      <TextAreaField
        name="question"
        placeholder="Вопрос"
        rows="6"
        value={form.question || ""}
        error={errors.question}
        onChange={handleChange}
        autoFocus
      />
      {/* <TextField
        name="question"
        placeholder="Question"
        value={form.question || ""}
        error={errors.question}
        onChange={handleChange}
        autoFocus
      /> */}
      <TextAreaField
        name="answer"
        placeholder="Ответ"
        rows="8"
        value={form.answer || ""}
        error={errors.answer}
        onChange={handleChange}
      />
      <MultiSelectField
        defaultValue={form.categories || []}
        name="categories"
        value
        onChange={handleChange}
        options={categories}
      />

      <div className="d-flex flex-column flex-md-row">
        <button
          className="btn btn-outline-secondary me-md-1  mb-1"
          onClick={() => onRedirect("/tests")}
          type="button"
        >
          <i className="bi bi-caret-left"></i>
          Назад
        </button>
        <button
          className="btn btn-primary me-md-1 mb-1"
          disabled={!isValid}
          type="submit"
        >
          Создать
        </button>
        <button
          className="btn btn-success ms-md-auto mb-1"
          onClick={() => onRedirect("/category")}
        >
          Создать категорию
          <i className="bi bi-plus"></i>
        </button>
      </div>
    </form>
  );
};

export default QuestionForm;
