import express from "express"
import { runCode } from "./output.js"
import { configDotenv } from "dotenv"
import {connect} from "./connections.js"
import main from "./ai_questions.js"
configDotenv();  
import cors from "cors"
import { data } from "react-router-dom";
let router = express() 
router.use(express.json())
router.use(cors())  
  let {All_questions,attend_contest,attend_interview,attend_question,like} = await connect();
  try{  
    router.post("/get", async (req, res) => {
   let output = await runCode(req.body.code,req.body.id)
   res.send({output:output})      
}) 
router.listen(5000, () => {
 });   
}catch(err){
  console.log("not->",err.message) 
} 
router.get("/get",async(req,res)=>{
try{
 let data  = await All_questions.find({},{projection:{title:1,problem_id:1,difficulty:1}}).limit(20).toArray()
  res.send({data:data,res:true})
}catch{
 res.send({data:[],res:false})
}
})
router.post("/data",async(req,res)=>{
  try{
 let data  = await All_questions.find({topics: req.body.data},{projection:{title:1,problem_id:1,difficulty:1}}).limit(20).toArray()
  res.send({data:data,res:true})
}catch(err){
  res.send({data:[],res:false})
}
})

router.get("/type",async(req,res)=>{
 try{
 let data  = await All_questions.find({difficulty:req.query.type},{projection:{title:1,problem_id:1,difficulty:1}}).limit(20).toArray()
  res.send({data:data,res:true})
}catch{
 res.send({data:[],res:false})
}
})
router.post("/search",async(req,res)=>{
  try{
 let data  = await All_questions.find({title:{ $regex: req.body.data, $options: "i" }},{projection:{title:1,problem_id:1,difficulty:1}}).limit(20).toArray()
      res.send({data:data,res:true});
  }catch(err){
    res.send({data:[],res:false});
  }
})

router.post("/code",async(req,res)=>{
  try{
 let data  = await All_questions.findOne({problem_id:req.body.id})
  res.send({data:data,res:true})

  }catch(err){
 res.send({data:[],res:false})
  }
})

router.post("/interview",async(req,res)=>{
  try{
    let ans = {current_question:req.body.current_question,answer:req.body.answer,history:req.body.history};
let data = await main(ans);
res.send({data:data,res:true})
  }catch(err){
console.log("err->",err.message)
  }
})

router.post("/attend_interview",async(req,res)=>{
  try{
let data = await attend_interview.insertOne({email:req.body.email,name:req.body.name,user_id:req.body.user_id,attend:req.body.attend,attend_date:Date.now()})
    res.status(200).json({sucess:true})
  }catch(err){
    res.status(500).json({sucess:false})
  }
})

router.get("/get_attend_interview",async(req,res)=>{
  try{
let data = await attend_interview.find({user_id:req.query.user_id}).toArray();
res.status(200).json({data:data,sucess:true})
  }catch(err){
       res.status(500).json({sucess:false}) 
  }
})

router.post("/attend_contest",async(req,res)=>{
  try{
    let update = await attend_contest.findOneAndUpdate({user_id:req.body.user_id,language:req.body.language,email:req.body.email},{$inc:{attempt:Number(req.body.attempt),Not_attend:Number(req.body.Not_attend),score:Number(req.body.score)}})
    if(update){
      return res.status(200).json({success:true})
    }
    await attend_contest.insertOne({total_questions:200,language:req.body.language,user_id:req.body.user_id,score:req.body.score,attempt:req.body.attempt,Not_attend:req.body.Not_attend,name:req.body.name,email:req.body.email,date:Date.now()})
res.status(200).json({success:true})
  }catch(err){
           res.status(500).json({sucess:false}) 
  }
})

router.get("/get_attend_contest",async(req,res)=>{
  try{
let data = await attend_contest.find({user_id:req.query.user_id}).toArray();
res.status(200).json({data:data,sucess:true})
  }catch(err){
       res.status(500).json({sucess:false}) 
  }
})
router.post("/like",async(req,res)=>{
  try{
    await like.insertOne({user_id:req.body.user_id,index:req.body.index,name:req.body.name,email:req.body.email,like:req.body.like,id:req.body.que,title:req.body.title,defficulty:req.body.difficulty})
    res.status(200).json({success:true})
  }catch(err){
       res.status(500).json({sucess:false}) 
  }
})

router.get("/get_favroit",async(req,res)=>{
  try{
let data = await like.find({user_id:req.query.user_id}).toArray()
        return res.status(200).json({data:data,success:true})
  }catch(err){
           res.status(500).json({success:false}) 
  }
})

router.delete("/deleted/:user_id/:id",async(req,res)=>{
  try{
     await like.findOneAndDelete({user_id:req.params.user_id,id:req.params.id})
    res.status(200).json({success:true})
  }catch(err){
              res.status(500).json({success:false})
  }
})

router.post("/submit_question",async(req,res)=>{
    try{
      let find = await attend_question.findOneAndUpdate({user_id:req.body.user_id,email:req.body.email,title:req.body.title},{$set:{date:Date.now()}})
      if(find){
        return res.status(200).json({success:true})
      }
    await attend_question.insertOne({user_id:req.body.user_id,name:req.body.name,email:req.body.email,id:req.body.que,title:req.body.title,defficulty:req.body.difficulty,date:Date.now()})
    res.status(200).json({success:true})
  }catch(err){
       res.status(500).json({sucess:false}) 
  }
})

router.get("/get_sumbitted_questions",async(req,res)=>{
  try{
let data = await attend_question.find({user_id:req.query.user_id}).toArray()
        return res.status(200).json({data:data,success:true})
  }catch(err){
           res.status(500).json({success:false}) 
  }
})

 router.listen(5000,()=>{
  console.log("running on 5000")
})