import React from "react";
import { Switch, Route } from "react-router-dom";

import Container from "./components/common/container.jsx";
import NavBar from "./components/ui/navbar.jsx";
import AdminPage from "./layouts/adminPage";
import CategoryCreatePage from "./components/pages/categoryCreatePage";
import QuestionCreatePage from "./components/pages/questionCreatePage";

import QuestionEditPage from "./components/pages/questionEditPage";
import TestCreatePage from "./components/pages/testCreatePage";
import TaskListPage from "./components/pages/taskListPage";
import TestPage from "./components/pages/testPage";
import SwitchTest from "./components/pages/switchTest";
import Login from "./layouts/login";

import { CategoriesProvider } from "./hooks/useCategories.jsx";
import { TasksProvider } from "./hooks/useTasks.jsx";
import { TestsProvider } from "./hooks/useTest.jsx";
import { AuthProvider } from "./hooks/useAuth";
import TestListPage from "./layouts/testListPage.jsx";
import ProtectedRoute from "./components/common/protectedRoute.jsx";
import GreetingPage from "./layouts/greetingPage.jsx";
import LogOut from "./layouts/logOut.jsx";

function App() {
  return (
    <>
      <AuthProvider>
        <TestsProvider>
          <NavBar />
          <Container>
            <TasksProvider>
              <CategoriesProvider>
                <Switch>
                  <Route path="/logout" component={LogOut} />
                  <Route path="/login" component={Login} />
                  <ProtectedRoute path="/testPage" component={TestPage} />
                  <ProtectedRoute path="/updateTest" component={TaskListPage} />
                  <ProtectedRoute path="/switchTest" component={SwitchTest} />
                  <ProtectedRoute
                    path="/createTest"
                    component={TestCreatePage}
                  />
                  <ProtectedRoute
                    path="/tasks/edit/:taskId?"
                    component={QuestionEditPage}
                  />
                  <ProtectedRoute
                    path="/category"
                    component={CategoryCreatePage}
                  />
                  <ProtectedRoute path="/admin" component={AdminPage} />
                  <ProtectedRoute
                    path="/tasks/create"
                    component={QuestionCreatePage}
                  />
                  <ProtectedRoute path="/testslist" component={TestListPage} />
                  <Route path="/" component={GreetingPage} />
                </Switch>
              </CategoriesProvider>
            </TasksProvider>
          </Container>
        </TestsProvider>
      </AuthProvider>
    </>
  );
}

export default App;
