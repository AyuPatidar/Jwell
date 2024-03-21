import { useState } from "react";

const UserForm = ({ userType }: { userType: string }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
    });
  };
  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="name">Name: </label>
      <input
        id="name"
        type="text"
        name="name"
        onChange={(e) => setName(e.target.value)}
      />
      <label htmlFor="phoneNo">Phone No.:</label>
      <input
        id="phoneNo"
        type="text"
        name="phoneNo"
        onChange={(e) => setPhoneNo(e.target.value)}
      />
      <label htmlFor="address">Address: </label>
      <input
        id="address"
        type="text"
        name="address"
        onChange={(e) => setAddress(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default UserForm;
