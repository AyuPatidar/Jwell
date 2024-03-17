import { app } from "./app.js";
import connectToDB from "./src/db/db.js";

connectToDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("‣ Server running on Port: ", process.env.PORT);
    });
  })
  .catch((err) => console.error("‣ MongoDB Connection Error: ", err));
