import React, { useContext, useEffect, useState } from "react";
import testService from "../service/test.service";
import Loader from "../components/common/loader";
import { getLocalCurrentTest } from "../service/localStorage.service";
import { useAuth } from "./useAuth";

const TestContex = React.createContext();

export const useTests = () => {
  return useContext(TestContex);
};

export const TestsProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [currentTest, setCurrentTest] = useState("");
  const [tests, setTests] = useState([]);
  const [isLoading, setLoading] = useState(true);
  // const currId = getUserId();

  //при перезагрузке страницы, брать currentTest из localStorage
  // если нет currentTest и есть в localStorage
  const localTestId = getLocalCurrentTest();
  if (!currentTest && localTestId) {
    setCurrentTest(localTestId);
  }

  // получить с серверы тесты только текущего юзера
  const getTests = async () => {
    const { content } = await testService.fetch(currentUser.userId);
    setTests(content);
    setLoading(false);
  };
  const getTest = (id) => {
    return tests.find((item) => item._id === id);
  };

  const createTest = async (form) => {
    const { content } = await testService.create(form);
    console.log("content", content);
    setTests((prevState) => [...prevState, { ...form, _id: content.name }]);
    return content;
  };

  useEffect(() => {
    if (currentUser) {
      getTests();
    } else {
      setLoading(false);
    }
  }, [currentUser]);

  return (
    <TestContex.Provider
      value={{ tests, createTest, getTest, currentTest, setCurrentTest }}
    >
      {!isLoading ? children : <Loader />}
    </TestContex.Provider>
  );
};
