import express from "express";
const router = express.Router();

import isauthenticated from "../middlewares/isauth.js";

import {
  postJob,
  getAllJobs,
  getJobById,
  getAdminJobs
} from "../controllers/job.contoller.js";

router.route("/post-job").post(isauthenticated, postJob);
router.route("/getall-jobs").get(isauthenticated, getAllJobs);
router.route("/get-job/:id").get(isauthenticated, getJobById);
router.route("/getJobsAdmin/:id").get(isauthenticated, getAdminJobs);

// router.route("/getJobsAdmin/:id").get(isauthenticated, getAdminJobs);

export default router;