import Navbar from "../components/Navbar";
import UserForm from "../components/UserForm";
import { useLocation } from "react-router-dom";

const AgentForm = () => {
  const location = useLocation();
  const user = location.state?.user;

  return (
    <>
      <Navbar />
      <UserForm
        userType={"agent"}
        user={user || null}
      />
    </>
  );
};

export default AgentForm;
