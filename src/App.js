// src/App.js
import React, { useState } from 'react';
import { questions } from './data/questions';
import Question from './components/Question';
import './styles.css';

function App() {
  const [userData, setUserData] = useState({
    fullName: '',
    ttName: ''
  });

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

  if (!showTest) {
    return (
      <div className="app">
        <h1>Добро пожаловать!</h1>
        <div className="intro-form">
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
          <button onClick={startTest}>Начать тест</button>
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
          <h2>Ответы отправлены!</h2>
          <p><strong>ФИО:</strong> {userData.fullName}</p>
          <p><strong>ТТ:</strong> {userData.ttName}</p>
          <h3>Выбранные ответы:</h3>
          <pre>{JSON.stringify(answers, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
