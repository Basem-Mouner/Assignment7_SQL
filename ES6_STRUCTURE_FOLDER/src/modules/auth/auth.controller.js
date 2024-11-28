import { Router } from "express";
let router = Router();

import * as authServices from"./service/registration.service.js";

router.get("/signup", authServices.signup);    
//________________________________
export default router
