<div align="center">

# 🏎️ Formula 1 Racing Intelligence Dashboard & Reports (2010–2026)

  <p align="center">
    <strong>An End-to-End Data Analytics & Interactive Intelligence Platform for Modern F1 Performance Insights</strong>
  </p>

  <p align="center">
    <a href="https://formula-1-racing-intelligence-dashboard.onrender.com/">
      <img src="https://img.shields.io/badge/Live%20Demo-Render-brightgreen?style=for-the-badge&logo=render" alt="Live Demo" />
    </a>
    <img src="https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react" alt="React" />
    <img src="https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Tailwind--CSS-3.0-38bdf8?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Tableau-Analytics-E97627?style=for-the-badge&logo=tableau" alt="Tableau" />
  </p>

</div>

---

## 📌 Executive Summary

The **Formula 1 Racing Intelligence Dashboard & Reports** is a high-performance analytics platform designed to aggregate, analyze, and visualize Formula 1 racing performance data spanning from 2010 through 2026. 

By integrating modern web engineering with advanced Business Intelligence (BI) dashboards, this application delivers real-time and historical insights on driver standings, constructor championships, pit-stop strategies, lap-time evolutions, and circuit telemetry.

* **🌐 Live Deployment:** [https://formula-1-racing-intelligence-dashboard.onrender.com/](https://formula-1-racing-intelligence-dashboard.onrender.com/)
* **📊 Visual BI Story:** [Tableau Public F1 Performance Story](https://public.tableau.com/views/Formula1PerformanceAnalytics2010-2024/Formula1PerformanceAnalytics2010-2024)

---

## ✨ Key Capabilities & Functional Modules

| Module | Features & Analytical Value |
| :--- | :--- |
| **🏎️ Driver Telemetry & Performance** | Tracks driver points progression, win-rate ratios, podium finishes, and head-to-head teammate comparisons across multiple seasons. |
| **🏆 Constructor Championship Insights** | Evaluates team dynamics, engineering consistency, seasonal development trends, and championship points trajectories. |
| **🏁 Circuit Breakdown & Metrics** | Interactive geographical mapping of international circuits with track telemetry, sector speeds, and historical race outcomes. |
| **⏱️ Strategy & Pit-Stop Analytics** | Visualizes tyre degradation curves, pit-stop duration distributions, and safety car impact reports. |
| **📊 Embedded Tableau Dashboards** | Deep-dive, multi-filter interactive dashboards integrated directly into the web interface for exploratory data analysis. |

---

## 🛠️ System Architecture & Technology Stack

### Core Frontend & UI Framework
* **Framework:** React 18 with TypeScript
* **Styling & Components:** Tailwind CSS, Lucide Icons
* **Build Engine:** Vite

### Business Intelligence & Analytics
* **Data Visualization:** Tableau Public / Tableau Desktop
* **Dataset Scope:** Formula 1 Historical Datasets (2010–2026)

### Infrastructure & Pipeline
* **Hosting Platform:** Render (Static Site Architecture)
* **Version Control:** Git & GitHub Deployment Pipeline

---

## 📁 Repository Structure

```text
Formula-1-Racing-Intelligence-Dashboard-Analysis-Reports-2010-2026-/
├── public/                 # Static assets, icons, and public media files
├── src/
│   ├── components/         # Modular UI elements (Navigation, Cards, Dashboard embeds)
│   ├── pages/              # Primary views (Overview, Circuits, Insights, Skills)
│   ├── data/               # Structured F1 telemetry datasets & static mock configs
│   ├── App.tsx             # Main React Router & Layout Controller
│   └── main.tsx            # Application entry point
├── dist/                   # Production build distribution directory
├── package.json            # Project dependencies and script runner settings
├── tsconfig.json           # TypeScript configuration
└── README.md               # Repository documentation
