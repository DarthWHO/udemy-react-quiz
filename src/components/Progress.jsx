import { useQuiz } from "../hooks/useQuiz";

function Progress() {
  const { index, questionsLength, points, totalPoints, answer } = useQuiz();
  const currentQuestion = answer === null ? index : index + 1;

  return (
    <header className="progress">
      <progress max={questionsLength} value={currentQuestion} />
      <p>
        Question <strong>{index + 1}</strong> / {questionsLength}
      </p>
      <p>
        <strong>{points}</strong> / {totalPoints} points
      </p>
    </header>
  );
}

export default Progress;
