import { Route, Link, useLocation } from "react-router-dom";
import routes from "./utilities/routes";

import SidebarMenu from "./components/SidebarMenu";
import DarkModeSwitch from "./components/DarkModeSwitch";
import LoginChecker from "./components/LoginChecker";
import Logo from "./components/Logo";
import { useSelector } from "react-redux";

function App() {
  let location = useLocation();
  const { wikis } = useSelector((state) => state.wikis);
  return (
    <div className="flex h-screen dark:bg-gray-800">
      <div className="flex flex-col flex-1 overflow-hidden">
        <header className="flex flex-col items-center justify-between p-4 sm:flex-row">
          <Logo />
          <div className="flex flex-col mt-4 align-middle sm:mt-0 sm:flex-row">
            {/* Dark mode Switch */}
            <DarkModeSwitch />
            {/* user login checker */}
            <LoginChecker />
          </div>
        </header>
        <div className="flex flex-col h-full lg:flex-row">
          <nav className="flex w-full h-auto bg-gray-600 lg:w-72 lg:h-full">
            <div className="flex w-full px-4 mx-auto dark:bg-gray-700">
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
                        <Link to={location.pathname}>{location.pathname}</Link>
                      )}
                    </div>
                    <br />
                  </Route>
                ))}
              </div>
              <div>
                {routes.map((route) => (
                  <Route key={route.path} path={route.path} exact={route.exact}>
                    <route.main wikis={wikis} />
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
