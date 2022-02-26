import React from "react";
import { useTests } from "../../hooks/useTest";

import AdminPage from "../../layouts/adminPage";

const TaskListPage = () => {
  const { currentTest } = useTests();
  return (
    <>
      <h1>Вы сейчас находитесь в тесте: </h1>
      <AdminPage testId={currentTest} />
    </>
  );
};

export default TaskListPage;
