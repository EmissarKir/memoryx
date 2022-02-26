import React from "react";
import { useHistory } from "react-router-dom";
import { useTasks } from "../../hooks/useTasks";
import CardContainer from "../common/cardContainer";

const SwitchTest = () => {
  const history = useHistory();
  const { tasks } = useTasks();
  const handleRedirectToUpdateTest = () => {
    history.push("/tasks/create");
  };
  const handleRedirectToTestPage = () => {
    history.push("/testPage");
  };
  return (
    <CardContainer>
      <p>Вопросов в тесте: {tasks.length} </p>
      {tasks.length !== 0 ? (
        <>
          <div className="d-flex flex-column flex-md-row mx-auto">
            <button
              className="btn btn-outline-secondary me-md-5 mb-3 mb-md-0"
              onClick={handleRedirectToUpdateTest}
            >
              Добавить вопросы
            </button>
            <button
              className="btn btn-outline-primary"
              onClick={handleRedirectToTestPage}
            >
              Начать тест
            </button>
          </div>
        </>
      ) : (
        <div className="d-flex flex-column flex-md-row mx-auto">
          <button
            className="btn btn-outline-secondary"
            onClick={handleRedirectToUpdateTest}
          >
            Добавить вопросы
          </button>
        </div>
      )}
    </CardContainer>
  );
};

export default SwitchTest;
