import Company from "../models/company.models.js";
import cloudinary from "../utils/cloudinary.js";
import  streamifier  from "streamifier";

/// register company

export const registerCompany = async (req, res) => {
  try {
    const { name, email, website, location, description } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Company is required" });
    }
    const existedcompany = await Company.findOne({
      name,
      userId: req.user._id,
    });
    if (existedcompany) {
      return res
        .status(400)
        .json({ success: false, message: "Company is already exist" });
    }
    const company = await Company.create({
      name,
      userId: req.user._id,
      email,
      website,
      location,
      description,
    });
    return res
      .status(201)
      .json({ message: "Company is created", success: true, company });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get company  by logged in user

export const getCompany = async (req, res) => {
  try {
    const companies = await Company.find({ userId: req.user._id }).populate({
      path: "userId",
      select: "fullName email",
    });
    if (!companies) {
      return res.status(404).json({ message: "Company not found" ,success:false});
    }
    return res.status(200).json({companies,success:true});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/// company find by id in brower link parameter

export const getCompanybyId = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    return res.status(200).json({company,success:true});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//   update company

export const updateCompany = async (req, res) => {
  try {
    const { name, description,email, website, location } = req.body;
    // const file = req.file;
    const { logo } = req.files || {};

    // Build updateData only with fields that exist
    const updateData = {};

    if (name) updateData.name = name;
    if (description) updateData.description = description;
    if (website) updateData.website = website;
    if (email) updateData.email=email;
    if (location) updateData.location = location;
    // if (file) updateData.logo = file.path;

    const uploadToCloudinary = (fileBuffer, options) => {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          options,
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        streamifier.createReadStream(fileBuffer).pipe(uploadStream);
      });
    };

    // Upload logo
    
    if (logo && logo[0]) {
      const result = await uploadToCloudinary(logo[0].buffer, {
        resource_type: "image",
        folder: "companies_logo",
        public_id: `${req.params.id}_logo_${Date.now()}`,
      });
      updateData.logo = result.secure_url;
    }

    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true, // ensures validation still applies
    });

    if (!company) {
      return res.status(404).json({ message: "Company not Found" });
    }

    return res
      .status(200)
      .json({
        message: "Company Information Updated Successfully",
        company,
        success: true,
      });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
