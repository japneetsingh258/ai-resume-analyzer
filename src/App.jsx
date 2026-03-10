import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { resumes } from "./constants";
import ResumeCard from "./components/resumeCard";
import Auth from "./routes/auth";
import { usePuterStore } from "./lib/puter";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

function Home() {

  const { auth } = usePuterStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (!auth.isAuthenticated) navigate('/auth?next=/');
  }, [auth.isAuthenticated])
  return (
    <main className="bg-[url('/images/bg-main.svg')]">
      <Navbar />

      <section className="main-section py-16">
        <div className="page-heading">
          <h1>Track your Applications and Resume Ratings</h1>
          <h2>Review your submissions and Check AI-powered feedback.</h2>
        </div>

        {resumes.length > 0 && (
          <div className="resumes-section">
            {resumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

function App() {
  const init = usePuterStore((s) => s.init);

  useEffect(() => {
    init();
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
    </Routes>
  );
}

export default App;