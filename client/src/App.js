import React, { useState } from "react";
import { Route, Link, useHistory } from "react-router-dom";

import "./index.css";

import { Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import ListIcon from "@material-ui/icons/List";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import ToggleButton from "@material-ui/lab/ToggleButton";
import CheckIcon from "@material-ui/icons/Check";

import Home from "./pages/Home";
import New from "./pages/New";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import SidebarMenu from "./components/SidebarMenu";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "./store/userSlice";

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const history = useHistory();
  // const [selected, setSelected] = useState("");

  // const initialTheme = localStorage.setItem("theme", "light")
  //   ? JSON.parse(localStorage.getItem("theme"))
  //   : null;

  // const toggleDarkMode = () => {
  //   setSelected(!selected);
  //   if (
  //     initialTheme === "dark" ||
  //     (!("theme" in localStorage) &&
  //       window.matchMedia("(prefers-color-scheme: dark)").matches)
  //   ) {
  //     document.documentElement.classList.add("dark");
  //   } else {
  //     document.documentElement.classList.remove("dark");
  //   }
  // };
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
    <div className="flex h-screen">
      <div className="flex flex-col flex-1 overflow-hidden">
        <header className="flex flex-col items-center justify-between p-4 sm:flex-row">
          <div>
            <img
              alt="cemit logo"
              src="https://cemit.com/wp-content/themes/cemit/assets/img/cemit-logo.svg"
              className="w-20 h-auto"
            />
            {/* <ToggleButton
              value="check"
              selected={selected}
              onChange={() => {
                toggleDarkMode();
              }}
            >
              <CheckIcon />
            </ToggleButton> */}
          </div>
          <div className="flex mt-4 sm:mt-0">
            {/* user login checker */}
            {user ? (
              <div className="flex flex-col items-center sm:flex-row">
                <p>Hei, {user.email}</p>
                <Button
                  color="secondary"
                  onClick={() => {
                    dispatch(logout());
                    history.push("/login");
                  }}
                >
                  <ExitToAppIcon className="mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center sm:flex-row">
                <Button color="secondary">
                  <Link to="/login">
                    <Button color="secondary">
                      <LockOpenIcon className="mr-2" />
                      Login
                    </Button>
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </header>
        <div className="flex flex-col h-full lg:flex-row">
          <nav className="flex w-full h-auto bg-gray-600 lg:w-72 lg:h-full">
            <div className="w-full px-4 py-8 mx-auto">
              <SidebarMenu />
            </div>
          </nav>
          <main className="flex flex-col w-full overflow-x-hidden overflow-y-auto bg-white mb-14">
            <div className="flex flex-col w-full px-2 py-8 mx-auto sm:px-6 ">
              <div>
                {routes.map((route) => (
                  <Route key={route.path} path={route.path} exact={route.exact}>
                    <div className="flex flex-row mx-4 font-bold text-gray-500">
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
