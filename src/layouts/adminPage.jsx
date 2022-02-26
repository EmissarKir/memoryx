import React from "react";
import { useHistory } from "react-router-dom";

import Pagination from "../components/common/pagination";
import TasksTable from "../components/ui/tasksTable";
import AdminHeader from "../components/ui/adminHeader";

import { useTasks } from "../hooks/useTasks";
import { usePagination } from "../hooks/usePagination";

const AdminPage = ({ testId }) => {
  const history = useHistory();
  const pageSize = 7;
  const { tasks, deleteTask } = useTasks();

  const { usersCrop, currentPage, pages, handlePageChange } = usePagination({
    contentPerPage: pageSize,
    count: tasks,
  });

  const handleDelete = (id) => {
    if (window.confirm("Вы действительно хотите удалить заметку?")) {
      deleteTask(id);
    }
  };
  const handleRedirect = (path) => {
    history.push(path);
  };

  return (
    <>
      <AdminHeader onRedirect={handleRedirect} testId={testId} />
      <TasksTable tasks={usersCrop} onDelete={handleDelete} />
      <Pagination
        pages={pages}
        onPageChange={handlePageChange}
        currentPage={currentPage}
      />
    </>
  );
};

export default AdminPage;
