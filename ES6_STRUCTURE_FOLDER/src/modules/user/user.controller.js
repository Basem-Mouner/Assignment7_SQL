
import { Router } from 'express';
import * as userProfileServices from "./service/profile.service.js";
const router = Router();

router.post("/signup", userProfileServices.signup);
router.post("/login", userProfileServices.login); 
router.post("/alterTable", userProfileServices.alterTable);         
router.post("/truncateTable", userProfileServices.truncateTable);  
//________________________________
export default router;

