import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Navbar from "../component/Navbar";
import styles from "../pages/quiz.module.css";

interface Option {
  option: string;
}

interface Question {
  question: string;
  options: string[];
  answer: string;
}

interface Quiz {
  _id: string;
  title: string;
  questions: Question[];
}

const QuizPage = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [timer, setTimer] = useState(30);
  const questionsPerPage = 10;
  const router = useRouter();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const res = await axios.get("http://localhost:7000/api/quizzes");
        setQuizzes(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchQuizzes();
  }, []);

  useEffect(() => {
    if (selectedQuiz && timer > 0) {
      const interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [selectedQuiz, timer]);

  const handleQuizSelect = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    setCurrentPage(0);
    setAnswers(Array(quiz.questions.length).fill(""));
    setTimer(30);
  };

  const handleAnswerSelect = (index: number, answer: string) => {
    const newAnswers = [...answers];
    newAnswers[currentPage * questionsPerPage + index] = answer;
    setAnswers(newAnswers);
  };

  const handleNextPage = () => {
    if ((currentPage + 1) * questionsPerPage < selectedQuiz!.questions.length) {
      setCurrentPage(currentPage + 1);
      setTimer(30);
    } else {
      const correctAnswers = selectedQuiz!.questions.filter(
        (q, index) => q.answer === answers[index]
      ).length;
      router.push({
        pathname: "/result",
        query: {
          score: correctAnswers,
          total: selectedQuiz!.questions.length,
          answers: JSON.stringify(answers),
          questions: JSON.stringify(selectedQuiz!.questions),
        },
      });
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className={styles.container}>
      <Navbar />
      {!selectedQuiz ? (
        <div className={styles.border}>
          <h1 style={{ marginLeft :"45%"}}>Select a Quiz</h1>
          {quizzes.map((quiz) => (
            <button
              className="login-button"
              style={{
                width: "30%",
                marginLeft: "35%",
                marginBottom:"1%",
                padding: "10px",
                backgroundColor: "#0070f3",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "1rem",
              }}
              key={quiz._id}
              onClick={() => handleQuizSelect(quiz)}
            >
              {quiz.title}
            </button>
          ))}
        </div>
      ) : (
        <div>
          <h1>{selectedQuiz.title}</h1>
          <h2>Time left: {timer}s</h2>
          <ul>
            {selectedQuiz.questions
              .slice(
                currentPage * questionsPerPage,
                (currentPage + 1) * questionsPerPage
              )
              .map((question, index) => (
                <li key={index} className={styles.questionItem}>
                  <p>{question.question}</p>
                  {question.options.map((option, optionIndex) => (
                    <button
                      key={optionIndex}
                      onClick={() => handleAnswerSelect(index, option)}
                      className={
                        answers[currentPage * questionsPerPage + index] ===
                        option
                          ? styles.selectedOption
                          : ""
                      }
                    >
                      {option}
                    </button>
                  ))}
                </li>
              ))}
          </ul>
          <div className={styles.navigationButtons}>
            {currentPage > 0 && (
              <button onClick={handlePreviousPage} className={styles.navButton}>
                Previous
              </button>
            )}
            <button onClick={handleNextPage} className={styles.navButton}>
              {currentPage * questionsPerPage + questionsPerPage <
              selectedQuiz.questions.length
                ? "Next"
                : "Submit"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
