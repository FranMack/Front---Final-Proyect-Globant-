import React from "react";
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

const Message=()=>{
    return(

        <div style={{height:"100vh",width:"100vw",display:"flex",alignItems:"center", justifyContent:"center"}}>

            

            <div style={{height:"78%",width:"35%",display:"flex",alignItems:"center", justifyContent:"center",flexDirection:"column",backgroundColor:"#f1f3f4",border:"solid 0,0,10px #cac4c4",padding:"2%" }}>
            <h2>REPORT DETAIL</h2>
            <h3>USER: Frankie</h3>
            <img src="https://img.freepik.com/vector-premium/reparacion-laptop_37787-1276.jpg?w=2000" alt="foto"style={{height:"35%"}}/>
            <h3 style={{marginBottom:"0",textDecoration:"underline"}}>INFO</h3>
            <ul style={{ listStyle:"none",fontSize:"1.1rem"}}>
            <li style={{marginBottom:"2%"}}><span style={{fontWeight:"bolder"}}> DATE:</span> 12/02/23</li>
            <li style={{marginBottom:"2%"}}><span style={{fontWeight:"bolder"}}> STATUS:</span> Inactive</li>
            <li style={{marginBottom:"2%"}}><span style={{fontWeight:"bolder"}}> DEVICE:</span> Laptop</li>
            <li style={{marginBottom:"2%"}}><span style={{fontWeight:"bolder"}}> DESCRIPTION:</span> Broken screem</li>
            <li style={{marginBottom:"2%"}}><span style={{fontWeight:"bolder"}}> LOCATION:</span> Rosario</li>
            <li style={{marginBottom:"2%"}}><span style={{fontWeight:"bolder"}}> FLOOR:</span> 4</li>
            <li style={{marginBottom:"2%"}}><span style={{fontWeight:"bolder"}}> BOX:</span> 3</li>  
            
        </ul>
            </div>

     
        
        
    
            
        </div>
    )
}

export default Message;