import { useState } from "react";
import { saveProfile } from "../api/profileApi";
import { useNavigate } from "react-router-dom";
import "../styles/onboarding.css";


const Onboarding = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    education_level: "",
    major: "",
    graduation_year: "",
    gpa: "",
    intended_degree: "",
    field_of_study: "",
    intake_year: "",
    countries: "",
    budget: "",
    funding: "",
    ielts: "",
    gre: "",
    sop: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await saveProfile(form);
    navigate("/dashboard");
  };

  return (
    <div className="onboarding-container">
      <h2>Tell us about yourself</h2>

      <form onSubmit={handleSubmit}>
        {/* Academic Background */}
        <h4>Academic Background</h4>
        <input placeholder="Current Education Level"
          onChange={(e) => setForm({ ...form, education_level: e.target.value })} required />
        <input placeholder="Degree / Major"
          onChange={(e) => setForm({ ...form, major: e.target.value })} required />
        <input placeholder="Graduation Year"
          onChange={(e) => setForm({ ...form, graduation_year: e.target.value })} />
        <input placeholder="GPA / Percentage (optional)"
          onChange={(e) => setForm({ ...form, gpa: e.target.value })} />

        {/* Study Goal */}
        <h4>Study Goal</h4>
        <input placeholder="Intended Degree"
          onChange={(e) => setForm({ ...form, intended_degree: e.target.value })} required />
        <input placeholder="Field of Study"
          onChange={(e) => setForm({ ...form, field_of_study: e.target.value })} required />
        <input placeholder="Target Intake Year"
          onChange={(e) => setForm({ ...form, intake_year: e.target.value })} />
        <input placeholder="Preferred Countries (comma separated)"
          onChange={(e) => setForm({ ...form, countries: e.target.value })} />

        {/* Budget */}
        <h4>Budget</h4>
        <input placeholder="Budget per year"
          onChange={(e) => setForm({ ...form, budget: e.target.value })} required />
        <select onChange={(e) => setForm({ ...form, funding: e.target.value })} required>
          <option value="">Funding Plan</option>
          <option>Self-funded</option>
          <option>Scholarship-dependent</option>
          <option>Loan-dependent</option>
        </select>

        {/* Exams */}
        <h4>Exams & Readiness</h4>
        <select onChange={(e) => setForm({ ...form, ielts: e.target.value })}>
          <option value="">IELTS / TOEFL</option>
          <option>Not started</option>
          <option>Planned</option>
          <option>Completed</option>
        </select>

        <select onChange={(e) => setForm({ ...form, gre: e.target.value })}>
          <option value="">GRE / GMAT</option>
          <option>Not started</option>
          <option>Planned</option>
          <option>Completed</option>
        </select>

        <select onChange={(e) => setForm({ ...form, sop: e.target.value })}>
          <option value="">SOP Status</option>
          <option>Not started</option>
          <option>Draft</option>
          <option>Ready</option>
        </select>

        <button className="btn-primary" type="submit">
          Complete Onboarding
        </button>
      </form>
    </div>
  );
};

export default Onboarding;
