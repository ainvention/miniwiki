import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import ListIcon from "@material-ui/icons/List";
import SettingsIcon from "@material-ui/icons/Settings";
import Collapse from "@material-ui/core/Collapse";
import ListItem from "@material-ui/core/ListItem";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { useSelector } from "react-redux";

function SidebarMenu() {
  const [open, setOpen] = useState(true);
  const { user } = useSelector((state) => state.user);
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div>
      {user ? (
        <div className="flex flex-col items-start h-auto text-xl text-white sm:h-full sm:flex-col">
          <ListItem
            button
            onClick={handleClick}
            alignItems="center"
            className="flex"
          >
            <p className="flex mb-4 text-2xl font-bold">Menu</p>
            {open ? (
              <ExpandLess className="self-start" />
            ) : (
              <ExpandMore className="self-start" />
            )}
          </ListItem>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <div className="flex flex-col sm:flex-col">
              <Link to="/">
                <Button className="flex w-full">
                  <ListIcon className="mr-2 text-white" />
                  <p className="text-white">Wiki list</p>
                </Button>
              </Link>
              <Link to="/new">
                <Button className="flex w-full">
                  <AddIcon className="mr-2 text-white" />
                  <p className="text-white">Add new</p>
                </Button>
              </Link>
              <Link to="/settings">
                <Button className="flex w-full">
                  <SettingsIcon className="mr-2 text-white" />
                  <p className="text-white">Settings</p>
                </Button>
              </Link>
            </div>
          </Collapse>
        </div>
      ) : (
        <div className="flex-col text-white">
          <p>Please Login with..</p>
          <hr className="my-2" />
          <p>email: sara@sara.io</p>
          <p>password: Alex1234</p>
        </div>
      )}
    </div>
  );
}

export default SidebarMenu;
