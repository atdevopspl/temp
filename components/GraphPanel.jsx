import Topbar from "./Topbar"
import Sidebar from "./Sidebar"
import "../styles/global.css"

function Layout({children}){

  return(

    <div className="app-layout">

      <Topbar/>

      <Sidebar/>

      <div className="main-content">

        {children}

      </div>

    </div>

  )

}

export default Layout