import { Routes, Route } from "react-router-dom"
import Sidebar from "./components/Sidebar"
import Topbar from "./components/Topbar"
import Dashboards from "./pages/Dashboards"
import Devices from "./pages/Devices"
import DeviceGroups from "./pages/DeviceGroups"
import AddDevice from "./pages/AddDevice"
import DeviceDetail from "./pages/DeviceDetail"
import Alerts from "./pages/Alerts"
import Maintenance from "./pages/Maintenance"
import Settings from "./pages/Settings"
import './styles/global.css';

function App() {
  return (
    <div className="app-container" style={{ display: "flex", height: "100vh", background: "#0f0f1f", color: "#fff" }}>
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="main-content" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        
        {/* Topbar */}
        <Topbar />

        {/* Pages */}
        <div className="page-content" style={{ padding: "20px", overflowY: "auto", flex: 1 }}>
          <Routes>
            <Route path="/" element={<Dashboards />} />
            <Route path="/dashboards" element={<Dashboards />} />

            {/* Devices submenu */}
            <Route path="/devices/all" element={<Devices />} />
            <Route path="/devices/groups" element={<DeviceGroups />} />
            <Route path="/devices/add" element={<AddDevice />} />

            {/* Device detail page */}
            <Route path="/devices/:id" element={<DeviceDetail />} />

            <Route path="/alerts" element={<Alerts />} />
            <Route path="/maintenance" element={<Maintenance />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>

      </div>
    </div>
  )
}

export default App