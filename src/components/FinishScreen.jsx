function FinishScreen({ points, totalPoints, dispatch }) {
  const percentage = Math.ceil((points / totalPoints) * 100);
  return (
    <div>
      <p className="result">
        You scored <strong>{points}</strong> out of {totalPoints} ({percentage}
        %)
      </p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart quiz
      </button>
    </div>
  );
}

export default FinishScreen;
