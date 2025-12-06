function FinishScreen({ points, totalPoints, dispatch, highscore }) {
  const percentage = Math.ceil((points / totalPoints) * 100);

  let emoji;

  if (percentage === 100) {
    emoji = "🏆";
  } else if (percentage >= 80) {
    emoji = "🎉";
  } else if (percentage >= 50) {
    emoji = "😊";
  } else if (percentage > 0) {
    emoji = "😒";
  } else {
    emoji = "🤦‍♂️";
  }

  return (
    <div>
      <p className="result">
        <span>{emoji}</span> You scored <strong>{points}</strong> out of{" "}
        {totalPoints} ({percentage}%)
      </p>
      <p className="highscore">Highscore: {highscore} points</p>
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
