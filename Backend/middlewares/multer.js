// import multer from "multer";

// const storage = multer.memoryStorage();
// export const singleUpload = multer({ storage }).single("file"); // matches

import multer from "multer";

const storage = multer.memoryStorage();

// allow multiple named fields
export const uploadFiles = multer({ storage }).fields([
  { name: "profilePhoto", maxCount: 1 },
  { name: "resume", maxCount: 1 },
  { name: "logo", maxCount: 1 },
]);
