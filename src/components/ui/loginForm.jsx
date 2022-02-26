import React, { useEffect, useState } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import { useAuth } from "../../hooks/useAuth";
import { useHistory } from "react-router-dom";

const LoginForm = () => {
  const history = useHistory();
  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});
  const [enterError, setEnterError] = useState(null);

  const { logIn } = useAuth();

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
    setEnterError(null);
  };

  const validatorConfig = {
    email: {
      isRequired: {
        message: "Электронная почта обязательна для заполнения",
      },
    },
    password: {
      isRequired: {
        message: "Пароль обязателен для заполнения",
      },
    },
  };

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
    validate();
  }, [data]);

  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;

    try {
      await logIn(data);
      history.push(
        history.location.state
          ? history.location.state.from.pathname
          : "/testslist"
      );
    } catch (error) {
      setEnterError(error.message);
    }
  };

  return (
    <>
      <h1 className="mb-4">Login</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          type="text"
          label="Электронная почта"
          name="email"
          onChange={handleChange}
          value={data.email || ""}
          error={errors.email}
        />
        <TextField
          type="password"
          label="Пароль"
          name="password"
          onChange={handleChange}
          value={data.password || ""}
          error={errors.password}
        />
        {enterError && <p className="text-danger">{enterError}</p>}
        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={!isValid || enterError}
        >
          Отправить
        </button>
      </form>
    </>
  );
};

export default LoginForm;
