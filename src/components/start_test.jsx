import React, { useEffect } from 'react'
import question from "../questions_mcq.json"
import "../designing/start_test.css" 
import { useState,useRef } from 'react'
import { useSearchParams } from 'react-router-dom' 
import { useUser } from '@clerk/clerk-react'
import  Submit  from './submit' 
const start_test = () => {
  const {user} = useUser()
     const [searchParams] = useSearchParams();
    const item = searchParams.get('item');
    const index = searchParams.get('index')||0
      const [count, set_count] = useState(0)
    const[select,set_select] = useState({})
    const[question_list,set_question] = useState([]) 
     const[arr,set_arr] = useState([])
     const[timer,set_timer]  = useState(0)
     const[show,set_show] = useState(false)
     const[result,set_result] = useState(false)
     const[prop,set_prop] = useState({score:0,attempt:0})
     
     useEffect(() => {
        let data = question.filter((item1) =>item1.category===item.toLowerCase()).slice(index,index+24);
        set_question(data)
    }, [])

     const change = ()=>{
        if(count>23){
          alert("do you want to submit")
           return
        }      
      if(count in select){
        document.querySelector(`.change${count}`).style.backgroundColor = "#0080009c";
       }
      else{
          document.querySelector(`.change${count}`).style.backgroundColor = "#d8250e9c";
      }
        if(count<23){
 set_count(count+1)
         }
       if(count==23){
set_show(true)
        }
      set_arr([...arr, count])
     }
     const count_show= (i)=>{
        if(arr.includes(i)){
             set_count(i)
          }
    }
     const submit = async()=>{
      let submit = confirm("do you want to sumbit");
         if(submit){
          try{
let dv = Object.keys(select).map((item)=>select[item])
           let data = question_list.filter((item)=>dv.includes(item.answer))
                      set_prop({score:data.length,attempt:Object.keys(select).length})
           set_result(true)

    let res = await fetch("http://localhost:5000/attend_contest",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({total_questions:question_list.length,language:item,Not_attend:question_list.length-Object.keys(select).length,user_id:user?.id,score:data.length,attempt:Object.keys(select).length,name:user.fullName,email:user.primaryEmailAddress.emailAddress})
  })
          }catch(err){
            console.log(err.message)
          }
            
         }
    }
    useEffect(() => {
      if(timer===600){
        alert("Auto Sumbit Activted,Time Up");
        submit()
        return;
      }
      let time =  setInterval(() => {
        set_timer(timer+1)
    },1000);
    return()=>clearInterval(time);
     }, [timer,question_list.length>0])
  return (
    <>
    {result && <div className='sumbit_detail'><Submit score={prop.score} value={result} test={item} attempt={prop.attempt}  /> </div>}
      <div className='details'>
      <div>
       Type : {item}
      </div>
             {question_list.length ?<div className='timer'>Timer :{timer/60<10?`0${Math.floor(timer/60)}`:timer/60}:{timer%60<10?`0${Math.floor(timer%60)}`:timer%60}</div>:<><div className='timer'>00:00</div></>}
    </div>
      <div className="main_test_container">
         <div className='left_box'>
  {question_list.length>0 ?<div className='question_test'>
         <div>
            <div>Q {count+1}. {question_list[count]?.question}</div>
            <div>
                {question_list[count]?.options.map((option, i)=>{
                    return <>
                    <div className='radio'>
                        <input  value={option} checked={select[count] === option} onChange={(e)=>set_select({...select,[count]:e.target.value})} type="radio" id={option} />
                        <label>{option}</label>
                    </div>
                    </>
                })}
                {!show &&<div onClick={change} className='submit_btn'>Next</div>}
                {show &&<div onClick={submit} className='submit_btn'>Submit</div>}

            </div>
         </div>
  </div>:<><div><img  width={"100%"} height={"100px"} src="https://maxst.icons8.com/vue-static/threedio/errors/not-found.png" alt="" /> <h3>Currently Not Available</h3></div></>}
        </div>
        <div className='right_box'>
 
             <div className='question1234'> 
 {
    Array(24).fill(0).map((item,i)=>{
        return <>
        <div> 
            <div onClick={()=>count_show(i)}  className={`change${i} option_test`}>{i+1}</div>
         </div>
        </>
    }       )
 }
 </div>
        </div>
      </div>
    </>
  )
}

export default start_test
