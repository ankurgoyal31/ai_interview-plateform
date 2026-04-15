import React from 'react'
import { useEffect,useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import "../designing/favroit.css"
import { Link } from 'react-router-dom';
import Side_Bar from './side_bar';
const favroit = () => {
    const [data, setdata] = useState([])
    const {user} = useUser()
    async function get() {
        try{
    let res = await fetch(`http://localhost:5000/get_favroit?user_id=${user?.id}`)
    let data  = await res.json()
    setdata(data.data);
        }catch(err){
            console.log(err.message)
            alert("check connection")
        }
    }

    useEffect(() => {
       get()
    }, [user])

    const delete_item = async(id)=>{
    await fetch(`http://localhost:5000/deleted/${user.id}/${id}`,{method: "DELETE"});
    alert("sucessfully deleted");
    }

  return (
    <>

    <div className='hero_container123354'>
        <div className='container78566444'> 
                 <Side_Bar/>
 
        <div className='child_hero56'>
                                <h3>Your Favroits</h3>
             {
                data.length>0 ? data.map((item,i)=>{
                   return<>
                   <div className='div_problems'> 
 <div className='problem'>
            <div className='id'><div>{item.id}</div>
            <div>{item.title}</div></div>
            <div className='ip'>
            <div  style={item.difficulty==="Easy" ? {color:'rgb(36 209 205)'}:{} ||item.difficulty==="Medium" ? {color:'rgb(160, 229, 160)'}:{} || item.difficulty==="Hard"? {color:'red'}:{} }>{item.difficulty}</div>
            <div className={`like${i}`} onClick={()=>like(i,item)}>⭐</div>
            <Link style={{color:'white',textDecoration:'none'}} to={`/editor?problem_id=${item.id}`}><div className='btn'>Solve</div></Link> 
            <div onClick={()=>delete_item(item.id)} className='btn'>Delete</div>
            </div>
           </div>
           </div>

                   </> 
                }):<><div style={{justifySelf:'center',marginTop:'10%'}}><img  width={"100%"} height={"100px"} src="https://maxst.icons8.com/vue-static/threedio/errors/not-found.png" alt="" /></div></>            }
        </div>
    </div>
    </div>
    </>
  )
}
export default  favroit;
