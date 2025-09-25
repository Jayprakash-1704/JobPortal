import Job from "../models/job.model.js";

export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      experience,
      category,
      company,
      jobType,
      position,
    } = req.body;

    // const userId = req.user._id;

    //all field are required

    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !experience ||
      !category ||
      !company ||
      !jobType ||
      !position
    ) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(",").map((item) => item.trim()),
      salary,
      location,
      experience,
      category,
      company,
      jobType,
      position,
      created_by: req.user._id,
    });
    res.status(201).json({ message: "Job posted successfully", job,success:true });
  } catch (error) {
    console.log(error);
  }
};

// export const getAllJobs = async (req, res) => {
//   try {
//     const keyword = req.query.key || "";
//     const query = {
//       $or: [
//         { title: { $regex: keyword, $options: "i" } },
//         { description: { $regex: keyword, $options: "i" } },
//       ],
//     };

//     const alljobs = await Job.find(query)
//       .populate({ path: "company" })
//       .sort({ createdAt: -1 });
//     if (!alljobs) {
//       return res.status(404).json({ message: "No jobs found" });
//     }
//     res.status(200).json({alljobs,success:true});
//   } catch (error) {
//     console.log(error);
//   }
// };

// student

export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.key || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };

    const alljobs = await Job.find(query)
      .populate("company") // shortcut for { path: "company" }
      .sort({ createdAt: -1 });

    if (alljobs.length === 0) {
      return res.status(404).json({ success: false, message: "No jobs found" });
    }
    

    res.status(200).json({ success: true, alljobs });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "No job found" });
    }
    return res.status(200).json({job,success:true});
  } catch (error) {
    console.log(error);
  }
};

// job created by admin get

export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.params.id;
    const jobs = await Job.find({ created_by: adminId });
    if (!jobs) {
      return res.status(404).json({ message: "No jobs found" });
    }
    return res.status(200).json({jobs,success:true});
  } catch (error) {
    console.log(error);
  }
};
