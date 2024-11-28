import DB from "../../../DB/connection.js";

export const signup = (req, res, next) => {
  const { firstName, lastName, email, role, password } = req.body;
  // console.log({ firstName, lastName, email,role, password });
  // select return array but insert update delete return object
  DB.execute(
    `SELECT u_email FROM users WHERE u_email=?`,
    [email],
    (err, data) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Fail to execute this query", err });
      } else {
        if (data.length) {
          return res.status(409).json({ message: "Email EXIST" });
        }
        DB.execute(
          `INSERT INTO users (firstName,lastName,u_email,u_role,u_password) values(?,?,?,?,?)`,
          [firstName, lastName, email, role, password],
          (err, data) => {
            if (err || data?.affectedRows == 0) {
              return res
                .status(500)
                .json({ message: "Fail to execute this query", err });
            }
            return res.status(201).json({ message: "Done", data });
          }
        );
      }
    }
  );
};
export const login = (req, res, next) => {
  const { email, password } = req.body;
  console.log({ email, password });

  // select return array but insert update delete return object
  DB.execute(
    `SELECT * FROM users WHERE u_email=? and u_password=?`,
    [email, password],
    (err, data) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Fail to execute this query", err });
      } else {
        if (!data.length) {
          return res
            .status(404)
            .json({ message: "Email or password mismatch" });
        }
        return res.status(200).json({ message: "Done", data });
      }
    }
  );
};

export const alterTable = (req, res, next) => {
  const { userId } = req.body;

  // Check if the user is an admin
  const checkRoleQuery = `SELECT u_role FROM users WHERE u_id = ?`;

  DB.execute(checkRoleQuery, [userId], (err, data) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Fail to execute this query", err });
    } else {
      if (!data.length) {
        return res.status(404).json({ message: "User not found" });
      } else {
        const role = data[0].u_role;
        if (role === "admin") {
          const alterQuery = `ALTER TABLE users ADD COLUMN u_createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
ADD COLUMN u_updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;
          `;
          DB.execute(alterQuery, (err, data) => {
            if (err) {
              if (err.code == "ER_DUP_FIELDNAME") {
                return res
                  .status(409)
                  .json({ message: "Column already exists" });
              }
              return res
                .status(500)
                .json({ message: "Fail to execute alterQuery query", err });
            }

            return res
              .status(200)
              .json({ message: "Table altered successfully" });
          });
        } else {
          return res
            .status(403)
            .json({ error: "'Permission denied. User is not an admin.'" });
        }
      }
    }
  });
};

export const truncateTable = (req, res, next) => {
  const { userId } = req.body;
  // Check if the user is an admin
  const checkRoleQuery = `SELECT u_role FROM users WHERE u_id = ?`;

  DB.execute(checkRoleQuery, [userId], (err, data) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Fail to execute this query", err });
    } else {
      if (!data.length) {
        return res.status(404).json({ message: "User not found" });
      } else {
        const role = data[0].u_role;
        if (role === "admin") {
          const truncateTableQuery = `TRUNCATE TABLE Product`;
          DB.execute(truncateTableQuery, (err, data) => {
            if (err) {
              // if (err.code == "ER_DUP_FIELDNAME") {
              //   return res
              //     .status(409)
              //     .json({ message: "Column already exists" });
              // }
              return res
                .status(500)
                .json({ message: "Fail to execute truncateTableQuery ", err });
            }
            return res
              .status(200)
              .json({ message: "Table Product TRUNCATE successfully" });
          });
        } else {
          return res
            .status(403)
            .json({ error: "'Permission denied. User is not an admin.'" });
        }
      }
    }
  });
};


