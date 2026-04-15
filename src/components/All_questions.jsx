import React from 'react'
import "../designing/style.css"
import { useEffect,useState } from 'react'
import { FaFilter,FaThLarge,FaDatabase,FaTerminal,FaRandom,FaJs} from "react-icons/fa";
import { FaProjectDiagram } from "react-icons/fa";
import { SiPandas } from "react-icons/si";
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import Side_bar from "./side_bar"
import { Link } from 'react-router-dom';
 const All_questions = () => {
  const{user} = useUser()
  const router = useNavigate()
  const [data, set_data] = useState([])
  const[copy,set_copy] = useState([])
  const[search,set_search] = useState("")
  const[do_like,set_like] = useState([])
  const[show,set_show] = useState(false)
   async function get() {
    let res = await fetch("http://localhost:5000/get")
    let data =await res.json();
    set_data(data.data)
    set_copy(data.data);
   }
   useEffect(() => {
     get();
  }, [])

  useEffect(() => {
    if(search===""){
set_data(copy)
   return;
    }
    const set_timer = setTimeout(async() => {
      let res = await fetch("http://localhost:5000/search",{
  method:"POST",
  headers:{"Content-Type":"application/json"},
  body:JSON.stringify({data:search})
})
let data = await res.json();
if(data.data.length>0){
set_data(data.data)
}
     },200);
    return ()=>clearTimeout(set_timer);
  }, [search])
  
  const item_data = async(item)=>{
    if(item==="All Topics"){
set_data(copy)
return
    }
let res = await fetch("http://localhost:5000/data",{
  method:"POST",
  headers:{"Content-Type":"application/json"},
  body:JSON.stringify({data:item})
})
let data = await res.json();
set_data(data.data)
   }
   let choose  = [{logo:<FaProjectDiagram style={{ color: "red" }}/>,item:"All Topics"},{logo:<FaThLarge style={{ color: "white" }} />,item:"Algorithm"},{item:"Database",logo:<FaDatabase style={{ color: "white" }}/>},{logo:<FaTerminal style={{ color: "white" }}/>,item:"Shell"},{logo:<FaRandom style={{ color: "black" }}/>,item:"Concurrency"},{logo:<FaJs style={{ color: "yellow" }}/>,item:"JavaScript"},{logo:<SiPandas style={{ color: "green" }}/>,item:"Panadas"}]
let arr = ["Array","String","Hash Table","Graph","Tree","Recursion", "Dynamic Programming","Greedy","Backtracking","Binary Search", "Sorting","Stack","Queue","Linked List","Heap", "Trie","Segment Tree","Bit Manipulation","Math","Geometry", "Two Pointers","Sliding Window","Prefix Sum","Suffix Array","Union Find", "Topological Sort","DFS","BFS","Shortest Path","Dijkstra", "Floyd Warshall","Kruskal","Prim","Matrix","Simulation","Design","Concurrency","Memoization","Divide and Conquer","Game Theory","Number Theory","Combinatorics","Probability","Bitmask","Hashing"]; 
let image = ["https://cdn.vectorstock.com/i/1000v/71/91/business-growth-chart-with-blue-arrow-vector-1767191.jpg","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLEngOuxgmTNltjyrLvsqmd8ITV34eIpMPFw&s","https://media.geeksforgeeks.org/wp-content/uploads/20230710170403/BAsic-Coding-Problem-DSA--2.png"
  ,"https://ioai-official.org/wp-content/uploads/2025/06/ChatGPT-Image-Jun-30-2025-04_46_05-PM.png"
]

 const like = async(i,item)=>{
  if(!do_like.includes(i)){
    document.querySelector(`.like${i}`).innerHTML ='⭐'
    do_like.push(i)
    let res = await fetch("http://localhost:5000/like",{
  method:"POST",
  headers:{"Content-Type":"application/json"},
  body:JSON.stringify({que:item.problem_id,index:i,title:item.title,difficulty:item.difficulty,user_id:user.id,email:user.primaryEmailAddress.emailAddress,name:user.fullName,like:true})
})
  }
  else{
    document.querySelector(`.like${i}`).innerHTML ='☆'
    setTimeout(async() => {
     do_like.splice(i, 1);
    await fetch(`http://localhost:5000/deleted/${user?.id}/${item.problem_id}`,{method: "DELETE"});
    alert("sucessfully unmarked");
    }, 200);
  }
 }

 async function liked() {
  try{
let res = await fetch(`http://localhost:5000/get_favroit?user_id=${user?.id}`)
    let data  = await res.json()
    let data_id = data.data.map((item)=>item.id)
     set_like(data_id)
    }catch(err){
    console.log(err.message)
  }
 }
 useEffect(() => {
    liked()
 }, [user])
 
const type = async(type)=>{
try{
let res = await fetch(`http://localhost:5000/type?type=${type}`)
let data = await res.json()
set_data(data.data);
}catch(err){
console.log(err.message)
}
}
const image_click = async(i,type)=>{
  if(i==0){
    router("/your_progress")
  }
  if(i==3){
    router("/contest")  
  }
  if(i==1 ||i==2 ){
try{
let res = await fetch(`http://localhost:5000/type?type=${type}`)
let data = await res.json()
set_data(data.data);
}catch(err){
console.log(err.message)
}
  }
}
 return (
  <>
  <div className='types'>
    {arr.map((item)=>{
     return <> <div onClick={()=>item_data(item)} className='item'>{item}</div></> 
})}
  </div>
      <div className='hero'>
         
<Side_bar/>
  <div className='content'> 
           <div className='main-containt'>
  
<div className='image'>
              {image.map((item,i)=>{
                return <>
                {i==1 && <img onClick={()=>image_click(i,"Hard")} style={{cursor:'pointer'}} src={item} alt="" />}
                {i==2 && <img onClick={()=>image_click(i,"Easy")} style={{cursor:'pointer'}} src={item} alt="" />}
                {(i == 0 || i==3) && <img onClick={()=>image_click(i)} style={{cursor:'pointer'}} src={item} alt="" />}

                </>
              })}
            </div>

  <div className='choose'>
    {
      choose.map((item)=>{
             return <> <div onClick={()=>item_data(item.item)} className='item123'>
              <div className='logo'>{item.logo}</div>
              <div>{item.item}</div>
              </div></> 
      })
    }
  </div>
           <div className='input'>
            <div><input value={search} onChange={(e)=>set_search(e.target.value)} type="text" placeholder='search' /></div>
            <div onClick={()=>set_show(!show)} className="filter-icon"><FaFilter style={{background:'none'}}/></div>
           </div>
           <div className={`${!show? "filter_box":"show_filter"}`}>
            <div onClick={()=>type("Easy")}>Easy</div>
            <div onClick={()=>type("Medium")}>Medium</div>
            <div onClick={()=>type("Hard")}>Hard</div>
           </div>
            {data.length>0 ? data.map((item,i)=>{
            return <>
            <div className='problem'>
            <div className='id'><div>{item.problem_id}</div>
            <div>{item.title}</div></div>
            <div className='ip'>
            <div className='difficulty_45876' style={item.difficulty==="Easy" ? {color:'rgb(36 209 205)'}:{} ||item.difficulty==="Medium" ? {color:'rgb(160, 229, 160)'}:{} || item.difficulty==="Hard"? {color:'red'}:{} }>{item.difficulty}</div>
            {user &&<div style={{cursor:'pointer'}}  className={`like${item.problem_id} star_btn`} onClick={()=>like(item.problem_id,item)}>{do_like.includes(item.problem_id)?"⭐":"☆"} </div>}
            {!user && <div style={{cursor:'pointer'}} onClick={()=>router("/login_page")}>☆</div>}

            <div onClick={()=>router(`/editor?problem_id=${item.problem_id}`)} className='btn'>Solve</div>
            </div>
           </div>
            </>
          }):<><div style={{justifySelf:'center',marginTop:'5%'}}><img  width={"100%"} height={"100px"} src="https://maxst.icons8.com/vue-static/threedio/errors/not-found.png" alt="" /></div></>} 
          </div>
                   </div>
</div>
      </>
  )
}

export default All_questions
