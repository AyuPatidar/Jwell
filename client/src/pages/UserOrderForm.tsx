import Navbar from "../components/Navbar";
import OrderForm from "../components/OrderForm";
import { useLocation } from "react-router-dom";

const UserOrderForm = () => {
  const location = useLocation();
  const { user } = location.state;

  return (
    <>
      <Navbar />
      <OrderForm user={user} />
    </>
  );
};

export default UserOrderForm;