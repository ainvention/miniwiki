import { useState, useEffect } from "react";
import Switch from "@material-ui/core/Switch";

function DarkModeSwitch() {
  const [selected, setSelected] = useState(false);

  const toggleDarkMode = () => {
    const htmlClasses = document.querySelector("html").classList;

    if (sessionStorage.theme === "dark") {
      htmlClasses.remove("dark");
      sessionStorage.removeItem("theme");
      setSelected(false);
    } else {
      htmlClasses.add("dark");
      sessionStorage.theme = "dark";
      setSelected(true);
    }
  };

  useEffect(() => {
    sessionStorage.setItem("theme", "dark");
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
