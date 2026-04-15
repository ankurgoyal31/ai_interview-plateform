import { MongoClient } from "mongodb";
import { configDotenv } from "dotenv";

configDotenv();

const client = new MongoClient(process.env.MONGO_URI);
let All_questions;
let attend_interview;
let attend_question;
let attend_contest;
let like ;
async function connect() {
  try {
    await client.connect();
    const db = client.db("AI_Interviewer_coding_questions");
    All_questions =db.collection("All_questions")
    attend_interview = db.collection("attend_interview");
    attend_contest = db.collection("attend_contest");
    attend_question = db.collection("attend_question");
    like = db.collection("likes")
    await like.createIndex({user_id:1});
    await All_questions.createIndex({difficulty:1,problem_id:1})
    await attend_contest.createIndex({user_id:1});
    await attend_interview.createIndex({user_id:1});
    return {All_questions,attend_contest,attend_interview,attend_question,like};
  } catch (err) {
    console.log("DB connection error:", err.message);
    return null;
  }
}
export { connect };