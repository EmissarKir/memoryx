import { useEffect, useState } from "react";
import { validator } from "../utils/validator";

const useForm = (initialState = {}, onSubmit) => {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleChange = (target) => {
    setForm((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const validatorConfig = {
    question: {
      isRequired: {
        message: "Поле <Вопрос> обязательно для заполнения",
      },
      min: {
        message: "Вопрос должен состоять минимум из 5 символов",
        value: 5,
      },
    },
    answer: {
      isRequired: {
        message: "Поле <Ответ> обязательно для заполнения",
      },
      min: {
        message: "Ответ должен состоять минимум из 5 символов",
        value: 5,
      },
    },
    categories: {
      isRequired: {
        message: "Обязательно выберите категорию/категории",
      },
    },
  };

  const validate = () => {
    const errors = validator(form, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
    validate();
  }, [form]);

  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    onSubmit(form);
  };
  return { form, handleChange, handleSubmit, isValid, errors };
};
export default useForm;
