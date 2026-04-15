import Editor from "@monaco-editor/react";
import { useState,useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from 'react-router-dom';

 function CodeEditor() {
    const router = useNavigate()
  const {user} = useUser()
  const [search] = useSearchParams();
  const id = search.get("problem_id");
    const [code, setCode] = useState("// write your code");
    const[output,set_output] = useState({})
    const[safe,safe_text] = useState([])
    const[err,set_err] = useState([])
    const[question,set_question] =useState({})
    const[language,set_language] = useState("cpp")

    const languages = {
  cpp: 54,
  java: 62,
  python: 71,
  javascript:63
};
const runCode = async(code)=>{
  let id  = languages[language]
     let res =await fetch("http://localhost:5000/get",{
    method:'POST',
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({code:code,id:id})
  })
  let data = await res.json();

  let resa= data.output.stdout ? safe_text(data.output.stdout.split("\n")):safe_text([]);
  let err= data.output.stderr?set_err(data.output.stderr.split("\n")):set_err([]);

  set_output(data.output);
}

 async function get() {
  let res = await fetch("http://localhost:5000/code",{
  method:"POST",
  headers:{"Content-Type":"application/json"},
  body:JSON.stringify({id:id})
})
let data = await res.json();
 let solution = data.data.solution?.split("\n")
 set_question(data.data)
 }
 useEffect(() => {
 if(!id){
  return;
 }
 get()
 }, [id])
 useEffect(() => {
  if(Object.keys(question).length>0){ 
   let lang = Object.keys(question?.code_snippets).filter((item)=>item===language);
setCode(question.code_snippets[lang])
}
 }, [language])
  const getColor = (difficulty) => {
  if (difficulty === "Easy") return "rgb(206, 234, 234)";
  if (difficulty === "Medium") return "rgb(121, 239, 190)";
  if (difficulty === "Hard") return "rgb(10, 194, 10)";
  return "";
};

function cleanText(text) {
  return question?.solution?.replace(/```.*?```/gs, "")        // code blocks remove
    .replace(/\!\[.*?\]\(.*?\)/g, "")  // images remove
    .replace(/\$\$.*?\$\$/g, "")       // latex remove
    .replace(/\*\*/g, "")              // bold remove
    .replace(/#+/g, "")                // headings remove
    .replace(/\*/g, "")                // bullets remove
    .replace(/\n+/g, "\n")             // clean lines
    .trim();
}

const submit = async()=>{
  try{
 let res = await fetch("http://localhost:5000/submit_question",{
  method:"POST",
  headers:{"Content-Type":"application/json"},
  body:JSON.stringify({que:question?.problem_id,title:question?.title,difficulty:question?.difficulty,user_id:user?.id,email:user?.primaryEmailAddress.emailAddress,name:user?.fullName})
})
alert("successfully submitted....")
  }catch(err){
    console.log(err.message)
  }
}
   return (<>  
  <div className="header"> 
    <div className="question_box">

<div className="selector">
      <select value={language} onChange={(e) => set_language(e.target.value)}>
          {
      Object.keys(languages).map((lang) => (
        <option key={lang} value={lang}>
          {lang}
        </option>
      ))}
       </select>

      
    </div>

      <div style={{background:getColor(question.difficulty),color:"black"} } className="difficulty123">
        {question?.difficulty}
      </div>
 <h2>Q {question?.title} ? </h2>
 <p>{question?.description}</p>
 <div>
  { Object.keys(question).length>0 && 
    question.examples.map((item,i)=>{
 return <>
<div className="super-child"> 
 <div>Example : {item?.example_num}</div>
 {question?.examples[i].example_text.split("\n").map((item2)=>{
        return <><div>{item2}</div></>
      })}
  {item.images && <img className="question_img" src={item?.images} alt="" />}
  </div>
 </>
     })
  }
  <div>
    <div>
      <h3>constraints</h3>
    </div>
    {
    question?.constraints?.length>0 && question.constraints.map((item)=>{
       return<>
        <div className="parents"> 
      <div className="constraints">{item}</div>
      </div>
      </>
    })
    }</div>
 </div>
   <div>
    <h3>Topics : </h3> 
  </div>
 <div className="topics123">
   
  {
    question?.topics?.length>0 && question.topics.map((item)=>{
       return<>
      <div className="item_topic">{item}</div>
      </>
    })
  }
 </div>
 <div>
  <div>
    <h3>Hints : </h3> 
  </div>
  {question?.hints?.length>0 ? question.hints.map((item,i)=>{
      return  <>
      <div className="hints">hint {i+1} : {item}</div>
      </>
    }) :<div className="hints">No Hint Available</div>}

     <div className="solution">
      {
      cleanText()?.split("\n").map((item)=>{
      return<>
      <div className="solution_div">{item}</div>
      </>
    })
     }
    </div>
    </div>
 </div>
   <div className="main">
   <div className="editor-container">

    <Editor  language={language} theme="vs-dark" value={code} onChange={(value) => setCode(value)} />
     </div>
 <div className="output"> 

  <div className="submit_box_code"> 
               {user &&<div style={{width:'50px'}} className="run" onClick={()=>runCode(code)}>Run</div>}
               {!user && <div onClick={()=>router("/login_page")} className='run'>SignIn to run</div>}
      <h2 style={{textAlign:'center',color:'white'}}>Your Output Is Here</h2>
                     {user && <div style={{background:'green'}} className="run" onClick={submit}>Submit</div>}
                      {!user && <div onClick={()=>router("/login_page")} className='run'>SignIn to Submit</div>}
 </div>
   {Object.keys(output).length !== 0 && <> 
     <div className="child"> 
     {err.length>0 && <>{
        err.map((item)=>{
          return<>
        <p style={{color:'#c23f3fa8',fontSize:'20px'}}>{item}</p>
          </>}) }
      </>}
     {safe.length>0 && <>{
        safe.map((item)=>{
          return<>
           <h2>{item}</h2>
          </>
        })
      }
      </>}
    <span className="accept"> {output.status.description}</span>  <span className="accept">Time : {output.time}</span>
    <p>Memory : {output.memory}</p>
    </div>
</>}
 </div> 
</div>
</div>
        </>)
} 

export default CodeEditor;
