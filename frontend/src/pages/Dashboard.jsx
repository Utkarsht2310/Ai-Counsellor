import { useState, useEffect } from "react";
import { getDashboardData } from "../api/modules";
import "../styles/dashboard.css";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getDashboardData();
        setData(result);
      } catch (error) {
        console.error("Failed to load dashboard data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!data || data.error) return <div>Please complete onboarding first.</div>;

  const { profile, strength, stage, tasks } = data;

  const stages = [
    "Building Profile",
    "Discovering Universities",
    "Finalizing Universities",
    "Preparing Applications",
  ];

  // Map backend stage index (1-based or 0-based?) 
  // Backend returned 1 for "Building Profile". Array is 0-indexed.
  // So currentStage index should be stage - 1.
  const currentStageIndex = stage - 1;

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>

      {/* ===== Profile Summary ===== */}
      <section className="card">
        <h3>Profile Summary</h3>
        <div className="summary-grid">
          <div><span>Education</span>{profile.education}</div>
          <div><span>Target Intake</span>{profile.intake}</div>
          <div><span>Countries</span>{profile.countries}</div>
          <div><span>Budget</span>{profile.budget}</div>
        </div>
      </section>

      {/* ===== Profile Strength ===== */}
      <section className="card">
        <h3>Profile Strength</h3>
        <div className="strength-grid">
          <div className={`strength ${strength.academics.toLowerCase()}`}>
            Academics: {strength.academics}
          </div>
          <div className="strength in-progress">
            Exams: {strength.exams}
          </div>
          <div className="strength draft">
            SOP: {strength.sop}
          </div>
        </div>
      </section>

      {/* ===== Stage Indicator ===== */}
      <section className="card">
        <h3>Current Stage</h3>
        <div className="stage-indicator">
          {stages.map((s, index) => (
            <div
              key={index}
              className={`stage ${index === currentStageIndex ? "active" : ""
                }`}
            >
              Stage {index + 1}
              <span>{s}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ===== AI To-Do List ===== */}
      <section className="card">
        <h3>AI To-Do List</h3>
        <ul className="todo-list">
          {tasks.map((task) => (
            <li
              key={task.id}
              className={task.done ? "done" : ""}
            >
              {task.text}
            </li>
          ))}
          {tasks.length === 0 && <li>No active tasks. AI will generate tasks as you progress.</li>}
        </ul>
        <p className="todo-hint">
          Tasks update automatically as your profile improves.
        </p>
      </section>
    </div>
  );
};

export default Dashboard;
