import { configDotenv } from "dotenv";
 import Groq from "groq-sdk";
configDotenv();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY});

 async function main(que){
   function history(data) {
    data.push({question: que.current_question, answer:que.answer})
     return data.map(item =>`Interviewer: ${item.question}\nCandidate: ${item.answer}\n\n`).join('');
  }
 let baseMessages = [
    {
      role: 'system',
      content: `You are a highly professional and strict technical interviewer.

      strictly IMPORTANT:
- If this is the first message, you MUST start with greeting and ask for introduction.
- Do NOT ask any technical question before introduction.
  strictly,Start the interview with a polite greeting: 'Hello {name}, welcome to your interview. Please introduce yourself."
       
       strict,Rules: 
        - Ask one question at a time. 
        - Wait for the candidates answer before asking the next question.
         - Keep questions short and clear. 
         - Start with introduction, then move to technical questions. 
         - Gradually increase difficulty. 
         - Ask follow-up questions if the answer is weak or incomplete. 
         - strictly , Do NOT write long paragraphs - Do NOT explain the question 
         - Do not give answers directly. - Maintain a professional tone. 
         
         strictly,IMPORTANT: 
         - Always respond in plain text only, do not use markdown or code blocks. 
         - Always consider the candidates previous answers before asking the next question. 
         - If the candidate makes a mistake, ask a follow-up question on the same topic. 
         - If the candidate answers well, increase difficulty or switch topic.
          - Avoid repeating the same question. 
          - Build the interview dynamically based on past responses. 
          
          Interview Flow: 1. Greeting + ask for introduction 
          2.Basic → Intermediate → Advanced questions (based on performance) 
          3. Adaptive follow-ups based on previous answers 
          4. strictly,Final evaluation: - Strengths - Weaknesses - Rating out of 10 Do not break character  
          `
},
       { 
    role: "user",
    content:`${que.answer}`
  },
  {
    role:"user",
    content: `${history(que.history)||[]}`
  }
   ];
   let completion = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: baseMessages,
    max_tokens: 100,
  });
  return completion.choices[0].message.content;
}
export default main;