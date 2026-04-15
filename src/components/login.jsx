import React from 'react'
import { SignIn } from '@clerk/clerk-react'
const Login = () => {
  return (
    <div className='login'>
        <SignIn afterSignInUrl="/" />
        </div>
  )
}
export default Login;
