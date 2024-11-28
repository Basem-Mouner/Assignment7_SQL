import { Router } from "express";
import * as productServices from "./service/product.services.js";

let router = Router();

//_______________________________________________________________
router.post("/", productServices.insertProduct);
router.patch("/softDelete/:id", productServices.softDelete);
router.delete("/:id", productServices.DeleteProduct);
router.get("/search", productServices.searchProductByName);
router.get("/in", productServices.selectProductsByIn_Ids);
router.get("/", productServices.allProductsNotSoftDelete);
router.get("/productsWithUsers", productServices.productsWithUsers);
router.get("/max_price", productServices.max_price);
router.get("/top_expensive", productServices.top_expensive);
//___________________________________________________________________
export default router;
