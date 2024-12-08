import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { questions } from "../constants";
import { apiClient } from "../services/supabase";

export default function QuestionForm() {
  const params = useParams();
  const questionId = params.id;
  const question = questions.find((q) => +q.id === +questionId);
  const questionText = question ? question.text : "";

  if (!questionText) {
    return <h1 style={{ color: "red" }}>No question with this ID</h1>;
  }

  const [answer, setAnswer] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { value } = e.target;
    setAnswer(value);
  };

  const handleSubmit = async (e) => {
    e && e.preventDefault();

    try {
      if (!answer) {
        return;
      }

      setLoading(true);
      setStatusMessage("");
      setErrorMessage("");

      const response = await apiClient.answerQuestion(questionId, answer);
      setLoading(false);

      if (!response.error) {
        setStatusMessage(`Thank you for your submission!`);
      } else {
        throw response.error;
      }
    } catch (error) {
      setStatusMessage("");
      setErrorMessage(`Could not submit. Please try again.`);
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="name"><b>{questionText}</b></label>
          <div style={{ marginTop: "20px" }}></div>
          <textarea
            name="question"
            placeholder="Enter your answer here"
            value={answer}
            onChange={handleChange}
            required
            readOnly={statusMessage}
            className={"input " + (statusMessage ? "disabled-input" : "")}
            rows="5"
          />
        </div>

        <div style={{ marginTop: "20px" }}></div>

        {!statusMessage && (
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? "Loading..." : "Submit"}
          </button>
        )}

        {statusMessage && (
          <h2>
            <p className="status-message font-color-primary">{statusMessage}</p>
          </h2>
        )}
        {errorMessage && (
          <h4>
            <p className="status-message" style={{ color: "red" }}>
              {errorMessage}
            </p>
          </h4>
        )}
      </form>
    </div>
  );
}
