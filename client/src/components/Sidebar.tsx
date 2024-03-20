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
            <button onClick={() => navigate("/sale-orders")}>
              Sale Orders
            </button>
          </li>
          <li>
            <button onClick={() => navigate("/purchase-orders")}>
              Purchase Orders
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
