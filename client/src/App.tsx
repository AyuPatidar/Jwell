import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AgentsPage from "./pages/AgentsPage";

const routes = [
  { path: "/", element: <HomePage /> },
  { path: "/agents", element: <AgentsPage /> },
];

function App() {
  return (
    <>
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={route.element}
          />
        ))}
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
