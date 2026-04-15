import React from 'react'
 import { createBrowserRouter, RouterProvider } from "react-router-dom";
 import CodeEditor from './components/editor_file';
 import All_questions from './components/All_questions';
 import Ai_Interview from "./components/ai_interview";
 import Contest from "./components/contest"
 import  StarTest from './components/start_test';
import Login from './components/login';
import  Progress  from './components/progress';
import { ClerkProvider } from '@clerk/clerk-react';
import Side_Bar from './components/side_bar';
import Favroit  from './components/favroit';
 // import {clerkPubKey} from '@clerk/clerk-react'
 const App = () => {
  const router = createBrowserRouter([{path:'/editor',element:<><CodeEditor/></>},
    {path:'/',element:<><All_questions/></>},{path:'/interview',element:<><Ai_Interview/></>},
    {path:'/contest',element:<><Contest/></>},{path:'/start_test',element:<><StarTest/></>}
    ,{path:'/login_page',element:<Login/>},{path:"/your_progress",element:<><Progress/></>},
    {path:'/Favroit_quesions',element:<Favroit/>}

  ])
  return ( 
<ClerkProvider publishableKey={import.meta.env.VITE_clerkPubKey}>
      <RouterProvider router={router} />
    </ClerkProvider>  )}

export default App; 