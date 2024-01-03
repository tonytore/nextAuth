"use client";

import React, { useEffect, useState } from "react";
import { app } from "../../firebaseConfig";
import { getAuth,GithubAuthProvider, GoogleAuthProvider,signInWithPopup,signInWithEmailAndPassword } from "firebase/auth";
import  { useRouter } from "next/navigation";

function Login() {
  const auth = getAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter()

    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();


    useEffect(()=>{
      let token = sessionStorage.getItem('Token')
      if(token){
        router.push('/home')
      }
    },[])

  const handleClick = () => {
    
    signInWithEmailAndPassword(auth, email,password)
      .then((res) => {
        sessionStorage.setItem("Token",res.user.accessToken)
        console.log(res.user);
        router.push('/home')
        setEmail('')
        setPassword('')
      })
      .catch((err) => {
        alert('Email does not exist');
        
      });
     
  }
  const googleClick = ()=>{
    signInWithPopup(auth,googleProvider)
    .then((res)=>{
      console.log(res.user);
      sessionStorage.setItem("Token",res.user.accessToken)
      router.push('/home')
    })
  }

  const githubClick = ()=>{
    signInWithPopup(auth,githubProvider)
    .then((res)=>{
      console.log(res.user);
      sessionStorage.setItem("Token",res.user.accessToken)
      router.push('/home')
    })
  }

  return (
   
      <div className="flex flex-col  items-center justify-center space-y-6 mt-10">
      <h1 className="text-2xl font-bold">Login</h1>
      <input
        className="h-10 pl-2 rounded-lg"
        type="email"
        value={email}
        name="email"
        placeholder="enter email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="h-10 pl-2 rounded-lg"
        type="password"
        value={password}
        name="password"
        placeholder="enter password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="hover:bg-slate-200 p-3 rounded-lg cursor-pointer w-[14%]" onClick={handleClick}>Sign in</button>
      <button className="hover:bg-slate-200 p-3 rounded-lg cursor-pointer w-[14%]" onClick={googleClick}>Sign up with Google</button>
      <button className="hover:bg-slate-200 p-3 rounded-lg cursor-pointer w-[14%]" onClick={githubClick}>Sign up with Github</button>

     
    </div>
   
  );
}

export default Login;
