import express from "express";

import isauthenticated from "../middlewares/isauth.js";
import {
  applyJob,
  getappliedJobs,
  getApplicants,
  updateApplicationStatus
} from "../controllers/application.controller.js";

const router=express.Router()

//application routes

router.route("/apply-job/:jobId").post(isauthenticated,applyJob)
router.route("/applied-Job").get(isauthenticated,getappliedJobs)
router.route("/:id/applicants").get(isauthenticated, getApplicants);
router.route("/status/:id/updateStatus").put(isauthenticated,updateApplicationStatus)

export default router;