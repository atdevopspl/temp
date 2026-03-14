import { useState,useEffect } from "react"
import Avatar from "@mui/material/Avatar"
import logo from "../assets/ATDevOps.png"

function Topbar(){

const [time,setTime]=useState("")
const [menuOpen,setMenuOpen]=useState(false)

useEffect(()=>{

const updateTime=()=>{

const now=new Date()

setTime(now.toLocaleTimeString())

}

updateTime()

const interval=setInterval(updateTime,1000)

return ()=>clearInterval(interval)

},[])

const user={
name:"Admin",
avatar:"https://i.pravatar.cc/40"
}

return(

<div className="topbar">

<div style={{display:"flex",alignItems:"center"}}>

<img src={logo} style={{height:36}}/>

</div>

<div style={{
position:"absolute",
left:"50%",
transform:"translateX(-50%)",
fontSize:22,
fontWeight:"bold",
color:"#a855f7"
}}>

ATVision

</div>

<div style={{display:"flex",alignItems:"center",gap:20}}>

<div>{time}</div>

<div
style={{display:"flex",alignItems:"center",gap:10,cursor:"pointer",position:"relative"}}
onClick={()=>setMenuOpen(!menuOpen)}
>

<Avatar src={user.avatar}/>

<span>{user.name}</span>

{menuOpen && (

<div style={{
position:"absolute",
top:50,
right:0,
background:"#181826",
border:"1px solid #2a2a3a",
borderRadius:6,
width:160
}}>

<div className="dropdown-item">Profile</div>
<div className="dropdown-item">Settings</div>
<div className="dropdown-item">Logout</div>

</div>

)}

</div>

</div>

</div>

)

}

export default Topbar