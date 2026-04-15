import axios from "axios";
export const runCode = async (code,id) => {
 const res = await axios.post("https://ce.judge0.com/submissions?base64_encoded=false&wait=true",
  {source_code: code,language_id: id});
 return res.data
};