import Options from "./Options";
import { useQuiz } from "../hooks/useQuiz";

function Question() {
  const { question } = useQuiz();
  return (
    <div>
      <h4>{question.question}</h4>
      <Options />
    </div>
  );
}

export default Question;
