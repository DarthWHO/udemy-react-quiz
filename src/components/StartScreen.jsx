function StartScreen({ questionsLength, onStart }) {
  return (
    <div className="start">
      <h2>Welcome to the Quiz!</h2>
      <h3>{questionsLength} questions to test your React mastery</h3>
      <button className="btn btn-ui" onClick={onStart}>
        Let's start
      </button>
    </div>
  );
}

export default StartScreen;
