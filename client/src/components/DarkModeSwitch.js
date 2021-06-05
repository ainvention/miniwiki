import { useState, useEffect } from "react";
import Switch from "@material-ui/core/Switch";

function DarkModeSwitch() {
  const [selected, setSelected] = useState("");

  const toggleDarkMode = () => {
    let htmlClasses = document.querySelector("html").classList;

    if (localStorage.theme === "dark") {
      htmlClasses.remove("dark");
      localStorage.removeItem("theme");
      setSelected(false);
    } else {
      htmlClasses.add("dark");
      localStorage.theme = "dark";
      setSelected(true);
    }
  };

  useEffect(() => {
    localStorage.setItem("theme", "dark");
    toggleDarkMode();
  }, []);

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
