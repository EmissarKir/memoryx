import React, { useContext, useEffect, useState } from "react";
import categoryService from "../service/category.service";
import { useTests } from "./useTest";

const CategoriesContext = React.createContext();

export const useCategories = () => {
  return useContext(CategoriesContext);
};

export const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const { currentTest } = useTests(); // _id текущего теста

  const fetchCategories = async () => {
    try {
      const { content } = await categoryService.fetch(currentTest);
      setCategories(content);
      return content;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, [currentTest]);

  async function createCategories(value) {
    const newData = { ...value, testId: currentTest };
    const { content } = await categoryService.create(newData);
    setCategories((prevState) => [
      ...prevState,
      { ...newData, _id: content.name },
    ]);
    return content;
  }

  return (
    <CategoriesContext.Provider value={{ categories, createCategories }}>
      {children}
    </CategoriesContext.Provider>
  );
};
