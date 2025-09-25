import jwt from "jsonwebtoken";

const isauthenticated = async(req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  
  if (!token) {
    return res.status(401).json({ message: "Access denied" });
  }
  try {
    const decoded =  jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded){
        return res.status(401).json({ message: "Invalid token" });
    }
    req.user = { _id: decoded._id  };
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default isauthenticated;