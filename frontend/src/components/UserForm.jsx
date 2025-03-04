import React from 'react'
import { useSelector } from 'react-redux'

const UserForm = () => {
  const data=useSelector((store)=>store?.genders)
  return (
    <div>
      {data&&data?.map((d)=><h1>{d}</h1>)}
    </div>
  )
}

export default UserForm;