import React from "react";
import { useHistory } from "react-router";

import QuestionForm from "../ui/questionForm";

import { useTasks } from "../../hooks/useTasks";
import { useCategories } from "../../hooks/useCategories";

const QuestionCreatePage = () => {
  const history = useHistory();
  const { createTask } = useTasks();
  const { categories } = useCategories();

  const getCategories = (elements) => {
    // elements -массив объектов value / label
    // categories - массив объектов _id / name / color
    const categoriesArray = [];
    for (const elem of elements) {
      for (const category in categories) {
        if (elem.value === categories[category]._id) {
          categoriesArray.push(categories[category]);
        }
      }
    }
    return categoriesArray;
  };
  const handleSubmit = (form) => {
    createTask({
      ...form,
      categories: getCategories(form.categories),
    }).then(() => history.push("/updateTest"));
  };

  const handleRedirect = (path) => {
    history.push(path);
  };

  return (
    <div className="row">
      <div className="col-md-7 mx-auto">
        <div className="card my-5">
          <div className="card-body">
            <h2 className=" card-title text-center">Create</h2>
            <QuestionForm
              onSubmit={handleSubmit}
              categories={categories}
              onRedirect={handleRedirect}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCreatePage;
