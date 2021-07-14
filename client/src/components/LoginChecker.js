import React from "react";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/userSlice";
import { Link, useHistory } from "react-router-dom";

function LoginChecker() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const history = useHistory();

  return (
    <div>
      {user ? (
        <div className="flex flex-row items-center">
          <p className=" dark:text-gray-400">
            Hei, <span className="uppercase">{user.username}</span>
          </p>
          <Button
            color="secondary"
            onClick={() => {
              dispatch(logout());
              history.push("/login");
            }}
          >
            <ExitToAppIcon className="mr-2 dark:text-red-600" />
            <span className="hidden dark:text-red-600 sm:flex">Logout</span>
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
  );
}

export default LoginChecker;
