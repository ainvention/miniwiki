import { useState } from "react";
import Switch from "@material-ui/core/Switch";

function DarkModeSwitch() {
  const [selected, setSelected] = useState(true);

  const toggleDarkMode = () => {
    setSelected(!selected);
    let htmlClasses = document.querySelector("html").classList;
    if (localStorage.theme === "dark") {
      htmlClasses.remove("dark");
      localStorage.removeItem("theme");
    } else {
      htmlClasses.add("dark");
      localStorage.theme = "dark";
    }
  };
  return (
    <div>
      <span className="dark:text-gray-300">{selected ? "Dark" : "Light"}</span>
      <Switch
        checked={selected}
        onChange={() => {
          toggleDarkMode();
        }}
        name="darkmode-switch"
        inputProps={{ "aria-label": "secondary checkbox" }}
      />
    </div>
  );
}

export default DarkModeSwitch;
