import { useQuiz } from "../hooks/useQuiz";

function Options() {
  const { question, answer, dispatch } = useQuiz();
  const hasAnswer = answer !== null;
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          key={option}
          disabled={hasAnswer}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
          className={`btn btn-option ${index == answer ? "answer" : ""} ${
            !hasAnswer
              ? ""
              : index === question.correctOption
              ? "correct"
              : "wrong"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
