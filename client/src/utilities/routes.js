import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import ListIcon from "@material-ui/icons/List";
import SettingsIcon from "@material-ui/icons/Settings";

import Home from "../pages/Home";
import New from "../pages/New";
import Settings from "../pages/Settings";
import Login from "../pages/Login";

export const routes = [
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

export default routes;
