export default function ResultCard({ score, total, onRestart, onHome }) {
  const percentage = Math.round((score / total) * 100);

  return (
    <div className="result-card" style={{ textAlign: "center" }}>
      <h2 style={{ fontSize: "26px", marginBottom: "10px" }}>Quiz Completed! 🎉</h2>
      <p style={{ color: "#94a3b8", marginBottom: "25px" }}>Here is how you performed:</p>
      
      <div style={{ background: "rgba(15, 23, 42, 0.5)", padding: "20px", borderRadius: "12px", marginBottom: "25px", border: "1px solid rgba(255,55,255,0.05)" }}>
        <h3 style={{ fontSize: "36px", color: "#818cf8", marginBottom: "5px" }}>{score} / {total}</h3>
        <p style={{ fontSize: "16px", color: "#38bdf8" }}>Final Score: {percentage}%</p>
      </div>
      
      <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
        <button onClick={onRestart} className="primary-btn" style={{ flex: 1 }}>
          Retake Quiz
        </button>
        <button onClick={onHome} className="secondary-btn" style={{ flex: 1 }}>
          Return Home
        </button>
      </div>
    </div>
  );
}