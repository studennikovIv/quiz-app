// src/App.js
import React, { useState } from 'react';
import { questions } from './data/questions';
import Question from './components/Question';
import './styles.css';

function App() {
  const [userData, setUserData] = useState({ fullName: '', ttName: '' });
  const [showTest, setShowTest] = useState(false);
  const [answers, setAnswers] = useState(Array(questions.length).fill([]));
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    setUserData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const startTest = () => {
    if (userData.fullName.trim() && userData.ttName.trim()) {
      setShowTest(true);
    } else {
      alert('Пожалуйста, заполните все поля.');
    }
  };

  const handleSelect = (questionIndex, selectedAnswers) => {
    const updated = [...answers];
    updated[questionIndex] = selectedAnswers;
    setAnswers(updated);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  const correctCount = questions.reduce((sum, q, idx) => {
    if (!q.correctAnswers || !Array.isArray(q.correctAnswers)) return sum;

    const selected = answers[idx].map(a => a.toLowerCase().trim());
    const expected = q.correctAnswers.map(a => a.toLowerCase().trim());

    const correct = selected.filter(s => expected.includes(s)).length;
    const incorrect = selected.filter(s => !expected.includes(s)).length;

    const rawScore = (correct - incorrect) / expected.length;
    const safeScore = Math.max(0, rawScore);

    return sum + parseFloat(safeScore.toFixed(2));
  }, 0);

  const percent = Math.round((correctCount / questions.length) * 100);
  const medal = percent >= 90 ? "🥇" :
                percent >= 75 ? "🥈" :
                percent >= 50 ? "🥉" : "😅";
  const feedback = percent >= 90 ? "Отличный результат! 💪" :
                   percent >= 75 ? "Хорошо! Есть к чему стремиться 👍" :
                   percent >= 50 ? "Удовлетворительно 🤔" :
                   "Нужно подтянуть знания 😬";

  if (!showTest) {
    return (
      <div className="app">
        <div className="intro-form">
  <h1>Добро пожаловать 👋</h1>
  <div className="form-row">
    <label>
      ФИО:
      <input
        type="text"
        name="fullName"
        value={userData.fullName}
        onChange={handleInputChange}
        placeholder="Фамилия Имя Отчество"
      />
    </label>
    <label>
      Название ТТ:
      <input
        type="text"
        name="ttName"
        value={userData.ttName}
        onChange={handleInputChange}
        placeholder="Название торговой точки"
      />
    </label>
  </div>
  <button className="start-button" onClick={startTest}>Начать тест</button>
</div>

      </div>
    );
  }

  return (
    <div className="app">
      <h1>Тест: {questions.length} вопросов</h1>
      {!isSubmitted ? (
        <>
          {questions.map((q, idx) => (
            <Question
              key={q.id}
              question={q}
              index={idx}
              selected={answers[idx]}
              onSelect={(selected) => handleSelect(idx, selected)}
            />
          ))}
          <div className="submit-block">
            <button onClick={handleSubmit}>Завершить тест</button>
          </div>
        </>
      ) : (
        <div className="result">
          <h2>Результат 🎉</h2>
          <p><strong>ФИО:</strong> {userData.fullName}</p>
          <p><strong>ТТ:</strong> {userData.ttName}</p>

          <div className="medal-block">
            <h3>Итог: {percent}% {medal}</h3>
            <p>{feedback}</p>
          </div>

          <div className="details">
            {questions.map((q, idx) => {
              const selected = answers[idx].map(a => a.toLowerCase().trim());
              const expected = (q.correctAnswers || []).map(a => a.toLowerCase().trim());

              const correct = selected.filter(s => expected.includes(s)).length;
              const incorrect = selected.filter(s => !expected.includes(s)).length;
              const rawScore = (correct - incorrect) / expected.length;
              const safeScore = Math.max(0, rawScore);
              const status = safeScore === 1 ? '✅ Правильно'
                           : safeScore >= 0.5 ? '⚠️ Частично'
                           : '❌ Неверно';

              return (
                <div key={idx} className="question-summary">
                  <p><strong>{idx + 1}. {q.question}</strong></p>
                  <p>Статус: {status}</p>
                  <p>Ваши ответы: {answers[idx].join(", ") || "—"}</p>
                  {expected.length > 0 && <p>Правильные: {q.correctAnswers.join(", ")}</p>}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
