import React, { useEffect, useState } from "react";

import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import { useAuth } from "../../hooks/useAuth";
import { useHistory } from "react-router-dom";

const RegisterForm = () => {
  const history = useHistory();
  const { signUp } = useAuth();

  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const validatorConfig = {
    email: {
      isRequired: {
        message: "Электронная почта обязательна для заполнения",
      },
      isEmail: {
        message: "Электронная почта не корректна",
      },
    },
    name: {
      isRequired: {
        message: "Имя обязательно для заполнения",
      },
      min: {
        message: "Имя должно состоять минимум из 3 символов",
        value: 3,
      },
    },
    password: {
      isRequired: {
        message: "Пароль обязателен для заполнения",
      },
      isCapital: {
        message: "Пароль должен иметь одну заглавную букву",
      },
      isDigit: {
        message: "Пароль должен иметь одно число",
      },
      min: {
        message: "Пароль должен состоять минимум из 8 символов",
        value: 8,
      },
    },
    profession: {
      isRequired: {
        message: "Обязательно выберите вашу профессию",
      },
    },
    licence: {
      isRequired: {
        message:
          "Вы не можете использовать наш сервис без подтверждения лицензионного соглашения",
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

    try {
      await signUp(data);
      history.push("/testslist");
    } catch (error) {
      setErrors(error);
      console.log("rgister error", error);
    }

    // const isValid = validate();
    // if (!isValid) return;
    // const newData = {
    //     ...data,
    //     qualities: data.qualities.map((q) => q.value)
    // };
    // try {
    //     await signUp(newData);
    //     history.push("/");
    // } catch (error) {
    //     setErrors(error);
    // }
  };

  return (
    <>
      <h1 className="mb-4">Регистрация</h1>
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
          type="text"
          label="Имя"
          name="name"
          onChange={handleChange}
          value={data.name || ""}
          error={errors.name}
        />
        <TextField
          type="password"
          label="Пароль"
          name="password"
          onChange={handleChange}
          value={data.password || ""}
          error={errors.password}
        />

        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={!isValid}
        >
          Отправить
        </button>
      </form>
    </>
  );
};

export default RegisterForm;
