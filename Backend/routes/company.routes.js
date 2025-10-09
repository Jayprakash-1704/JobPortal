import express from "express";
import { getCompany, getCompanybyId, registerCompany, updateCompany } from "../controllers/company.controller.js";
import isauthenticated from "../middlewares/isauth.js";
import { uploadFiles } from "../middlewares/multer.js";

const router = express.Router();

router.route("/register-Company").post(isauthenticated,registerCompany);
router.route("/Company").get(isauthenticated, getCompany);
router.route("/Company/:id").get(isauthenticated, getCompanybyId);
router.route("/updateCompany/:id").put(isauthenticated,uploadFiles, updateCompany);


export default router;