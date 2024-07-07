import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import styles from "../pages/result.module.css";

interface Question {
  question: string;
  options: string[];
  answer: string;
}

const ResultsPage = () => {
  const router = useRouter();
  const { score, total, answers, questions } = router.query;
  const [parsedAnswers, setParsedAnswers] = useState<string[]>([]);
  const [parsedQuestions, setParsedQuestions] = useState<Question[]>([]);

  useEffect(() => {
    if (answers && questions) {
      setParsedAnswers(JSON.parse(answers as string));
      setParsedQuestions(JSON.parse(questions as string));
    }
  }, [answers, questions]);

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.border}>
        <h1>Quiz Results</h1>
        <p>
          Score: {score}/{total}
        </p>
        {parsedQuestions.map((question, index) => (
          <div key={index} className={styles.questionResult}>
            <h2>{question.question}</h2>
            <p>Your answer: {parsedAnswers[index]}</p>
            <p>Correct answer: {question.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultsPage;
