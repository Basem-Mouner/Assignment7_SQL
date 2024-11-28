
 import userController from'./modules/user/user.controller.js';
import DBController from './DB/model/structure.model.js'
import productController from "./modules/product/product.controller.js";

const bootstrap = (app, express) => {
  //_____________middle ware___________________
  app.use(express.json());//convert buffer data
  //___________app routing_____________________
  app.get("/", (req, res, next) => res.status(200).json({ message: "Hello in my New Folder Structure express ES6 IN ASSIGNMENT 7" }));
  //_____________sup express routing____________
  app.use("/DB", DBController);
  app.use('/user', userController);
  app.use("/products", productController);
  //______________________________________________
  app.all("*", (req, res, next) => {
    return res.status(404).json({ message: "page not found" });
  });
  //________________________________________________
};

export default bootstrap




