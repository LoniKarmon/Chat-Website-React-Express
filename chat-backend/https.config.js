import fs from "fs";

const httpsOptions = {
  cert: fs.readFileSync("./cert.pem"),
  key: fs.readFileSync("./key.pem"),
};

export { httpsOptions };
