import React, { useState } from "react";

import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import BackHistoryButton from "../common/backButton";

import colors from "../../constants/colors.json";

import { useCategories } from "../../hooks/useCategories";

const initialState = { name: "", color: "" };

const CategoryCreatePage = () => {
  const [form, setForm] = useState(initialState);

  const { createCategories } = useCategories();

  const handleChange = (target) => {
    setForm((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createCategories(form);
    setForm(initialState);
  };

  return (
    <div className="row">
      <div className="col-md-7 mx-auto">
        <div className="card my-5">
          <div className="card-body">
            <h2 className=" card-title text-center">Создать категорию</h2>
            <form onSubmit={handleSubmit}>
              <TextField
                name="name"
                placeholder="Название"
                onChange={handleChange}
                value={form.name || ""}
              />
              <SelectField
                name="color"
                placeholder="Выберите цвет"
                options={colors}
                value={form.color || ""}
                onChange={handleChange}
                defaultOption="Choose..."
              />
              <BackHistoryButton />
              <button className="btn btn-primary">Создать</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCreatePage;
