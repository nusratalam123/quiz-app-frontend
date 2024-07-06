import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Navbar from "../component/Navbar";

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
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [timer, setTimer] = useState(30);
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
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setTimer(30);
  };

  const handleAnswerSelect = (answer: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = answer;
    setAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < selectedQuiz!.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimer(30);
    } else {
      const correctAnswers = selectedQuiz!.questions.filter(
        (q, index) => q.answer === answers[index]
      ).length;
      router.push({
        pathname: "/results",
        query: {
          score: correctAnswers,
          total: selectedQuiz!.questions.length,
          answers: JSON.stringify(answers),
          questions: JSON.stringify(selectedQuiz!.questions),
        },
      });
    }
  };

  return (
    <div>
      <Navbar />
      {!selectedQuiz ? (
        <div>
          <h1>Select a Quiz</h1>
          {quizzes.map((quiz) => (
            <button key={quiz._id} onClick={() => handleQuizSelect(quiz)}>
              {quiz.title}
            </button>
          ))}
        </div>
      ) : (
        <div>
          <h1>{selectedQuiz.title}</h1>
          <h2>Time left: {timer}s</h2>
          <p>{selectedQuiz.questions[currentQuestionIndex].question}</p>
          {selectedQuiz.questions[currentQuestionIndex].options.map(
            (option, index) => (
              <button key={index} onClick={() => handleAnswerSelect(option)}>
                {option}
              </button>
            )
          )}
          <button onClick={handleNextQuestion}>Next</button>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
