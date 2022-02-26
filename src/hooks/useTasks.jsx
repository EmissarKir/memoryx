import React, { useContext, useEffect, useState } from "react";
import Loader from "../components/common/loader";
import taskService from "../service/task.service";
import { useTests } from "./useTest";

const TasksContex = React.createContext(); //?

export const useTasks = () => {
  return useContext(TasksContex);
};

export const TasksProvider = ({ children }) => {
  const { currentTest } = useTests();
  const [tasks, setTasks] = useState([]);

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, [currentTest]);

  async function fetchTasks() {
    try {
      const { content } = await taskService.fetch(currentTest);
      setTasks(content);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function createTask(value) {
    try {
      const newContent = {
        ...value,
        createdAt: Date.now(),
        repeated: 0,
        testId: currentTest,
      };
      const { content } = await taskService.create(newContent);
      setTasks((prevState) => [
        ...prevState,
        { ...newContent, _id: content.name },
      ]);

      return content;
    } catch (error) {
      console.log(error);
    }
  }
  async function deleteTask(id) {
    try {
      await taskService.delete(id).then(() => {
        setTasks((prevState) =>
          [...prevState].filter((item) => item._id !== id)
        );
      });
    } catch (error) {
      console.log(error);
    }
  }
  async function updateRepeatedCount(id, value) {
    try {
      const { content } = await taskService.updateCount(id, value);
      return content;
    } catch (error) {
      console.log(error);
    }
  }
  async function updateTask(id, value) {
    try {
      const { content } = await taskService.update(id, value);
      console.log("content", content);
      setTasks((prevState) =>
        prevState.map((item) => {
          if (item._id === content._id) {
            return value;
          }
          return item;
        })
      );
      return content;
    } catch (error) {
      console.log(error);
    }
  }

  const getTask = (id) => {
    return tasks.find((item) => item._id === id);
  };
  return (
    <TasksContex.Provider
      value={{
        tasks,
        createTask,
        deleteTask,
        updateRepeatedCount,
        getTask,
        updateTask,
      }}
    >
      {!isLoading ? children : <Loader />}
    </TasksContex.Provider>
  );
};
