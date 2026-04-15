import React from 'react'
import Side_Bar from './side_bar';
import "../designing/progress.css"
import "../designing/style.css"
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
const progress = () => {
  const router = useNavigate()
  const [data,set_data] = useState([])
  const [show,set_show] = useState(1);
  const [attend_data,set_attend_data] = useState([])
  const [attend_data_contest,set_attend_contest] = useState([])
  const[sumbitted,set_submitted]  = useState([])
  const arr= [{item:"Total Interview",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvQs1YM8uyWa8ddlX63b7RYTfIj2Ld3u_kuQ&s",attend:attend_data.length},{item:'Attend Contest',image:"https://cdn.dribbble.com/userupload/5403472/file/original-de3cd76252213415bb72825262722699.png?format=webp&resize=400x300&vertical=center",attend:attend_data_contest.length},{item:'Attend Questions',image:"https://cdn.dribbble.com/userupload/5403472/file/original-de3cd76252213415bb72825262722699.png?format=webp&resize=400x300&vertical=center",attend:sumbitted.length}]
  const quik = [{item:"All Questions",image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvQs1YM8uyWa8ddlX63b7RYTfIj2Ld3u_kuQ&s'},{item:"Contest",image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvQs1YM8uyWa8ddlX63b7RYTfIj2Ld3u_kuQ&s'},{item:"Interview",image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvQs1YM8uyWa8ddlX63b7RYTfIj2Ld3u_kuQ&s'},{item:'Profile',image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvQs1YM8uyWa8ddlX63b7RYTfIj2Ld3u_kuQ&s"}]
  let {user} = useUser();
   async function get() {
       let res = await fetch("http://localhost:5000/get")
       let data =await res.json();
       let random =  Math.floor(Math.random()*data.data.length);
       console.log(random)
       set_data(data.data.slice(random,20))
       console.log(data)
     }
     async function get_interview() {
      try{
       let res = await fetch(`http://localhost:5000/get_attend_interview?user_id=${user?.id}`)
       let data = await res.json()
       console.log(data)
       set_attend_data(data.data)
      }catch(err){
         alert("please check your network connection")
      }
     }

     console.log(data)
     useEffect(() => {
        get();
     }, [])
 
     useEffect(() => {
       get_interview()
     }, [user?.id])

async function get_submitted() {
      try{
       let res = await fetch(`http://localhost:5000/get_sumbitted_questions?user_id=${user?.id}`)
       let data = await res.json()
         set_submitted(data.data)
      }catch(err){
         alert("please check your network connection")
      }
     }
     console.log("submitted",sumbitted)
     useEffect(() => {
        get_submitted();
     }, [user?.id])

async function get_contest_data() {
      try{
       let res = await fetch(`http://localhost:5000/get_attend_contest?user_id=${user?.id}`)
       let data = await res.json()
        set_attend_contest(data.data)
      }catch(err){
         alert("please check your network connection")
      }
     }
     console.log("submitted",sumbitted)
     useEffect(() => {
        get_contest_data();
     }, [user?.id])


     const increament = async(item)=>{
      try{
         set_show(item)
       }catch(err){
console.log(err.message)
      }
     }

   return (
    <>
     <div className='main_div34'>
         <Side_Bar/>
            <div className='main98'> 
         <div className='main_box235'>
          <div className='child_container_123'> 
          <div>
            <img width={50} height={50} style={{borderRadius:"50%"}} src={user?.imageUrl} alt="" />
          </div>
          <div className='greet_box12'> 
                  <div>Good Morning</div>
     <div>{user?.fullName}</div>
     <div>Active</div>
     </div>
     </div>
     <div style={{color:'#ffffff67'}}>
            {new Date(Date.now()).toLocaleString()}
          </div>
     </div>

      <div className='main_item_box1234'>
         {
          arr.map((item,i)=>{
            return <>
             <div onClick={()=>increament(i+1)} className='item_box12435'> 
            <div><img width={50} height={50} style={{borderRadius:'50%',objectFit:'cover'}} src={item.image} alt="" /></div>
            <div>{item.item}</div>
            <div>{item.attend}</div>
            </div>
              </>
          })
        }
      </div>

   {show==1 &&  <> {attend_data?.length>0  ? <div className='main_details_div6576'> 
      {attend_data.map((item,i)=>{
    return <>
    <div className='details_progress'>
    <div>you have attend {i+1} interview</div>
    <div>{new Date(item.attend_date).toLocaleString()}</div>
    <div className={item.attend?"completed":"InComplete"}>{item.attend?"Completed":"InComplete"}</div>
    <div className='btn_enter123'><Link  style={{textDecoration:'none',color:'white',background:'blue'}} to={"/interview"}><div>More Interview</div></Link> </div>
    </div>
    </>
   })}
    </div>:<><div style={{width:'80%',marginTop:'10px',justifyItems:'center'}}>
      <div><img  width={"100%"} height={"100px"} src="https://maxst.icons8.com/vue-static/threedio/errors/not-found.png" alt="" /></div>
       </div></>}</>}

       {show==2 && <> {attend_data_contest?.length>0  ? <div className='main_details_div6576'> 
      {attend_data_contest.map((item,i)=>{
    return <>
    <div className='details_progress'>
      <div style={{textAlign:'center',color:'green',background:'black',padding:'1px',borderRadius:'20px',border:'solid #d6c1c133 1px'}}>
      <div>{item.score}</div>
      <div>Score</div>
     </div>
    <div>Total Questions : {item.total_questions}</div>
    <div>Language : {item.language}</div>
    <div>Attemp : {item.attempt}</div>
    <div>Not Attemp : {item.Not_attend}</div>
    <div className='btn_enter123'><Link  style={{textDecoration:'none',color:'white',background:'blue'}} to={`/start_test?item=${encodeURI(item.language)}&index=${item.attempt}`}><div>More Contest</div></Link> </div>
    </div>
    </>
   })}
    </div>:<><div style={{width:'80%',marginTop:'10px',justifyItems:'center'}}>
      <div><img  width={"100%"} height={"100px"} src="https://maxst.icons8.com/vue-static/threedio/errors/not-found.png" alt="" /></div>
       </div></>}</> }

{show==3 && <> {sumbitted?.length>0  ? <div className='main_details_div6576'> 
    {sumbitted.map((item,i)=>{
    return <>
    <div className='details_progress'>
      <h4>Successfully Submitted</h4>
    <div>Question Id : {item.id}</div>
     <div>defficulty: {item.defficulty}</div>
    <div>title : {item.title}</div>
    <div>{new Date(item.date).toLocaleString()}</div>
    <div className='btn_enter123'><Link  style={{textDecoration:'none',color:'white',background:'blue'}} to={"/"}><div>More Questions</div></Link> </div>
    </div>
    </>
   })}
    </div>:<><div style={{width:'80%',marginTop:'10px',justifyItems:'center'}}>
      <div><img  width={"100%"} height={"100px"} src="https://maxst.icons8.com/vue-static/threedio/errors/not-found.png" alt="" /></div>
       </div></>}</> }

 <div className='main_item_box123478'>
  <h3>Recommanded Questions</h3>
    {data?.length>0 && data.slice(0,5).map((item)=>{
            return <>
            <div  className='problem'>
            <div className='id'><div>{item.problem_id}</div>
            <div>{item.title}</div></div>
            <div className='ip'>
            <div  style={item.difficulty==="Easy" ? {color:'rgb(36 209 205)'}:{} ||item.difficulty==="Medium" ? {color:'rgb(160, 229, 160)'}:{} || item.difficulty==="Hard"? {color:'red'}:{} }>{item.difficulty}</div>
            <div>⭐</div>
            <div onClick={()=>router(`/editor?problem_id=${item.problem_id}`)} className='btn'>Solve</div>
            </div>
           </div>
            </>
          })} 
</div>

<div className='main_item_box1234'>
         {
          quik.map((item)=>{
            return <>
            <div style={{backgroundColor:'#01003c39'}} className='item_box12435'> 
            <div><img width={50} height={50} style={{borderRadius:'50%',objectFit:'cover'}} src={item.image} alt="" /></div>
            <div>{item.item}</div>
             </div>
             </>
          })
         }
     </div>
         </div>
         </div>
      </>
   )
}
export  default progress;