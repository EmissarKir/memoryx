import React, { useState } from "react";
import { useTasks } from "../../hooks/useTasks";
import TestCard from "./testCard";

const TestPage = () => {
  const { tasks, updateRepeatedCount } = useTasks();
  const [index, setIndex] = useState(0);
  const [isFinish, setFinish] = useState(false);
  const maxCount = tasks.length;
  const indexTask = tasks[index];

  const nextClickHandler = () => {
    if (isNextEmpty()) {
      updateRepeatedCount(indexTask.key, { repeated: indexTask.repeated + 1 });
      setFinish(true);
    } else {
      updateRepeatedCount(indexTask.key, { repeated: indexTask.repeated + 1 });
      setIndex((prevState) => prevState + 1);
    }
  };

  const skipClickHandler = () => {
    if (isNextEmpty()) {
      updateRepeatedCount(indexTask.key, {
        repeated:
          indexTask.repeated === 0
            ? indexTask.repeated
            : indexTask.repeated - 1,
      });
      setFinish(true);
    } else {
      updateRepeatedCount(indexTask.key, {
        repeated:
          indexTask.repeated === 0
            ? indexTask.repeated
            : indexTask.repeated - 1,
      });
      setIndex((prevState) => prevState + 1);
    }
  };
  const backQuestionClickHandler = () => {
    if (!isPrevEmpty()) {
      setIndex((prevState) => prevState - 1);
    } else {
      setIndex(0);
    }
  };

  function isNextEmpty() {
    return index + 1 === maxCount;
  }

  function isPrevEmpty() {
    return index === 0;
  }
  return (
    <div className="row d-flex justify-content-center">
      <div className="col-md-6">
        {!isFinish ? (
          <TestCard
            indexTask={indexTask}
            index={index}
            maxCount={maxCount}
            onSkip={skipClickHandler}
            onNext={nextClickHandler}
            onBack={backQuestionClickHandler}
          />
        ) : (
          <h1>Тест закончен...</h1>
        )}
      </div>
    </div>
  );
};

export default TestPage;
