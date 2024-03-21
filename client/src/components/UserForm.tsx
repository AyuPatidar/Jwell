import { useState } from "react";
import { IUser } from "../interfaces/user.interface";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UserForm = ({ userType, user }: { userType: string; user?: IUser }) => {
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || "");
  const [address, setAddress] = useState(user?.address || "");
  const [phoneNo, setPhoneNo] = useState(user?.phoneNo || "");
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user) {
      fetch(`http://localhost:8000/api/v1/users/update`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: user._id,
          name: name,
          address: address,
          phoneNo: phoneNo,
        }),
      })
        .then((res) => res.json())
        .then((res) => toast(res.message));
    } else {
      fetch(`http://localhost:8000/api/v1/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userType: userType,
          name: name,
          address: address,
          phoneNo: phoneNo,
        }),
      })
        .then((res) => res.json())
        .then((res) => toast(res.message));
    }
    navigate(`/${userType}s`);
  };
  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="name">Name: </label>
      <input
        id="name"
        type="text"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label htmlFor="phoneNo">Phone No.:</label>
      <input
        id="phoneNo"
        type="text"
        name="phoneNo"
        value={phoneNo}
        onChange={(e) => setPhoneNo(e.target.value)}
      />
      <label htmlFor="address">Address: </label>
      <input
        id="address"
        type="text"
        name="address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default UserForm;
