import React from 'react'
import "../designing/submit.css"
const Sumbit = ({value,score,test,attempt}) => {
  return (
    <> 
    <div className={value?"show main_sumbit_deatil":`main_sumbit_deatil`}>
      <div className='details_box'>
      <div><img style={{borderRadius:'50%'}} width={60} height={60} src="src/sound/Submit.gif" alt="" /></div>
 <div style={{fontSize:'25px',fontStyle:'italic'}}>Sumbitted Sucessfully</div>
<div style={{fontSize:'20px'}}>{test}</div>
<div style={{color:'red'}}>Not Attempt : {24-attempt}</div>
<div style={{color:'green'}}>Total Attemped : {attempt}</div>
 <div className='scroe_progress'> 
<div className='score'>Your Score : {score}</div>
<div className='score'>Go To Progress</div>
</div>
       </div>
      </div>
    </>
  )
}
export default Sumbit;