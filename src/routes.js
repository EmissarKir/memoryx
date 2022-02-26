import AdminPage from "./layouts/adminPage";
import CategoryCreatePage from "./components/pages/categoryCreatePage";
import QuestionCreatePage from "./components/pages/questionCreatePage";

import QuestionEditPage from "./components/pages/questionEditPage";
import TestCreatePage from "./components/pages/testCreatePage";
import MainPage from "./layouts/mainPage";
import TaskListPage from "./components/pages/taskListPage";
import TestPage from "./components/pages/testPage";
import SwitchTest from "./components/pages/switchTest";
import Login from "./layouts/login";

const routes = [
  {
    path: "/login",
    name: "Авторизация",
    private: false,
    display: false,
    component: Login,
  },
  {
    path: "/testPage",
    name: "testPage",
    component: TestPage,
    display: false,
  },
  {
    path: "/updateTest",
    name: "updateTest",
    component: TaskListPage,
    display: false,
  },
  {
    path: "/switchTest",
    name: "SwitchTest",
    component: SwitchTest,
    display: false,
  },

  {
    path: "/createTest",
    name: "createTest",
    component: TestCreatePage,
    display: false,
  },
  {
    path: "/tasks/edit/:taskId",
    name: "Edit",
    component: QuestionEditPage,
    display: false,
  },
  {
    path: "/category",
    name: "Создать категорию",
    component: CategoryCreatePage,
    display: false,
  },
  {
    path: "/admin",
    name: "Админ",
    component: AdminPage,
  },
  {
    path: "/create/:testId",
    name: "Create",
    component: QuestionCreatePage,
    display: false,
  },
  { path: "/", name: "Тест", component: MainPage },
];
export default routes;
