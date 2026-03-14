import { useEffect, useState, useRef } from "react";

function Alerts() {
  // Device list (for demo, same as Devices.jsx)
  const devices = [
    { id: 1, name: "Localhost", ip: "127.0.0.1", type: "ICMP" },
    { id: 2, name: "Router01", ip: "192.168.1.1", type: "SNMP" },
    { id: 3, name: "Switch01", ip: "192.168.1.2", type: "SNMP" },
    { id: 4, name: "Firewall01", ip: "192.168.1.3", type: "Firewall" },
    { id: 5, name: "Server01", ip: "192.168.1.4", type: "SNMP" }
  ];

  const [alerts, setAlerts] = useState([]);
  const intervalRef = useRef();

  useEffect(() => {
    intervalRef.current = setInterval(async () => {
      const newAlerts = [];

      for (const device of devices) {
        try {
          // Ping check for all devices
          const pingRes = await fetch("http://localhost:5000/ping");
          const pingJson = await pingRes.json();

          if (pingJson.time === null || pingJson.time > 3000) {
            newAlerts.push({
              device: device.name,
              type: device.type,
              issue: "Ping Timeout",
              timestamp: new Date().toLocaleTimeString()
            });
          }

          // CPU/Memory check for SNMP & Firewall
          if (["SNMP", "Firewall"].includes(device.type)) {
            const cpuRes = await fetch("http://localhost:5000/cpu");
            const cpuJson = await cpuRes.json();
            if (cpuJson.usage > 80) {
              newAlerts.push({
                device: device.name,
                type: device.type,
                issue: `High CPU: ${cpuJson.usage}%`,
                timestamp: new Date().toLocaleTimeString()
              });
            }

            const memRes = await fetch("http://localhost:5000/memory");
            const memJson = await memRes.json();
            if (memJson.usedPercent > 80) {
              newAlerts.push({
                device: device.name,
                type: device.type,
                issue: `High Memory: ${memJson.usedPercent}%`,
                timestamp: new Date().toLocaleTimeString()
              });
            }
          }

        } catch (err) {
          console.error(err);
        }
      }

      setAlerts(newAlerts);
    }, 3000);

    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div style={{ padding: "20px", color: "#fff", background: "#121024", minHeight: "100vh" }}>
      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>Alerts Dashboard</h2>

      {alerts.length === 0 ? (
        <div style={{ textAlign: "center", color: "#bbb", padding: "20px" }}>
          No alerts
        </div>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #3a3a5a" }}>
              <th style={thStyle}>Device</th>
              <th style={thStyle}>Type</th>
              <th style={thStyle}>Issue</th>
              <th style={thStyle}>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {alerts.map((alert, idx) => (
              <tr key={idx} style={{ borderBottom: "1px solid #2a2a50" }}>
                <td style={tdStyle}>{alert.device}</td>
                <td style={tdStyle}>{alert.type}</td>
                <td style={tdStyle}>{alert.issue}</td>
                <td style={tdStyle}>{alert.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

// Table styles
const thStyle = { textAlign: "left", padding: "10px", color: "#fff" };
const tdStyle = { padding: "10px", color: "#fff" };

export default Alerts;