"use client"

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {app,database} from '../../firebaseConfig'
import {collection,addDoc,getDocs,doc,updateDoc,deleteDoc} from 'firebase/firestore'
import { data } from 'autoprefixer'


const page = () => {

 const [name,setName] = useState('')
 const [age,setAge] = useState(null)
 const [Id,setId] = useState(null)
 const [fireData,setFireData] = useState([])
 const [isUpdate,setIsUpdate] = useState(false)


  const databaseRef = collection(database,'CRUD-Datas')
  const router = useRouter()

  useEffect(()=>{
    let token = sessionStorage.getItem('Token')
    if(token){
      getData()
    }
    if(!token){
      router.push('/')
    }
  },[])

const addData = ()=>{
  addDoc(databaseRef,{
    name:name,
    age:Number(age)
  }).then(()=>{
    alert('Data sent')
    getData()
    setName('')
    setAge(null)
  })
}

const getData = async()=>{
  await getDocs(databaseRef).then((res)=>{
    setFireData(res.docs.map(data=>{
      return {...data.data(), id:data.id}
    }));
  }).catch((err)=>{
    console.error(err)
  })
}

const updateData = (id,name,age)=>{
   setAge(age)
   setName(name)
   setId(id)
   setIsUpdate(true)
}

const updateFields = ()=>{
  let fieldTOEdit = doc(database,'CRUD-Datas',Id)
  updateDoc(fieldTOEdit,{
    name:name,
    age:age
  }).then(()=>{
    alert('Data updated')
    getData()
    setName("")
    setAge(null)
    setIsUpdate(false)
  })
  .catch((err)=>{
    console.log(err);
  })
}


const deleteData = (id)=>{
  let fieldTOEdit = doc(database,'CRUD-Datas',id)
  deleteDoc(fieldTOEdit).then(()=>{
    alert('Data Deleted')
   getData()
  })
  .catch((err)=>{
    console.log(err);
    alert('can not delete this file')
  })
}

const logout = ()=>{
  sessionStorage.removeItem('Token')
  router.push('/')
}

  return (
    <div className='h-screen flex  space-x-6 justify-center items-center'>

      <div>
        <button className='p-5 text-white bg-black hover:bg-green-400 rounded-md' onClick={logout}>Log Out</button>
      </div>
        <div className='w-[400px] h-[600px] flex flex-col justify-center space-y-4 bg-slate-500'>
        <h1 className='font-bold text-center text-2xl mb-4'>Next CRUD Authentication</h1>
         <input className='h-10 rounded-md pl-2 space-y-4 w-[80%] mx-auto' type='text' placeholder='Enter Name' value={name} onChange={e=>setName(e.target.value)}/>
         <input className='h-10 rounded-md pl-2 space-y-4 w-[80%] mx-auto' type='text' placeholder='Enter Age' value={age} onChange={e=>setAge(e.target.value)}/>
         {isUpdate?
         (
          <button className='w-[80%] rounded-md text-center hover:bg-purple-300 h-10 mx-auto' onClick={updateFields}>Update</button>
         ):
         (
          <button className='w-[80%] rounded-md text-center hover:bg-purple-300 h-10 mx-auto' onClick={addData}>Add</button>
         )}
        
        </div>
          
          {fireData.map((data)=>{
            return(<div className='flex flex-wrap justify-between space-x-5 items-center mb-4 mt-5'>

                      <div>
                         <div className='flex flex-col space-x-4'>

                         <div>
                         <h1>Name:{data.name}</h1>
                         <p>Age:{data.age}</p>
                         </div>

                         <button  onClick={()=>updateData(data.id,data.name,data.age)} className=' mb-7 mt-6 p-5 cursor-pointer bg-gray-300 hover:bg-purple-400 rounded-lg'>update</button>
                         <button  onClick={()=>deleteData(data.id)} className=' space-y-7 p-5 cursor-pointer bg-gray-300 hover:bg-red-400 rounded-lg'>Delete</button>
                       </div>
                      </div>
              
              
            </div>)
          })}
    </div>
  )
}

export default page
