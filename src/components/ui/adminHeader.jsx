import React from "react";

const AdminHeader = ({ onRedirect, testId }) => {
  return (
    <>
      <h1 className="text-center">AdminPage</h1>
      <div className="d-flex justify-content-center">
        <button
          className="btn btn-success me-md-2"
          onClick={() => onRedirect(`/tasks/create`)}
        >
          Создать вопрос
          <i className="bi bi-plus"></i>
        </button>
      </div>
    </>
  );
};

export default AdminHeader;
