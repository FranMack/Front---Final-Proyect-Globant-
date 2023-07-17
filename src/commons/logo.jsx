import React from "react";
import logo2 from"../assets/logo2.png"



function Logo(){
    return(
        <img src={logo2} alt="logo"  style={{height:"100%",width:"100%", objectFit:"contain"}}/>
    )
}

export default Logo;