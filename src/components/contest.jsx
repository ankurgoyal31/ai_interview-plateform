import React, { use } from 'react'
import { useEffect } from 'react'
import "../designing/contest.css"
import questions_mcq from "../questions_mcq.json"
console.log(questions_mcq)
import Side_bar from "./side_bar"
import { useNavigate} from 'react-router-dom'
import { Link } from 'react-router-dom'
const box_list = [{language:"JavaScript",image:"https://assets.leetcode.com/study_plan_v2/30-days-of-javascript/cover"},{language:"Java",image:"src/sound/java.png"},{language:"Python",image:"https://s3.dualstack.us-east-2.amazonaws.com/pythondotorg-assets/media/community/logos/python-logo-only.png"},{language:"Web Development",image:"src/sound/web_development.png"},{language:"Data Analyst",image:"src/sound/analyst1.png"},{language:"React",image:"src/sound/react.png"},{language:"Power BI",image:"src/sound/power_bi.png"},{language:"Database",image:"src/sound/database.png"}]
 const contest = () => {
  const navigate = useNavigate()
  async function get_data(){
     let data = questions_mcq.filter((item) =>item.category==="powerbi").slice(0, 24);
     console.log(data)
  }
   useEffect(() => {
get_data()
   }, 
   [])  
  return (
    <>
       <div className='main_container'>
           <Side_bar />
         <div className='box243'>
           <div className='content1234'>
            <img className='contest_img' src="https://leetcode.com/_next/static/images/title-logo-f4088b89ef5ebc026333f2b9066d00eb.png" alt="" />
            <h3>Test Challenge</h3>
            <p>turn practice into progress</p>
           </div>
           <div className='test_box'>
             <div className='All_test'>
              {
                box_list.map((item)=>{
                  return  <>
                   <div className='item_box'>
                      <div><img className='languages' src={item.image} alt={item.language} /><div>Time : 10:00 min </div></div>
                   <div>
                    <div> 
                    {item.language}
                    </div>
                     <div>here is mcq questions
                   <Link style={{textDecoration:'none',color:'white'}} to={`/start_test?item=${encodeURI(item.language)}`}><div className='start_test'>Start</div></Link> 
                     </div>
                     </div>
                   </div>
                    </>
                })
              }
             </div>
           </div>
        </div>
        <div>
        </div>
       </div>
    </>
  )
}

export default contest
