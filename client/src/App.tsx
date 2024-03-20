import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AgentsPage from "./pages/AgentsPage";
import CustomersPage from "./pages/CustomersPage";
import SaleOrdersPage from "./pages/SaleOrdersPage";
import PurchaseOrdersPage from "./pages/PurchaseOrdersPage";
import AgentPage from "./pages/AgentPage";
import CustomerPage from "./pages/CustomerPage";

const routes = [
  { path: "/", element: <HomePage /> },
  { path: "/agents", element: <AgentsPage /> },
  { path: "/agent/:id", element: <AgentPage /> },
  { path: "/customers", element: <CustomersPage /> },
  { path: "/customer/:id", element: <CustomerPage /> },
  { path: "/sale-orders", element: <SaleOrdersPage /> },
  { path: "/purchase-orders", element: <PurchaseOrdersPage /> },
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
