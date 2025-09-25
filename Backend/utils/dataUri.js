import DataUriParser from "datauri/parser.js";

import path from "path";

const getDataURI = (file) => {
  const parser = new DataUriParser()
  const extname = path.extname(file.originalname)
  return parser.format(extname, file.buffer).content  // ✅ .content
}


export default getDataURI;
