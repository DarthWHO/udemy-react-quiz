function Progress({ index, questionCount, points, totalPoints, answer }) {
  const currentQuestion = answer === null ? index : index + 1;

  return (
    <header className="progress">
      <progress max={questionCount} value={currentQuestion} />
      <p>
        Question <strong>{index + 1}</strong> / {questionCount}
      </p>
      <p>
        <strong>{points}</strong> / {totalPoints} points
      </p>
    </header>
  );
}

export default Progress;
