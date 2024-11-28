import { Router } from "express";
import DB from "../connection.js";

const router = Router();

router.post("/createTables", (req, res, next) => {
  const createUserTable = `
    CREATE TABLE IF NOT EXISTS users (
    u_id INT PRIMARY KEY AUTO_INCREMENT,
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    u_email VARCHAR(255) NOT NULL UNIQUE,
    u_role VARCHAR(50),
    u_password VARCHAR(255) NOT NULL
)
  `;

  const createPhoneTable =`
    CREATE TABLE IF NOT EXISTS Phone (
    ph_id INT PRIMARY KEY AUTO_INCREMENT,
    ph_phone VARCHAR(255) NOT NULL,
    ph_userId INT NOT NULL,
    FOREIGN KEY (ph_userId) REFERENCES users(u_id) ON DELETE CASCADE ON UPDATE CASCADE
)`;

  const createProductTable = `
    CREATE TABLE IF NOT EXISTS Product (
    pr_id INT PRIMARY KEY AUTO_INCREMENT,
    pr_name VARCHAR(255) NOT NULL,
    pr_stock INT DEFAULT 0,
    pr_price DECIMAL(10, 2) NOT NULL,
    pr_isDeleted BOOLEAN DEFAULT FALSE  NOT NULL,
    pr_userId INT NOT NULL,
    FOREIGN KEY (pr_userId) REFERENCES users(u_id) ON DELETE CASCADE ON UPDATE CASCADE
    )
  `;
  if (!req.body.createTables) {
    return res.status(400).json({ error: "Missing createTables flag" });
  } else {
    // Execute SQL Queries
    DB.query(createUserTable, (err, data) => {
      if (err) {
        console.error("Error creating User table:", err);
        return res.status(500).json({ error: "Failed to create User table" });
      }

      DB.query(createPhoneTable, (err, data) => {
        if (err) {
          console.error("Error creating Phone table:", err);
          return res
            .status(500)
            .json({ error: "Failed to create phone table" });
        }

        DB.query(createProductTable, (err, data) => {
          if (err) {
            console.error("Error creating Product table:", err);
            return res
              .status(500)
              .json({ error: "Failed to create Product table" });
          }

          res.status(200).json({ message: "Tables created successfully" });
        });
      });
    });
  }
});

//________________________________
export default router;
