import { useState } from 'react';
import { questionsData } from './data/questions';
import QuizHeader from './components/QuizHeader';
import QuestionCard from './components/QuestionCard';
import ResultCard from './components/ResultCard';
import ProgressBar from './components/ProgressBar';
import './App.css';

export default function App() {
  const [step, setStep] = useState('home');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submittedAnswers, setSubmittedAnswers] = useState({});
  const [score, setScore] = useState(0);

  // 1. Pick a multiple-choice option (does NOT reveal check or ekis yet)
  const handleSelectAnswer = (option) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentIndex]: option
    });
  };

  // 2. Click Next / Proceed -> Reveal Check or Ekis in Progress Bar & Move Forward
  const handleNext = () => {
    const currentQuestion = questionsData[currentIndex];
    const userChoice = selectedAnswers[currentIndex];

    // Check if answer is correct and update score
    if (userChoice === currentQuestion.answer) {
      setScore(prev => prev + 1);
    }

    // Lock in the answer to show check or ekis in progress bar
    setSubmittedAnswers(prev => ({
      ...prev,
      [currentIndex]: userChoice
    }));

    // Move to next question or show result
    if (currentIndex + 1 < questionsData.length) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setStep('result');
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedAnswers({});
    setSubmittedAnswers({});
    setScore(0);
    setStep('quiz');
  };

  const handleHome = () => {
    setCurrentIndex(0);
    setSelectedAnswers({});
    setSubmittedAnswers({});
    setScore(0);
    setStep('home');
  };

  return (
    <div className="app-container">
      {step === 'home' && (
        <div className="home-card" style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: "32px", marginBottom: "10px" }}>Welcome to the</h1>
          <h2 style={{ fontSize: "36px", color: "#818cf8", marginBottom: "15px" }}>Frontend Quiz!</h2>
          <p style={{ color: "#94a3b8", marginBottom: "30px", lineHeight: "1.5" }}>
            Test your web development skills with 10 interactive multiple-choice questions.
          </p>
          <button onClick={() => setStep('quiz')} className="primary-btn">
            Start Quiz
          </button>
        </div>
      )}

      {step === 'quiz' && (
        <div>
          <QuizHeader title="Frontend Quiz App" />
          
          {/* Progress Bar uses submittedAnswers so checks/ekis only show after proceeding */}
          <ProgressBar 
            currentIdx={currentIndex} 
            total={questionsData.length} 
            submittedAnswers={submittedAnswers} 
          />

          <QuestionCard 
            question={questionsData[currentIndex]}
            currentIdx={currentIndex}
            total={questionsData.length}
            onSelectAnswer={handleSelectAnswer}
            selectedAnswer={selectedAnswers[currentIndex]}
          />

          <button 
            onClick={handleNext}
            disabled={!selectedAnswers[currentIndex]}
            className="primary-btn"
            style={{ marginTop: "20px" }}
          >
            {currentIndex + 1 === questionsData.length ? "Submit Quiz" : "Proceed"}
          </button>
        </div>
      )}

      {step === 'result' && (
        <ResultCard 
          score={score}
          total={questionsData.length}
          onRestart={handleRestart}
          onHome={handleHome}
        />
      )}
    </div>
  );
}