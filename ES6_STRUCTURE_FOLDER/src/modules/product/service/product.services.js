import DB from "../../../DB/connection.js";


//_______________________________________________________________
export const insertProduct = (req, res, next) => {
  const { name, price, stock, isDeleted = false, userId } = req.body;
  //   console.log({ name, price, stock, isDeleted,userId });

  const checkUserExist = `SELECT * FROM users WHERE u_id = ?`;

  DB.execute(checkUserExist, [userId], (err, data) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Fail to execute this query", err });
    } else {
      if (!data.length) {
        return res
          .status(404)
          .json({
            message:
              "User not found you must have id account to insert product",
          });
      } else {
        const insertProductQuery = `INSERT INTO product (pr_name, pr_price, pr_stock, pr_isDeleted,pr_userId) VALUES (?, ?, ?, ?,?)`;
        DB.execute(
          insertProductQuery,
          [name, price, stock, isDeleted, userId],
          (err, data) => {
            if (err) {
              console.error("Error inserting product:", err);
              return res
                .status(500)
                .json({ error: "Failed to insert product query" });
            }
            res.status(201).json({
              message: "Product added successfully.",
              productId: data,
            });
          }
        );
      }
    }
  });
};
//_______________________________________________________________
export const softDelete = (req, res, next) => {
  const { id } = req.params;
  // console.log({ id});

  const checkProductExist = `SELECT * FROM product WHERE pr_id = ?`;

  DB.execute(checkProductExist, [id], (err, data) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Fail to execute this query", err });
    } else {
      if (!data.length) {
        return res.status(404).json({
          message: `No product found with id = ${id}`,
        });
      } else {
        // Update the isDeleted flag to true
        const softDeleteQuery = `UPDATE product SET pr_isDeleted = true WHERE pr_id = ? AND pr_isDeleted = false`;
          DB.execute(
            softDeleteQuery,
            [id],
            (err, data) => {
              if (err) {
                console.error("Error inserting product:", err);
                return res
                  .status(500)
                  .json({ error: "Failed to mark product as deleted." });
              }
             res
               .status(200)
               .json({ message: "Product marked as soft_deleted successfully." });
            }
          );
      }
    }
  });
};
//_______________________________________________________________
export const DeleteProduct = (req, res, next) => {
  const { id } = req.params;
  // console.log({ id});

  const checkProductExist = `SELECT * FROM product WHERE pr_id = ?`;

  DB.execute(checkProductExist, [id], (err, data) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Fail to execute this query", err });
    } else {
      if (!data.length) {
        return res.status(404).json({
          message: `No product found with id = ${id}`,
        });
      } else {
        // Delete the product from the database
        const deleteProductQuery = `DELETE FROM product WHERE pr_id = ?`;
        DB.execute(deleteProductQuery, [id], (err, data) => {
          if (err) {
            console.error("Error inserting product:", err);
            return res
              .status(500)
              .json({ error: "Failed to mark product as deleted." });
          }
          res
            .status(200)
            .json({ message: "Product marked deleted successfully." });
        });
      }
    }
  });
};
//_______________________________________________________________
export const searchProductByName = (req, res, next) => {
  const { searchKey } = req.query;
    console.log({ searchKey });
    const searchQuery = `SELECT * FROM Product WHERE pr_name LIKE ? AND pr_isDeleted = false`;

  DB.execute(searchQuery, [`%${searchKey}%`], (err, data) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Fail to execute this query", err });
    } else {
        if (!data.length) { 
            return res.status(404).json({
                message: `No product found with name = ${searchKey}`,
            })
        }
      return res.status(200).json({ message: "Done", products:data });
    }
  });
};
//_______________________________________________________________
export const selectProductsByIn_Ids = (req, res, next) => {
  const { ids } = req.query;
  console.log({ ids });
  // Convert the comma-separated string into an array of integers
  const idArray = ids.split(",").map(Number);
//   console.log(idArray);

  // Construct the SQL query with placeholders
  const selectQueryIds = `SELECT pr_id, pr_name, pr_price FROM product WHERE pr_id IN (?);`;

    DB.query(selectQueryIds, [idArray], (err, data) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Fail to execute this query", err });
      } else {
        if (!data.length) {
          //   return res.status(404).json({
          //     message: `No product found with name = ${searchKey}`,
          //   });
        }
        return res.status(200).json({ message: "Done", products: data });
      }
    });
};
//_______________________________________________________________
export const allProductsNotSoftDelete = (req, res, next) => {
 

  // Construct the SQL query with placeholders
   const getAllProductQuery = `
    SELECT pr_id, pr_name AS productName, pr_price AS cost FROM product WHERE pr_isDeleted = false;
  `;

  DB.query(getAllProductQuery, (err, data) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Fail to execute this query", err });
    } else {
      if (!data.length) {
          return res.status(404).json({
            message: `No product found `,
          });
      }
      return res.status(200).json({ message: "Done", products: data });
    }
  });
};
//_______________________________________________________________
export const productsWithUsers = (req, res, next) => {
  // Construct the SQL query with placeholders
  const productQueryWithUsers = `SELECT p.pr_name AS productName,  u.u_email AS userEmail
    FROM product p
    INNER JOIN users u
    ON p.pr_userId = u.u_id
    WHERE p.pr_isDeleted = false
  `;

  DB.query(productQueryWithUsers, (err, data) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Fail to execute this query", err });
    } else {
      if (!data.length) {
        return res.status(404).json({
          message: `No user have product  `,
        });
      }
      return res.status(200).json({ message: "Done", products: data });
    }
  });
};
//_______________________________________________________________

export const max_price = (req, res, next) => {
  // Construct the SQL query with placeholders
  const maxPriceQuery = `
    SELECT MAX(pr_price) AS maxPrice,pr_name AS name_Product
    FROM product 
    WHERE pr_isDeleted = false
  `;

  DB.query(maxPriceQuery, (err, data) => {
    if (err) {
      console.error("Error fetching maximum price:", err);
      return res.status(500).json({ error: "Failed to fetch maximum price." });
    } else {
    
      return res.status(200).json({ message: "Done", price: data[0] });
    }
  });
};
//_______________________________________________________________
export const top_expensive = (req, res, next) => {
  // Construct the SQL query with placeholders
  const topExpensiveQuery = `
    SELECT pr_name AS name_Product, pr_price AS price_Product
    FROM product
    WHERE pr_isDeleted = false
    ORDER BY pr_price DESC
    LIMIT 5
  `;

  DB.query(topExpensiveQuery, (err, data) => {
    if (err) {
       console.error('Error fetching top expensive products:', err);
      return res.status(500).json({ error: 'Failed to fetch top expensive products.' });
    } else {
      return res.status(200).json({ message: "Done", price: data });
    }
  });
};
//_______________________________________________________________
