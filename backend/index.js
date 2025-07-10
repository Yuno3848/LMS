import { db } from "./utils/db.js";
import app from "./app.js";

const port = 8080 || process.env.PORT;

db()
  .then(() => {
    app.listen(port, () => {
      console.log(`Database Connected...`);
      console.log(`Server running on port : ${port}`);
    });
  })
  .catch((error) => {
    console.log("Failed to connect to the database", error.message);
  });
