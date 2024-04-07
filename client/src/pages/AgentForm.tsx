import Sidebar from "../components/Sidebar";
import UserForm from "../components/UserForm";
import { useLocation } from "react-router-dom";

const AgentForm = () => {
  const location = useLocation();
  const user = location.state?.user;

  return (
    <>
      <Sidebar />
      <UserForm
        userType={"agent"}
        user={user || null}
      />
    </>
  );
};

export default AgentForm;
