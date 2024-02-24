import React, { useState } from 'react'
import client from "../../api/client";

const ClassCode = () => {
    

    
    const handleAddClassCode = async () =>{
        if(
          window.confirm(" Are you sure you want to add a Class Code?")
        ){
          await client.post(`api/Classcodes/`);
          console.log("Class code added successfully.");
          fetchData();
        } 
      }
 
return (
    <div>
      
    </div>
  )
}

export default ClassCode
