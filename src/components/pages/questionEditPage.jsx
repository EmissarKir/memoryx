import React from "react";
import { useHistory, useParams } from "react-router";
import { useTasks } from "../../hooks/useTasks";
import { useCategories } from "../../hooks/useCategories";
import QuestionForm from "../ui/questionForm";

const QuestionEditPage = () => {
  const history = useHistory();
  const { taskId } = useParams();
  const { getTask, updateTask } = useTasks();
  const task = getTask(taskId);
  console.log("task", task);
  const { categories } = useCategories();

  const getCategories = (elements) => {
    // elements -массив объектов value / label
    // categories - массив объектов _id / name / color
    const categoriesArray = [];
    for (const elem of elements) {
      for (const category in categories) {
        if (elem.value === categories[category].key) {
          categoriesArray.push(categories[category]);
        }
      }
    }
    return categoriesArray;
  };
  const handleSubmit = (form) => {
    const newCategories = getCategories(form.categories);
    console.log("submit form", form);
    updateTask(taskId, {
      ...form,
      categories: form.categories[0].key ? form.categories : newCategories,
      updatedAt: Date.now(),
    }).then(() => history.push("/admin"));
  };
  if (task) {
    return (
      <div className="row">
        <div className="col-md-7 mx-auto">
          <div className="card my-5">
            <div className="card-body">
              <h2 className=" card-title text-center">Edit</h2>
              <QuestionForm
                data={task}
                onSubmit={handleSubmit}
                categories={categories}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
  return <h1>Loading...</h1>;
};

export default QuestionEditPage;
