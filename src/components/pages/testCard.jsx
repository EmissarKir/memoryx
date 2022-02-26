import React from "react";
import ReactMarkdown from "react-markdown";

import CollapseWrapper from "../../components/common/collapse";

import { timeConverter } from "../../utils/timeConverter";

const TestCard = ({ indexTask, index, maxCount, onBack, onNext, onSkip }) => {
  const getTime = () => {
    if (indexTask.updatedAt) {
      return (
        <small>Заметка изменена: {timeConverter(indexTask.updatedAt)}</small>
      );
    }
    return <small>Заметка создана: {timeConverter(indexTask.createdAt)}</small>;
  };
  return (
    <div className="card shadow p-4 mt-5">
      <div className="d-flex flex-column flex-sm-row my-3">
        <button
          className="btn btn-outline-secondary mb-2"
          onClick={onBack}
          disabled={index === 0}
        >
          Назад
        </button>

        <button
          className="btn btn-outline-secondary ms-sm-auto mb-2"
          onClick={onSkip}
        >
          Пропустить
        </button>

        <button className="btn btn-primary ms-sm-2 mb-2" onClick={onNext}>
          Следующий
        </button>
      </div>
      <div className="row">
        <div className="col-md-12">
          <CollapseWrapper
            title={indexTask.question}
            name={indexTask._id}
            categories={indexTask.categories}
            currentIndex={index + 1}
            maxCount={maxCount}
          >
            <p>{getTime()}</p>
            <ReactMarkdown>{indexTask.answer}</ReactMarkdown>
          </CollapseWrapper>
        </div>
      </div>
    </div>
  );
};

export default TestCard;
