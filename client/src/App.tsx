import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AgentsPage from "./pages/AgentsPage";
import CustomersPage from "./pages/CustomersPage";
import AgentForm from "./pages/AgentForm";
import CustomerForm from "./pages/CustomerForm";
import UserPage from "./pages/UserPage";
import "react-toastify/dist/ReactToastify.css";
import AgentsOrderForm from "./pages/AgentsOrderForm";
import CustomersOrderForm from "./pages/CustomersOrderForm";
import OrderPage from "./pages/OrderPage";

const routes = [
  { path: "/", element: <HomePage /> },
  { path: "/agents", element: <AgentsPage /> },
  { path: "/agents/form", element: <AgentForm /> },
  { path: "/agents/:userId/orders/form", element: <AgentsOrderForm /> },
  { path: "/customers", element: <CustomersPage /> },
  { path: "/customers/form", element: <CustomerForm /> },
  { path: "/customers/:userId/orders/form", element: <CustomersOrderForm /> },
  { path: "/user/:userId", element: <UserPage /> },
  { path: "/orders/:orderId", element: <OrderPage /> },
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
