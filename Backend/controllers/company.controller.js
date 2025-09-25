import Company from "../models/company.models.js";

/// register company

export const registerCompany = async (req, res) => {
  try {
    const { name,email,website,location,description } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Company is required" });
    }
    let company = await Company.findOne({ name });
    if (company) {
      return res.status(400).json({ message: "Company is already exist" });
    }
    company = await Company.create({
      name,
      userId: req.user.id,
      email,
      website,
      location,
      description,
    });
    return res.status(201).json({ message: "Company is created" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



//get company  by logged in user

export const getCompany = async (req, res) => {
  try {
    const companies = await Company.find({ userId: req.user.id }).populate({path:"userId",select:"fullName email"});
    if (!companies) {
      return res.status(404).json({ message: "Company not found" });
    }
    return res.status(200).json(companies);
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
    return res.status(200).json(company);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//   update company 


export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    const file = req.file;

    // Build updateData only with fields that exist
    const updateData = {};

    if (name) updateData.name = name;
    if (description) updateData.description = description;
    if (website) updateData.website = website;
    if (location) updateData.location = location;
    if (file) updateData.logo = file.path; // example if you’re storing company logo

    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true, // ensures validation still applies
    });

    if (!company) {
      return res.status(404).json({ message: "Company not Found" });
    }

    return res
      .status(200)
      .json({ message: "Company Information Updated Successfully", company });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
