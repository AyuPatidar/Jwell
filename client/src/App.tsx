import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AgentsPage from "./pages/AgentsPage";
import CustomersPage from "./pages/CustomersPage";
import AgentForm from "./pages/AgentForm";
import CustomerForm from "./pages/CustomerForm";
import UserPage from "./pages/UserPage";
import "react-toastify/dist/ReactToastify.css";
import OrderPage from "./pages/OrderPage";
import ProductsPage from "./pages/ProductsPage";
import ProductForm from "./pages/ProductForm";
import UserOrderForm from "./pages/UserOrderForm";

const routes = [
  { path: "/", element: <HomePage /> },
  { path: "/agents", element: <AgentsPage /> },
  { path: "/agents/form", element: <AgentForm /> },
  { path: "/users/:userId/orders/form", element: <UserOrderForm /> },
  { path: "/customers", element: <CustomersPage /> },
  { path: "/customers/form", element: <CustomerForm /> },
  { path: "/user/:userId", element: <UserPage /> },
  { path: "/orders/:orderId", element: <OrderPage /> },
  { path: "/products", element: <ProductsPage /> },
  { path: "/products/form", element: <ProductForm /> },
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
