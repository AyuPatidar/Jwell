import { useEffect, useState } from "react";
import { IUser } from "../interfaces/user.interface";

const OrderForm = ({ user }: { user: IUser }) => {
  const [khareedOrBakaya, setKhareedOrBakaya] = useState("");
  const [finalAmount, setFinalAmount] = useState(0);
  const [products, setProducts] = useState([]);
  const [paid, setPaid] = useState(0);
  const [remaining, setRemaining] = useState(0);

  const query = {
    userId: user._id,
  };

  const body = {
    orderType: user.userType === "agent" ? "purchase" : "sale",
    khareedOrBakaya: "khareed-bakaya",
    products: [],
    finalAmount: 0,
    paid: 0,
    remaining: 0,
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={onSubmit}>
      <fieldset>
        <legend>Please specify the order type</legend>
        <input
          type="radio"
          id="khareed"
          name="khareedOrBakaya"
          value={khareedOrBakaya}
          onChange={() => setKhareedOrBakaya("khareed")}
        />
        <label htmlFor="khareed">Khareed</label>
        <input
          type="radio"
          name="khareedOrBakaya"
          id="bakaya"
          value={khareedOrBakaya}
          onChange={() => setKhareedOrBakaya("bakaya")}
        />
        <label htmlFor="bakaya">Bakaya</label>
        <br></br>
      </fieldset>

      <button type="submit">Submit</button>
    </form>
  );
};

export default OrderForm;
