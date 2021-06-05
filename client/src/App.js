import React, { useState } from "react";
import { Route, Link, useHistory } from "react-router-dom";

import "./index.css";

import { Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import ListIcon from "@material-ui/icons/List";
import SettingsIcon from "@material-ui/icons/Settings";

import Home from "./pages/Home";
import New from "./pages/New";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import SidebarMenu from "./components/SidebarMenu";

import { useDispatch, useSelector } from "react-redux";

import DarkModeSwitch from "./components/DarkModeSwitch";
import LoginChecker from "./components/LoginChecker";

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const history = useHistory();

  const routes = [
    {
      path: "/",
      exact: true,
      sidebar: () => (
        <Link to="/">
          <Button>
            <ListIcon className="mr-2" />
            Wiki list
          </Button>
        </Link>
      ),
      main: () => <Home />,
    },
    {
      path: "/new",
      sidebar: () => (
        <Link to="/new">
          <Button>
            <AddIcon className="mr-2" />
            Add new
          </Button>
        </Link>
      ),
      main: () => <New />,
    },
    {
      path: "/settings",
      sidebar: () => (
        <Link to="/settings">
          <Button>
            <SettingsIcon className="mr-2" />
            Settings
          </Button>
        </Link>
      ),
      main: () => <Settings />,
    },
    {
      path: "/login",
      sidebar: () => <div>Login</div>,
      main: () => <Login />,
    },
  ];

  return (
    <div className="flex h-screen dark:bg-gray-800">
      <div className="flex flex-col flex-1 overflow-hidden">
        <header className="flex flex-col items-center justify-between p-4 sm:flex-row">
          <div>
            {/* Client logo*/}
            <img
              alt="cemit logo"
              src="https://cemit.com/wp-content/themes/cemit/assets/img/cemit-logo.svg"
              className="w-20 h-auto"
            />
          </div>
          <div className="flex flex-col mt-4 align-middle sm:mt-0 sm:flex-row">
            {/* Dark mode Switch */}
            <DarkModeSwitch />
            {/* user login checker */}
            <LoginChecker />
          </div>
        </header>
        <div className="flex flex-col h-full lg:flex-row">
          <nav className="flex w-full h-auto bg-gray-600 lg:w-72 lg:h-full">
            <div className="w-full px-4 py-8 mx-auto dark:bg-gray-700">
              <SidebarMenu />
            </div>
          </nav>
          <main className="flex flex-col w-full h-full overflow-x-hidden overflow-y-auto bg-white mb-14 dark:bg-gray-600">
            <div className="flex flex-col w-full px-2 py-8 mx-auto sm:px-6 ">
              <div>
                {routes.map((route) => (
                  <Route key={route.path} path={route.path} exact={route.exact}>
                    <div className="flex flex-row mx-4 font-bold text-blue-600 dark:text-blue-500">
                      <Link to="/">Home</Link>
                      {route.path !== "/" && (
                        <Link to={route.path}>{route.path}</Link>
                      )}
                    </div>
                    <br />
                  </Route>
                ))}
              </div>
              <div>
                {routes.map((route) => (
                  <Route key={route.path} path={route.path} exact={route.exact}>
                    <route.main />
                  </Route>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
