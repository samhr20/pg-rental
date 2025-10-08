import React, { useState } from 'react'
import useNewAdmin from '../context/AddNewAdminContext'

const Logout = () => {
  const { allAdminDetails } = useNewAdmin()
  const [currentPage, setCurrentPage] = useState(2)
  const [postPerPage, setPostPerPage] = useState(2)

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage ;
  const data = allAdminDetails.slice(firstPostIndex , lastPostIndex)

  return (
    <>
     {data.map((index)=>(
      <h1>{index.fullName}</h1>
     ))}
    </>
  )
}

export default Logout