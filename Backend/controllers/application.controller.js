import Job from "../models/job.model.js";
import Application from "../models/application.model.js";

export const applyJob = async (req, res) => {
  try {
    const userId = req.user._id;
    const jobId = req.params.jobId;
    if (!jobId) {
      return res.status(400).json({ message: "job id is required" });
    }

    

    const existedApplied = await Application.findOne({
      job: jobId,
      applicant: userId,
    });
    if (existedApplied) {
      return res.status(400).json({ message: "you have already applied" });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(400).json({ message: "Job Does not exist" });
    }

    const newApplication = await Application.create({
      applicant: userId,
      job: jobId,
    });

    job.applications.push(newApplication._id);
    await job.save();
    return res
      .status(200)
      .json({ message: "application submitted succesfully",success:true });
  } catch (error) {
    console.log(error);
  }
};

// get applied jobs by the user //

export const getappliedJobs = async (req, res) => {
  try {
    const userId = req.user._id;
    const appliedJobs = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: [
          { path: "company", select: "name" }, 
          { path: "created_by", select: "fullName" },
        ],
      });
      //  console.log("AppliedJobs raw:", appliedJobs);
    if (!appliedJobs) {
      return res.status(400).json({ message: "No applied jobs found" });
    }
    return res.status(200).json({ appliedJobs,success:true });
  } catch (error) {
    console.log(error);
  }
};

//get how many applicant fill the application

export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
      options: {
        sort: { createdAt: -1 },
        populate: {
          populate: { path: "applicant", select: "fullName email role" }
      },
    }
    });
    if (!job) {
      return res.status(400).json({ message: "job not found" });
    }
    return res.status(200).json({ job,success:true });
  } catch (error) {
    console.log(error);
  }
};

// update application status

export const updateApplicationStatus = async (req, res) => {
  try {
    const ApplicationId = req.params.id;
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ message: "status is required" });
    }
    const application = await Application.findByIdAndUpdate(
      ApplicationId,
      {
        status: status.toLowerCase(),
      },
      { new: true }
    );

    if (!application) {
      return res.status(400).json({ message: "Application not found" });
    }

    return res
      .status(200)
      .json({ message: "Application status updated", application,success:true });
  } catch (error) {
    console.log(error);
  }
};

// export const updateApplicationStatus = async (req, res) => {
//   try {
//     const ApplicationId = req.params.id;
//     const { status } = req.body;
//     if (!status) {
//       return res.status(400).json({ message: "status is required" });
//     }
//     const application = await Application.findOne({_id:ApplicationId});

//     if (!application) {
//       return res.status(400).json({ message: "Application not found" });
//     }
//     application.status = status.toLowerCase();
//     await application.save();
//     return res.status(200).json({ message: "Application status updated" });
//   } catch (error) {
//     console.log(error);
//   }
// };
