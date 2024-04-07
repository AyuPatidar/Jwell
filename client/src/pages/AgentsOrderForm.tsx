import Sidebar from "../components/Sidebar";
import OrderForm from "../components/OrderForm";
import { useLocation } from "react-router-dom";

const AgentsOrderForm = () => {
  const location = useLocation();
  const { user } = location.state;

  return (
    <>
      <Sidebar />
      <OrderForm user={user} />
    </>
  );
};

export default AgentsOrderForm;
