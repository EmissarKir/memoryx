import React from "react";
import { Link } from "react-router-dom";
import { timeConverter } from "../../utils/timeConverter";

const TasksTable = ({ tasks, onDelete }) => {
  return (
    <div className="table-responsive-sm">
      <table className="table table-hover table-striped">
        <thead>
          <tr>
            <th>Вопрос</th>
            <th>Ответ</th>
            <th>Кол-во повторений</th>
            <th>Дата создания</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((item) => (
            <tr key={item.createdAt}>
              <td>{item.question}</td>
              <td>{item.answer}</td>
              <td>{item.repeated}</td>
              <td>{timeConverter(item.createdAt)}</td>
              <td>
                <Link to={`tasks/edit/${item._id}`}>
                  <button className="btn btn-success">
                    <i className="bi bi-pencil-square"></i>
                  </button>
                </Link>
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => onDelete(item._id)}
                >
                  <i className="bi bi-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default TasksTable;
