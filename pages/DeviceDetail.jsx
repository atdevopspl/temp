import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function DeviceDetail() {
  const { id } = useParams();
  const location = useLocation();

  const device = location.state?.device || {
    id,
    name: `Device-${id}`,
    ip: `127.0.0.1`,
    status: "UP",
    type: "ICMP",
    location: "Local Machine"
  };

  const [pingData, setPingData] = useState([]);
  const [cpuData, setCpuData] = useState([]);
  const [memData, setMemData] = useState([]);
  const [netData, setNetData] = useState([]);
  const [timeLabels, setTimeLabels] = useState([]);
  const intervalRef = useRef();

  useEffect(() => {
    intervalRef.current = setInterval(async () => {
      const timestamp = new Date().toLocaleTimeString();
      setTimeLabels(prev => [...prev.slice(-19), timestamp]);

      try {
        // Ping for all types
        if (["ICMP", "SNMP", "Firewall"].includes(device.type)) {
          const pingRes = await fetch("http://localhost:5000/ping");
          const pingJson = await pingRes.json();
          setPingData(prev => [...prev.slice(-19), pingJson.time]);
        }

        // CPU / Memory for SNMP & Firewall
        if (["SNMP", "Firewall"].includes(device.type)) {
          const cpuRes = await fetch("http://localhost:5000/cpu");
          const cpuJson = await cpuRes.json();
          setCpuData(prev => [...prev.slice(-19), cpuJson.usage]);

          const memRes = await fetch("http://localhost:5000/memory");
          const memJson = await memRes.json();
          setMemData(prev => [...prev.slice(-19), memJson.usedPercent]);
        }

        // Network Traffic for SNMP & Firewall
        if (["SNMP", "Firewall"].includes(device.type)) {
          const netRes = await fetch("http://localhost:5000/network");
          const netJson = await netRes.json();
          setNetData(prev => [...prev.slice(-19), netJson.traffic]);
        }

      } catch (err) {
        console.error(err);
      }
    }, 3000);

    return () => clearInterval(intervalRef.current);
  }, [device.type]);

  const makeChart = (data, label, color) => ({
    labels: timeLabels,
    datasets: [
      {
        label,
        data,
        borderColor: color,
        backgroundColor: `${color}33`,
        tension: 0.3,
        fill: true,
        pointRadius: 2
      }
    ]
  });

  return (
    <div style={{ padding: "20px", color: "#fff", background: "#121024", minHeight: "100vh" }}>
      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>{device.name} Details</h2>

      {/* Device Info */}
      <div style={{
        display: "flex",
        justifyContent: "space-around",
        gap: "20px",
        marginBottom: "40px",
        flexWrap: "wrap"
      }}>
        <InfoBox label="IP Address" value={device.ip} />
        <InfoBox label="Status" value={device.status} />
        <InfoBox label="Type" value={device.type} />
        <InfoBox label="Location" value={device.location} />
      </div>

      {/* Panels */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
        gap: "20px"
      }}>
        {/* Ping panel */}
        {["ICMP", "SNMP", "Firewall"].includes(device.type) && (
          <Panel title="Ping Response Time">
            <Line data={makeChart(pingData, "Ping (ms)", "#b57aff")} options={chartOptions} />
          </Panel>
        )}

        {/* CPU / Memory / Network for SNMP & Firewall */}
        {["SNMP", "Firewall"].includes(device.type) && (
          <>
            <Panel title="CPU Usage (%)">
              <Line data={makeChart(cpuData, "CPU %", "#ff6b6b")} options={chartOptions} />
            </Panel>

            <Panel title="Memory Usage (%)">
              <Line data={makeChart(memData, "Memory %", "#4cd137")} options={chartOptions} />
            </Panel>

            <Panel title="Network Traffic (MB/s)">
              <Line data={makeChart(netData, "Traffic", "#1e90ff")} options={chartOptions} />
            </Panel>
          </>
        )}

        {/* Alerts panel */}
        <Panel title="Recent Alerts">
          <div style={{ color: "#ccc", textAlign: "center", padding: "20px" }}>
            No recent alerts
          </div>
        </Panel>
      </div>
    </div>
  );
}

// Info Box Component
function InfoBox({ label, value }) {
  return (
    <div style={{
      background: "#1b1b35",
      padding: "15px 25px",
      borderRadius: "8px",
      minWidth: "150px",
      textAlign: "center"
    }}>
      <div style={{ fontSize: "12px", color: "#bbb" }}>{label}</div>
      <div style={{ fontSize: "18px", fontWeight: "bold", marginTop: "5px" }}>{value}</div>
    </div>
  );
}

// Panel Component
function Panel({ title, children }) {
  return (
    <div style={{
      background: "#1a1a2b",
      padding: "15px",
      borderRadius: "8px",
      color: "#fff",
      minHeight: "200px"
    }}>
      <h3 style={{ marginBottom: "10px", borderBottom: "1px solid #3a3a5a", paddingBottom: "5px" }}>{title}</h3>
      {children}
    </div>
  );
}

// Chart options
const chartOptions = {
  responsive: true,
  plugins: {
    legend: { labels: { color: "#fff" } },
    title: { display: false }
  },
  scales: {
    x: { ticks: { color: "#fff" }, grid: { color: "#2a2a50" } },
    y: { ticks: { color: "#fff" }, grid: { color: "#2a2a50" } }
  }
};

export default DeviceDetail;