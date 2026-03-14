// server/index.js
import express from "express";
import ping from "ping";
import os from "os";
import cors from "cors";

const app = express();
app.use(cors());

const host = "192.168.1.5"; // your PC IP

app.get("/ping", async (req, res) => {
  try {
    const result = await ping.promise.probe(host);
    res.json({ alive: result.alive, time: result.time });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/cpu", (req, res) => {
  const cpus = os.cpus();
  const idle = cpus.reduce((acc, cpu) => acc + cpu.times.idle, 0);
  const total = cpus.reduce(
    (acc, cpu) => acc + Object.values(cpu.times).reduce((a, b) => a + b, 0),
    0
  );
  const usage = 100 - Math.floor((idle / total) * 100);
  res.json({ usage });
});

app.get("/memory", (req, res) => {
  const total = os.totalmem();
  const free = os.freemem();
  const usedPercent = Math.floor(((total - free) / total) * 100);
  res.json({ usedPercent });
});

app.get("/network", (req, res) => {
  res.json({ traffic: Math.floor(Math.random() * 100) + 50 });
});

app.listen(5000, () => console.log("ATVision metrics server running on http://localhost:5000"));