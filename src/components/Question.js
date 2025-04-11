// src/components/Question.js
import React, { useState, useEffect } from 'react';

const Question = ({ question, index, selected, onSelect }) => {
  const [customAnswer, setCustomAnswer] = useState("");

  useEffect(() => {
    if (!question.allowCustomAnswer) {
      setCustomAnswer(""); // сброс если поле не требуется
    }
  }, [question]);

  const handleCheckboxChange = (value) => {
    const updated = selected.includes(value)
      ? selected.filter((item) => item !== value)
      : [...selected, value];
    onSelect(updated);
  };

  const handleCustomChange = (e) => {
    const value = e.target.value;
    setCustomAnswer(value);
    const updated = value
      ? [...selected.filter((v) => v !== customAnswer), value]
      : selected.filter((v) => v !== customAnswer);
    onSelect(updated);
  };

  return (
    <div className="question-box">
      <h3>{question.question}</h3>
      <ul>
        {question.options.map((opt, idx) => (
          <li key={idx} style={{ marginBottom: '10px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input
                type="checkbox"
                checked={selected.includes(opt.value)}
                onChange={() => handleCheckboxChange(opt.value)}
              />
              {opt.type === "text" ? (
                opt.value
              ) : (
                <img
                  src={opt.value}
                  alt={`option ${idx}`}
                  style={{ maxHeight: '100px', border: '1px solid #ccc', borderRadius: '4px' }}
                />
              )}
            </label>
          </li>
        ))}

        {question.allowCustomAnswer && (
          <li>
            <label>
              <input
                type="checkbox"
                checked={selected.includes(customAnswer) && !!customAnswer}
                readOnly
              />
              Свой вариант:
              <input
                type="text"
                value={customAnswer}
                onChange={handleCustomChange}
                placeholder="Введите свой ответ"
                style={{ marginLeft: "10px", padding: "5px", borderRadius: "4px", border: "1px solid #ccc" }}
              />
            </label>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Question;
