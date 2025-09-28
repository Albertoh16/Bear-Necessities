import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  quizData,
  QuizItem,
  languageTypeData,
  languageType,
} from "../../data/quizData";

export default function Quiz() {
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [randomQuestions, setRandomQuestions] = useState<QuizItem[]>([]);

  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
  };

  const handleAnswerChange = (questionNumber: number, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionNumber]: value,
    }));
  };

  useEffect(() => {
    // Shuffle quizData and select 2 random questions
    const shuffled = [...quizData].sort(() => Math.random() - 0.5);
    setRandomQuestions(shuffled.slice(0, 2));
  }, []);

  const handleSubmit = () => {
    const results = randomQuestions.map((q) => ({
      question: q.question,
      testcase: q.testcase,
      answer: answers[q.number] || "",
    }));

    navigate("/results", { state: { selectedValue, results } });
  };

  return (
    <div>
      <label htmlFor="dropdown">Choose an option: </label>
      <select id="dropdown" value={selectedValue} onChange={handleChange}>
        <option value="" disabled>
          -- Select an option --
        </option>
        {languageTypeData.map((item: languageType, index: number) => (
          <option key={index} value={item.name}>
            {item.name}
          </option>
        ))}
      </select>

      {selectedValue && (
        <p style={{ marginTop: "10px" }}>
          You selected: <strong>{selectedValue}</strong>
        </p>
      )}

      <h1>Quiz</h1>
      {randomQuestions.map((q: QuizItem) => (
        <div key={q.number} style={{ marginBottom: "20px" }}>
          <p>
            <strong>Question:</strong> {q.question}
          </p>
          <p>
            <strong>Test Case:</strong> {q.testcase}
          </p>

          <input
            type="text"
            placeholder="Type your answer here"
            value={answers[q.number] || ""}
            onChange={(e) => handleAnswerChange(q.number, e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>
      ))}

    
      <button
        onClick={handleSubmit}
        style={{
          padding: "10px 20px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Submit Answers
      </button>
    </div>
  );
}
