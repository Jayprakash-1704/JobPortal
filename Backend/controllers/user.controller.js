import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import cloudinary from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";
import streamifier from "streamifier";

export const register = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, password, role } = req.body;
    if (!fullName || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      fullName,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
    });
    res
      .status(201)
      .json({ message: "User registered successfully", success: true });
  } catch (error) {
    res.status(400).json(error);
  }
};

export const login = async (req, res) => {
  try {
    // check credentials

    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    ///email already registered

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    //  password

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    //role

    if (role !== user.role) {
      return res.status(400).json({ message: "Invalid role" });
    }

    /// token

    const tokenData = {
      _id: user._id,
    };
    const token = await jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    user = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
        sameSite: "lax", // change from "none"
        // secure: false,
      })
      .json({ message: `Welcome Back ${user.fullName}`, user, success: true });
  } catch (error) {
    res.status(400).json(error);
  }
};


export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      
      httpOnly: true,
      sameSite: "lax", 
      // secure: false,
    });
    return res
      .status(200)
      .json({ message: "Logout successfully", success: true });
  } catch (error) {
    console.log(error);
  }
};

// export const updateProfile = async (req, res) => {
//   try {
//     const { fullName, email, bio, skills, phoneNumber } = req.body;
//     const file = req.file;

//     let skillsArray;
//     if (skills) {
//       skillsArray = skills.split(",").map((s) => s.trim());
//     }

//     let user = await User.findById(req.user.id);
//     if (!user) {
//       return res.status(400).json({ message: "User not found" });
//     }

//     if (fullName) user.fullName = fullName;
//     if (phoneNumber) user.phoneNumber = phoneNumber;
//     if (email) user.email = email;
//     if (bio) user.profile.bio = bio;
//     if (skills) user.profile.skills = skillsArray;

//     // ✅ Handle resume upload
//     if (file) {
//       const uploadStream = cloudinary.uploader.upload_stream(
//         {
//           resource_type: "raw", // use raw for PDFs/docs
//           folder: "resumes", // optional folder
//           public_id: file.originalname, // keep original name
//         },
//         async (error, result) => {
//           if (error) {
//             console.error("Cloudinary Upload Error:", error);
//             return res.status(500).json({ message: "Resume upload failed" });
//           }
//           user.profile.resume = result.secure_url; // save Cloudinary URL in DB
//           await user.save();

//           return res.status(200).json({
//             message: "Profile updated successfully",
//             user: {
//               _id: user._id,
//               fullName: user.fullName,
//               email: user.email,
//               phoneNumber: user.phoneNumber,
//               role: user.role,
//               profile: user.profile,
//             },
//             success: true,
//           });
//         }
//       );

//       // Convert file buffer to stream and pipe into Cloudinary
//       streamifier.createReadStream(file.buffer).pipe(uploadStream);
//     } else {
//       await user.save();
//       return res.status(200).json({
//         message: "Profile updated successfully",
//         user: {
//           _id: user._id,
//           fullName: user.fullName,
//           email: user.email,
//           phoneNumber: user.phoneNumber,
//           role: user.role,
//           profile: user.profile,
//         },
//         success: true,
//       });
//     }
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Something went wrong" });
//   }
// };

export const updateProfile = async (req, res) => {
  try {
    const { fullName, email, bio, skills, phoneNumber } = req.body;
    // const file = req.file;
    const { profilePhoto, resume } = req.files || {}; // multiple files

    let skillsArray;
    if (skills) {
      skillsArray = skills.split(",").map((s) => s.trim());
    }

    let user = await User.findById(req.user._id);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (fullName) user.fullName = fullName;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (email) user.email = email;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skillsArray;

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

    // ✅ Upload profile photo (image)
    if (profilePhoto && profilePhoto[0]) {
      const result = await uploadToCloudinary(profilePhoto[0].buffer, {
        resource_type: "image",
        folder: "profile_photos",
        public_id: `${user._id}_profile_${Date.now()}`,
      });
      user.profile.profilePhoto = result.secure_url;
    }

    if (resume && resume[0]) {
      const result = await uploadToCloudinary(resume[0].buffer, {
        resource_type: "raw",
        folder: "resumes",
        public_id: `${user._id}_resume_${Date.now()}_${resume[0].originalname}`,
      });
      user.profile.resume = result.secure_url;
    }

    await user.save();
    return res.status(200).json({
      message: "Profile updated successfully",
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
        profile: user.profile,
      },
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
