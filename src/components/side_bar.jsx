import React from 'react'
import "../designing/style.css"
import { SignIn, useClerk } from "@clerk/clerk-react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const Side_Bar = () => {
  const navigate = useNavigate()
  const{user} = useUser()
const { signOut } = useClerk();
console.log("user",user)
  return (
    <>
      <div className='side_bar'>
        {user &&<div className='profile'> 
        <img width={50} height={50} style={{borderRadius:'50%'}} src={user?.imageUrl} alt="" />
        <h5>Welcome! {user?.fullName}</h5>
        </div>}
        <div className='text'> 
            <div className='set'> 
            <div>🪗</div>
<Link style={{color:'white',textDecoration:'none'}} to={"/"}><div>Library</div></Link>
</div>
<div className='set'> 
            <div>📈</div>
<Link style={{color:'white',textDecoration:'none'}} to={"/contest"}><div>Contest</div></Link>
</div>
<div className='flex set'> 
            <div><img className='img_avtar' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvQs1YM8uyWa8ddlX63b7RYTfIj2Ld3u_kuQ&s" alt="" /></div>
<Link style={{color:'white',textDecoration:'none'}} to={"/interview"}><div>Ai Interview</div></Link>
</div>
<div style={{background:'rgba(194, 59, 225, 0.05)',width:"180px",height:'40px',borderRadius:'10px',display:'flex',justifyContent:'center',alignItems:'center'}} className='set'> 
        <div>📚</div>
<Link style={{color:'white',textDecoration:'none'}} to={"/your_progress"}><div>Progress</div></Link>
</div>
         </div>
         <div className='list'> 
        <div>My List</div>
        <div style={{marginTop:'10%'}} className='set'>
        <div>⭐</div>
<Link style={{color:'white',textDecoration:'none'}} to={"/Favroit_quesions"}><div>Favroits</div></Link>
        </div>
         <div className='Sign_in'>
         {user && <div onClick={()=>signOut({ redirectUrl: "/" })}  className='btn_sign'>signOut</div>}
          {!user && <div onClick={()=>navigate("/login_page")} className='btn_sign'>signIn</div>}
       </div>
       </div>
        </div>
    </>
  )
}

export default Side_Bar
