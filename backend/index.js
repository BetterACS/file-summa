import express from "express";
import cors from "cors";

import pdfRoute from "./route/pdfRoute.js";
import pool from "./config/db.js";



const port = 4000;
const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.all("/", (req, res) => {
  res.send("Welcome to the backend");
});

app.use("/pdf", pdfRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// const result = await pool.query(
//   "INSERT INTO pdf_lists (pdf_name, pdf_file, user_id, summary) VALUES ($1, $2, $3, $4) RETURNING *",
//   [pdf_name, pdf_file, user_id, summary],
// );
// return result.rows[0];

app.all("/login", async (req, res) => {
  console.log(req.body);

  try {
    const users = await pool.query("SELECT username, password FROM users;");
    const users_information = users.rows;

    for (let i = 0; i < users_information.length; i++) {
      if (
        users_information[i].username === req.body.username &&
        users_information[i].password === req.body.password
      ) {
        console.log("Login Successful");
        return res.status(200).json({ message: "Login Successful" });
      }
    }
    return res.status(400).json({ message: "Invalid Credentials" });
  } catch (error) {
    console.error(error.message);

    return res.status(500).json({ message: "Server Error" });
  }
});
