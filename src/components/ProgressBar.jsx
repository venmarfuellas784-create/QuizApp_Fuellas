import { questionsData } from '../data/questions';

export default function ProgressBar({ currentIdx, total, submittedAnswers }) {
  return (
    <div style={{ marginBottom: "20px" }}>
      {/* Header Info */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "14px", color: "#94a3b8" }}>
        <span>Progress</span>
        <span>Question {currentIdx + 1} of {total}</span>
      </div>

      {/* Bar Indicator */}
      <div style={{ width: "100%", height: "8px", background: "rgba(255, 255, 255, 0.1)", borderRadius: "4px", overflow: "hidden", marginBottom: "12px" }}>
        <div 
          style={{ 
            width: `${(currentIdx / total) * 100}%`, 
            height: "100%", 
            background: "linear-gradient(90deg, #6366f1, #38bdf8)", 
            transition: "width 0.3s ease" 
          }}
        />
      </div>

      {/* Check (✔) / Ekis (✘) Boxes */}
      <div style={{ display: "flex", gap: "6px", justifyContent: "space-between" }}>
        {Array.from({ length: total }).map((_, index) => {
          const userAnswer = submittedAnswers[index];
          const isSubmitted = userAnswer !== undefined;
          const isCurrent = index === currentIdx;

          let statusColor = "rgba(255, 255, 255, 0.1)";
          let symbol = "";

          // Only display ✔ or ✘ after Proceed has been clicked!
          if (isSubmitted) {
            const correctAnswer = questionsData[index].answer;
            if (userAnswer === correctAnswer) {
              statusColor = "#10b981"; // Green for check
              symbol = "✔";
            } else {
              statusColor = "#ef4444"; // Red for ekis
              symbol = "✘";
            }
          } else if (isCurrent) {
            statusColor = "#6366f1"; // Highlight current question
          }

          return (
            <div
              key={index}
              style={{
                flex: 1,
                height: "28px",
                borderRadius: "6px",
                background: statusColor,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "12px",
                fontWeight: "bold",
                color: "white",
                transition: "all 0.3s ease",
                border: isCurrent && !isSubmitted ? "1px solid #818cf8" : "none"
              }}
            >
              {symbol}
            </div>
          );
        })}
      </div>
    </div>
  );
}