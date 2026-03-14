import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

function Devices() {
  const navigate = useNavigate();
  const location = useLocation();

  // Full device list
  const devices = [
    { id: 1, name: "Localhost", ip: "127.0.0.1", status: "UP", type: "ICMP" },
    { id: 2, name: "Router01", ip: "192.168.1.1", status: "UP", type: "SNMP" },
    { id: 3, name: "Switch01", ip: "192.168.1.2", status: "DOWN", type: "SNMP" },
    { id: 4, name: "Firewall01", ip: "192.168.1.3", status: "UP", type: "Firewall" },
    { id: 5, name: "Server01", ip: "192.168.1.4", status: "UP", type: "SNMP" }
  ];

  // Filter devices by type
  const icmpDevices = devices.filter((d) => d.type === "ICMP");
  const snmpDevices = devices.filter((d) => d.type === "SNMP");
  const firewallDevices = devices.filter((d) => d.type === "Firewall");

  // Tabs state
  const [activeTab, setActiveTab] = useState("all");

  const renderTable = (list) => (
    <table className="device-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>IP Address</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {list.map((device) => (
          <tr
            key={device.id}
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/devices/${device.id}`, { state: { device } })}
          >
            <td>{device.name}</td>
            <td>{device.ip}</td>
            <td>{device.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2>Devices</h2>

      {/* Filter Tabs */}
      <div style={{ marginBottom: "20px", display: "flex", gap: "20px" }}>
        <button style={tabStyle(activeTab === "all")} onClick={() => setActiveTab("all")}>
          All Devices
        </button>
        <button style={tabStyle(activeTab === "icmp")} onClick={() => setActiveTab("icmp")}>
          ICMP Devices
        </button>
        <button style={tabStyle(activeTab === "snmp")} onClick={() => setActiveTab("snmp")}>
          SNMP Devices
        </button>
        <button style={tabStyle(activeTab === "firewall")} onClick={() => setActiveTab("firewall")}>
          Firewalls
        </button>
      </div>

      {/* Render table based on active tab */}
      {activeTab === "all" && renderTable(devices)}
      {activeTab === "icmp" && renderTable(icmpDevices)}
      {activeTab === "snmp" && renderTable(snmpDevices)}
      {activeTab === "firewall" && renderTable(firewallDevices)}
    </div>
  );
}

// Tab styling helper
const tabStyle = (active) => ({
  padding: "10px 20px",
  background: active ? "#3a0ca3" : "#1b1b35",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer"
});

export default Devices;