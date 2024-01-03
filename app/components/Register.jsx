"use client";
import React, { useEffect, useState } from "react";
import { app } from "../../firebaseConfig";
import { getAuth,GithubAuthProvider, GoogleAuthProvider,signInWithPopup,createUserWithEmailAndPassword } from "firebase/auth";
import  { useRouter } from "next/navigation";

function Register() {
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
    
    createUserWithEmailAndPassword(auth, email,password)
      .then((res) => {
        sessionStorage.setItem("Token",res.user.accessToken)
        console.log(res.user);
        router.push('/home')
        setEmail('')
        setPassword('')
      })
      .catch((err) => {
        alert(err.message);
        
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
  const signinClick = ()=>{
    router.push('/login')
  }

  return (
   
      <div className="flex flex-col items-center justify-center space-y-6 mt-10">
      <h1 className="text-2xl font-bold">Register</h1>
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
      <button className="hover:bg-slate-200 p-3 rounded-lg cursor-pointer w-full" onClick={handleClick}>Sign up</button>
      <button className="hover:bg-slate-200 p-3 rounded-lg cursor-pointer w-full" onClick={googleClick}>Sign up with Google</button>
      <button className="hover:bg-slate-200 p-3 rounded-lg cursor-pointer w-full" onClick={githubClick}>Sign up with Github</button>
      <button className="hover:bg-slate-200 p-3 rounded-lg cursor-pointer w-full" onClick={signinClick}>Sign in</button>

     
    </div>
   
  );
}

export default Register;
