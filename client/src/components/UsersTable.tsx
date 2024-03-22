import { useNavigate } from "react-router-dom";
import { IUser } from "../interfaces/user.interface";

const UsersTable = ({ users }: { users: IUser[] }) => {
  const navigate = useNavigate();

  return (
    <ul>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone No.</th>
            <th>Paid</th>
            <th>Remaining</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: IUser) => (
            <tr key={user._id}>
              <td>
                <button
                  onClick={() =>
                    navigate(`/user/${user._id}`, {
                      state: { user },
                    })
                  }
                >
                  {user.name}
                </button>
              </td>
              <td>{user.phoneNo}</td>
              <td>{user.paid}</td>
              <td>{user.remaining}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </ul>
  );
};

export default UsersTable;
