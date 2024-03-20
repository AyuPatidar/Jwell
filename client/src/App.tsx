import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AgentsPage from "./pages/AgentsPage";
import CustomersPage from "./pages/CustomersPage";
import SaleOrdersPage from "./pages/SaleOrdersPage";
import PurchaseOrdersPage from "./pages/PurchaseOrdersPage";
import AgentPage from "./pages/AgentPage";
import CustomerPage from "./pages/CustomerPage";
import AgentForm from "./pages/AgentForm";
import CustomerForm from "./pages/CustomerForm";

const routes = [
  { path: "/", element: <HomePage /> },
  { path: "/agents", element: <AgentsPage /> },
  { path: "/agents/form", element: <AgentForm /> },
  { path: "/customers", element: <CustomersPage /> },
  { path: "/customers/form", element: <CustomerForm /> },
  { path: "/sale-orders", element: <SaleOrdersPage /> },
  { path: "/purchase-orders", element: <PurchaseOrdersPage /> },
  { path: "/agents/:phoneNo", element: <AgentPage /> },
  { path: "/customers/:phoneNo", element: <CustomerPage /> },
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
