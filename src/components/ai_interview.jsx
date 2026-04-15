import React, { useEffect } from 'react'
import "../designing/interview.css"
import "../designing/style.css"
import Side_bar from "./side_bar"
import {useState } from 'react'
import { useUser } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom';
const ai_interview = () => {
    const router = useNavigate()
  const {user} = useUser();
  const[history,set_history] = useState([]);
  const[question,set_question] = useState("");
   const[text,set_text] = useState("");
  const[start,set_start] = useState(false); 
    const[timer,set_timer]  = useState(0)
    const sound = new Audio("src/sound/close_btn.wav");
    const sound_start = new Audio("src/sound/start_btn.wav");
const speak = (text)=>{
  if(text===""){
    return;
  }
  set_question(text);
  const utterance = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(utterance);
}

const recognition = new webkitSpeechRecognition();

recognition.onresult = async(event) => {
  const text = event.results[0][0].transcript;
  console.log(text);
  let data = await fetch("http://localhost:5000/interview",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({current_question:question,answer:text!==""?text:"i am ankur goyal",history:history})
  }) 
  let res = await data.json();
  console.log(res.data)
   set_history([...history,{question:question,answer:text}])
   speak(res.data)
};

const send = async()=>{
    sound_start.play();
  set_start(true);
  let data = await fetch("http://localhost:5000/interview",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({current_question:question,answer:text!==""?text:"i am ankur goyal",history:history})
  })

  let res = await data.json();
  console.log(res.data)
   set_history([...history,{question:question,answer:text}])
   speak(res.data)
}

const leave = ()=>{
  try{
    sound.play();
  set_start(false);
   set_history([]);
  speechSynthesis.cancel();
  speak("");
 complete(false)
  }catch(err){
        console.log(err.message)
      }
}
useEffect(()=>{
   return ()=>{
    speechSynthesis.cancel();
  }
},[])

async function complete(attend) {
  try{
let data = await fetch("http://localhost:5000/attend_interview",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({user_id:user.id,attend:attend,name:user.fullName,email:user.primaryEmailAddress.emailAddress})
  })
  alert("sumbitted");
    set_start(false);

  }catch(err){
    console.log(err.message)
  }
}
 useEffect(() => {
           if(start && timer===5){
             alert("Auto Sumbit Activted,Time Up");
             complete(true)
             return;
           }
           if(start){
 let time =  setInterval(() => {
             set_timer(timer+1)
         },1000);
         return()=>clearInterval(time);
           }
         }, [timer,start])

    return (
    <>
    <div className='hero_container'> 
        <Side_bar/>
        <div className='container'>
             <div className='box'>
                             {start && <div className='timer_ai'>Timer : {timer/60<10?`0${Math.floor(timer/60)}`:timer/60}:{timer%60<10?`0${Math.floor(timer%60)}`:timer%60}</div>}
                 <div className='greet'>
                <h3 style={{paddingLeft:'10px'}}>welcome! ankur goyal</h3>
                {start && <div onClick={leave} className='leave_btn'>Leave</div>}
                 </div>
                     <div className='robot1'> 
                <img className='robot' src="https://media.easy-peasy.ai/27feb2bb-aeb4-4a83-9fb6-8f3f2a15885e/6991d03f-d26c-4913-8368-4c431450ff9a.png" alt="" />
                {start && <div className='questions'>{question}</div>}
                {!start && user && <div className='start' onClick={()=>send()}>Start</div>}
                {!user && <div className='start' onClick={()=>router("/login_page")}>SignIn to start</div>}
               {start && <div className='input_box12'>
                    <input type="text" onKeyDown={(e) => {if (e.key === "Enter" && !e.shiftKey){send()}}} value={text} onChange={(e)=>set_text(e.target.value)} placeholder='enter you answer' />
                    <span onClick={()=>recognition.start()} style={{fontSize:'20px'}}>🎙️</span>
                </div>
                }
                </div>
            
                </div>
            </div>
         </div>
 
            </>
  )
}

export default ai_interview
