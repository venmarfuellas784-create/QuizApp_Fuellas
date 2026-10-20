export default function QuestionCard({ question, currentIdx, total, onSelectAnswer, selectedAnswer }) {
  return (
    <div className="quiz-card">
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px", color: "#94a3b8", fontSize: "14px" }}>
        <span>Question {currentIdx + 1} of {total}</span>
      </div>
      
      <h3 style={{ fontSize: "20px", marginBottom: "20px", lineHeight: "1.4" }}>
        {question.question}
      </h3>
      
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onSelectAnswer(option)}
            className={`option-btn ${selectedAnswer === option ? 'selected' : ''}`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}