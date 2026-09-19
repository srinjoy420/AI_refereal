import dotenv from "dotenv";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import crypto from "node:crypto";
import fs from "node:fs";
import axios from "axios";
import FormData from "form-data";

dotenv.config({ path: resolve(dirname(fileURLToPath(import.meta.url)), "../../.env") });

const timestamp = Math.floor(Date.now() / 1000);
const paramsToSign = `folder=resumes&timestamp=${timestamp}`;
const signature = crypto
  .createHash("sha1")
  .update(paramsToSign + process.env.CLOUDINARY_API_SECRET)
  .digest("hex");

const form = new FormData();
form.append("file", fs.createReadStream("C:\\Users\\SRINJOY\\Desktop\\me\\srinjoy_resume (1).pdf"));
form.append("api_key", process.env.CLOUDINARY_API_KEY);
form.append("timestamp", timestamp);
form.append("folder", "resumes");
form.append("signature", signature);

try {
  const res = await axios.post(
    `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/raw/upload`,
    form,
    { headers: form.getHeaders() }
  );
  console.log("SUCCESS:", res.data.secure_url);
} catch (err) {
  console.log("STATUS:", err.response?.status);
  console.log("BODY:", err.response?.data);
}