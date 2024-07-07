import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Navbar from "../component/Navbar";
import styles from "./login.module.css";

const Admin = () => {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([
    { question: "", options: [""], answer: "" },
  ]);
  const router = useRouter();

  const addQuestion = () => {
    setQuestions([...questions, { question: "", options: [""], answer: "" }]);
  };

  const handleQuestionChange = (index: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[index].question = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (
    qIndex: number,
    oIndex: number,
    value: string
  ) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[oIndex] = value;
    setQuestions(newQuestions);
  };

  const addOption = (qIndex: number) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options.push("");
    setQuestions(newQuestions);
  };

  const handleAnswerChange = (index: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[index].answer = value;
    setQuestions(newQuestions);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:7000/api/quizzes",
        { title, questions },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // Clear the form or show a success message
      setTitle("");
      setQuestions([{ question: "", options: [""], answer: "" }]);
      router.push("/admin");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Navbar />

      <form className={styles["login-form"]} onSubmit={handleSubmit}>
        <h1 style={{ marginLeft: "25%",marginTop:"10%" }}>Create a New Quiz</h1>
        <input
          type="text"
          placeholder="Quiz Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        {questions.map((q, qIndex) => (
          <div key={qIndex}>
            <input
              type="text"
              placeholder={`Question ${qIndex + 1}`}
              value={q.question}
              onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
              required
            />
            {q.options.map((o, oIndex) => (
              <input
                key={oIndex}
                type="text"
                placeholder={`Option ${oIndex + 1}`}
                value={o}
                onChange={(e) =>
                  handleOptionChange(qIndex, oIndex, e.target.value)
                }
                required
              />
            ))}
            <button type="button" onClick={() => addOption(qIndex)}>
              Add Option
            </button>
            <input
              type="text"
              placeholder="Answer"
              value={q.answer}
              onChange={(e) => handleAnswerChange(qIndex, e.target.value)}
              required
            />
          </div>
        ))}
        <button type="button" onClick={addQuestion}>
          Add Question
        </button>
        <button type="submit">Create Quiz</button>
      </form>
    </div>
  );
};

export default Admin;
