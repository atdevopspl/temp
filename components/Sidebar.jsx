import { useState } from "react"
import { Link } from "react-router-dom"

import DashboardIcon from "@mui/icons-material/Dashboard"
import DeviceHubIcon from "@mui/icons-material/DeviceHub";
import WarningIcon from "@mui/icons-material/Warning"
import BuildIcon from "@mui/icons-material/Build"
import SettingsIcon from "@mui/icons-material/Settings"

function Sidebar() {
  const [devicesOpen, setDevicesOpen] = useState(false)

  return (
    <div className="sidebar">

      {/* Dashboards */}
      <Link to="/dashboards">
        <NavItem icon={<DashboardIcon />} label="Dashboards" />
      </Link>

      {/* Devices main tab */}
      <div onClick={() => setDevicesOpen(!devicesOpen)}>
        <NavItem icon={<RouterIcon />} label="Devices" />
      </div>

      {/* Devices submenu */}
      {devicesOpen && (
        <div className="submenu">
          <Link to="/devices/all">
            <SubItem label="All Devices" />
          </Link>
          <Link to="/devices/groups">
            <SubItem label="Device Groups" />
          </Link>
          <Link to="/devices/add">
            <SubItem label="Add Device" />
          </Link>
        </div>
      )}

      {/* Alerts */}
      <Link to="/alerts">
        <NavItem icon={<WarningIcon />} label="Alerts" />
      </Link>

      {/* Maintenance Mode */}
      <Link to="/maintenance">
        <NavItem icon={<BuildIcon />} label="Maintenance Mode" />
      </Link>

      {/* Global Settings */}
      <Link to="/settings">
        <NavItem icon={<SettingsIcon />} label="Global Settings" />
      </Link>

    </div>
  )
}

// NavItem for main sidebar items
function NavItem({ icon, label }) {
  return (
    <div className="nav-item">
      {icon}
      <span>{label}</span>
    </div>
  )
}

// SubItem for submenu items
function SubItem({ label }) {
  return (
    <div className="sub-item">
      {label}
    </div>
  )
}

export default Sidebar