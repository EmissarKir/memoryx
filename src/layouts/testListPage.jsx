import React from "react";
import { useHistory } from "react-router";
import CardContainer from "../components/common/cardContainer";
import { useTests } from "../hooks/useTest";
import { setLocalCurrentTest } from "../service/localStorage.service";

const TestListPage = () => {
  const history = useHistory();
  const { tests, setCurrentTest } = useTests();

  const createTest = () => {
    history.push("/createTest");
  };

  // направляем пользователя на страницу теста и устанавливаем текущий тест
  const handleSelectTest = (id) => {
    setCurrentTest(id);
    setLocalCurrentTest(id);
    history.push(`/switchTest`);
  };
  return (
    <CardContainer>
      <div className="d-flex flex-column mb-5">
        <button className="btn btn-outline-primary" onClick={createTest}>
          Создать тест
        </button>
      </div>

      <div>
        {tests.length > 0 ? (
          <>
            <h3 className="mb-3">Список тестов</h3>
            <ul className="list-group">
              {tests.map((item) => (
                <li
                  key={item._id}
                  className="list-group-item"
                  onClick={() => handleSelectTest(item._id)}
                >
                  {item.nameTest}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <>
            <h3>Ваш список тестов пуст</h3>
            <p>Нажмите "Создать тест", чтобы продолжить</p>
          </>
        )}
      </div>
    </CardContainer>
  );
};

export default TestListPage;
