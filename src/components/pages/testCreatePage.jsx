import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useTests } from "../../hooks/useTest";
import { getUserId } from "../../service/localStorage.service";

import CardContainer from "../common/cardContainer";
import TextField from "../common/form/textField";

const TestCreatePage = () => {
  const history = useHistory();
  const [form, setForm] = useState({});
  const { createTest } = useTests();

  const handleChange = (target) => {
    setForm((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (form.nameTest && form.nameTest.length > 4) {
      const newForm = { ...form, userId: getUserId() };
      try {
        await createTest(newForm);
        history.push("/testslist");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <CardContainer>
      <h1>TestCreatePage</h1>
      <form onSubmit={onSubmit}>
        <TextField
          name="nameTest"
          value={form.nameTest || ""}
          placeholder="Введите название теста и нажмите Enter"
          onChange={handleChange}
          autoFocus
        />
      </form>
    </CardContainer>
  );
};

export default TestCreatePage;
