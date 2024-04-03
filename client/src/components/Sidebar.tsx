import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <ul>
          <li>
            <button onClick={() => navigate("/")}>HomePage</button>
          </li>
          <li>
            <button onClick={() => navigate("/agents")}>Agents</button>
          </li>
          <li>
            <button onClick={() => navigate("/customers")}>Customers</button>
          </li>
          <li>
            <button onClick={() => navigate("/products")}>Products</button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
